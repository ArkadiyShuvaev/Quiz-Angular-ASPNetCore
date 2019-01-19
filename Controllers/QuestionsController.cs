using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_Angular_ASPNetCore.Infrastructure;

namespace Quiz_Angular_ASPNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizContext _context;

        public QuestionsController(QuizContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public Task<List<Models.Question>> Get()
        {
            return _context.Questions.ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("{id}", Name = "Get")]
        public System.Runtime.CompilerServices.ConfiguredTaskAwaitable<Models.Question> GetById(int id)
        {
            return _context.Questions.FirstOrDefaultAsync(q => q.Id == id).ConfigureAwait(false);
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Models.Question question)
        {
            if (question == null)
            {
                throw new ArgumentNullException(nameof(question));
            }

            var existingQuiz = await _context.Quiz.FirstOrDefaultAsync(q => q.Id == question.QuizId).ConfigureAwait(false);
            if (existingQuiz == null)
            {
                return NotFound($"Quiz with {question.QuizId} id cannot be found");
            }

            existingQuiz.Questions.Add(question);
            //await _context.Questions.AddAsync(question).ConfigureAwait(false);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Models.Question questionInput)
        {
            var existing = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id).ConfigureAwait(false);
            if (existing == null) return BadRequest(nameof(id));

            existing.Answer1 = questionInput.Answer1;
            existing.Answer2 = questionInput.Answer2;
            existing.Answer3 = questionInput.Answer3;
            existing.CorrectAnswer = questionInput.CorrectAnswer;
            existing.Text = questionInput.Text;

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return Ok(existing);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
