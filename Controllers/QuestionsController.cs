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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Questions
        [HttpPost]
        public Task Post([FromBody] Models.Question question)
        {
            if (question == null)
            {
                throw new ArgumentNullException(nameof(question));
            }

            _context.Questions.Add(question);
            return _context.SaveChangesAsync();
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
