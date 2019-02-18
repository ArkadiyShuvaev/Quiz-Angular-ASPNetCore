using System.Collections.Generic;

namespace Quiz_Angular_ASPNetCore.Models
{
    public class ValidatedQuizDto
    {
        public int Id { get; set; }
        public List<ValidatedQuestionDto> Questions { get; set; }
    }
}
