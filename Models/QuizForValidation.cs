using System.Collections.Generic;

namespace Quiz_Angular_ASPNetCore.Models
{
    public class QuizForValidation
    {
        public int Id { get; set; }
        public List<QuestionForValidation> Questions { get; set; }
    }
}