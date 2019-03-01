using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_Angular_ASPNetCore.Infrastructure;
using Quiz_Angular_ASPNetCore.Models;

namespace Quiz_Angular_ASPNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PlayController : ControllerBase
    {

        private static readonly Random rng = new Random();
        private readonly QuizContext _context;

        public PlayController(QuizContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quizzes
                .Include(nameof(Quiz.Questions))
                .FirstOrDefaultAsync(q => q.Id == id)
                .ConfigureAwait(false);

            if (quiz == null)
            {
                return NotFound();
            }

            var newQuiz = new PlayQuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Questions = new List<ShuffledQuestionDto>(ConvertToShuffledQuestionDtoList(quiz.Questions))
            };

            return Ok(newQuiz);
        }
    
        [HttpPost()]
        public async Task<IActionResult> PostValidate([FromBody] QuizForValidation quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingQuiz = await _context.Quizzes
                .Include(nameof(Quiz.Questions))
                .FirstOrDefaultAsync(q => q.Id == quiz.Id)
                .ConfigureAwait(false);

            if (existingQuiz == null)
            {
                return NotFound();
            }

            ValidatedQuizDto result = GetValidatedQuiz(existingQuiz, quiz);

            return Ok(result);
        }

        [HttpGet(nameof(GetPlayList))]
        public IEnumerable<PlayQuizList> GetPlayList()
        {
            var quizzes = _context.Quizzes;

            var result = quizzes.Select(q => new PlayQuizList
            {
                Id = q.Id,
                Title = q.Title,
                QuestionCount = _context.Questions.Count(i => i.QuizId == q.Id)
            });

            return result;
        }

        private ValidatedQuizDto GetValidatedQuiz(Quiz existingQuiz, QuizForValidation quizForValidation)
        {
            var result = new ValidatedQuizDto
            {
                Id = existingQuiz.Id,
                Questions = new List<ValidatedQuestionDto>()
            };

            quizForValidation.Questions.ForEach(q => {
                var existingQuestion = existingQuiz.Questions.First(i => i.Id == q.Id);
                var validatedQuestionDto = new ValidatedQuestionDto { Id = q.Id };

                if (string.Equals(q.Answer, existingQuestion.CorrectAnswer, StringComparison.OrdinalIgnoreCase))
                {
                    validatedQuestionDto.IsAnswerCorrect = true;
                }
                else
                {
                    validatedQuestionDto.IsAnswerCorrect = false;
                }

                result.Questions.Add(validatedQuestionDto);
            });

            return result;
        }

        private IEnumerable<ShuffledQuestionDto> ConvertToShuffledQuestionDtoList(IEnumerable<Question> questions)
        {
            var res = questions.Select(q =>
            {
                var list = new List<string> { q.CorrectAnswer, q.Answer1, q.Answer2, q.Answer3 };
                Shuffle(list);

                return new ShuffledQuestionDto
                {
                    Id = q.Id,
                    QuizId = q.QuizId,
                    Text = q.Text,
                    Answer1 = list[0],
                    Answer2 = list[1],
                    Answer3 = list[2],
                    Answer4 = list[3],
                };
            });

            return res;
        }

        private static void Shuffle<T>(IList<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}