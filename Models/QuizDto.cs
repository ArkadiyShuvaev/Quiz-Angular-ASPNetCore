using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quiz_Angular_ASPNetCore.Models
{
    public class QuizDto
    {
        [Key]
        public int Id { get; set; }

        [StringLength(200)]
        public string Title { get; set; }

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
