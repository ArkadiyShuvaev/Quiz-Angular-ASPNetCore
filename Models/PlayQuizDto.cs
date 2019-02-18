using System;
using System.Collections.Generic;

namespace Quiz_Angular_ASPNetCore.Models
{
    public class PlayQuizDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<ShuffledQuestionDto> Questions { get; set; } = new List<ShuffledQuestionDto>();
    }
}
