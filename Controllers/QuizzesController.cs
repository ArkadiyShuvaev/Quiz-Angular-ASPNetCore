using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_Angular_ASPNetCore.Infrastructure;
using Quiz_Angular_ASPNetCore.Models;

namespace Quiz_Angular_ASPNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuizzesController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuizzesController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Quizzes
        [HttpGet]
        public IEnumerable<Quiz> GetQuiz()
        {
            var userId = GetCurrentUserId();
            return _context.Quizzes.Include(nameof(Quiz.Questions)).Where(q => q.OwnerId == userId);
        }

        [HttpGet(nameof(GetAll))]
        public IEnumerable<Quiz> GetAll()
        {
            return _context.Quizzes;
        }


        // GET: api/Quizzes/5
        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetQuiz([FromRoute] int quizId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quizzes
                .Include(nameof(Quiz.Questions))
                .FirstOrDefaultAsync(q => q.Id == quizId);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        // PUT: api/Quizzes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz([FromRoute] int id, [FromBody] Quiz quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quiz.Id)
            {
                return BadRequest();
            }

            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quizzes
        [HttpPost]
        public async Task<IActionResult> PostQuiz([FromBody] QuizDto quizDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var quiz = new Quiz
            {
                Questions = quizDto.Questions,
                Title = quizDto.Title,
                OwnerId = userId
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuiz", new { id = quiz.Id }, quiz);
        }

        private Guid GetCurrentUserId()
        {
            return new Guid(HttpContext.User.Claims.First(c => c.Properties.Any(p => p.Value == JwtRegisteredClaimNames.Sub)).Value);
        }

        // DELETE: api/Quizzes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return Ok(quiz);
        }

        private bool QuizExists(int id)
        {
            return _context.Quizzes.Any(e => e.Id == id);
        }
    }
}