using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Quiz_Angular_ASPNetCore.Infrastructure;

namespace Quiz_Angular_ASPNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserDbContext _userContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

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

            var result = await _userManager.CreateAsync(user, credentials.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            await _signInManager.SignInAsync(user, isPersistent: false);

            var jwt = new JwtSecurityToken();
            return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        }

        //[HttpGet("IsExistByEmail")]
        //public async Task<IActionResult> IsExistByEmail(string email)
        //{
        //    if (email == null) return BadRequest(nameof(email));

        //    var result = await _userManager.FindByEmailAsync(email).ConfigureAwait(false);

        //    return result == null ? Ok(false) : Ok(true);
        //}

        public class Credentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}