﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Quiz_Angular_ASPNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public static SymmetricSecurityKey SigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("this key should be stored into configuration store"));

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            if (userManager == null)
                throw new ArgumentNullException(nameof(userManager));
            if (signInManager == null)
                throw new ArgumentNullException(nameof(signInManager));

            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {
            var user = new IdentityUser(credentials.Email) { Email = credentials.Email };

            var result = await _userManager.CreateAsync(user, credentials.Password).ConfigureAwait(false);
            if (!result.Succeeded) return BadRequest(result.Errors);

            await _signInManager.SignInAsync(user, isPersistent: false).ConfigureAwait(false);

            return Ok(CreateToken(user));
        }

        private string CreateToken(IdentityUser user)
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var signCred = new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signCred,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest(result.ToString());
            }

            var user = await _userManager.FindByEmailAsync(credentials.Email).ConfigureAwait(false);

            return Ok(CreateToken(user));
        }

        public class Credentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}