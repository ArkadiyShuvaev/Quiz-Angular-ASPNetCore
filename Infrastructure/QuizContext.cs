using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quiz_Angular_ASPNetCore.Models;

namespace Quiz_Angular_ASPNetCore.Infrastructure
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
        }
        public DbSet<Models.Question> Questions { get; set; }
        public DbSet<Quiz_Angular_ASPNetCore.Models.Quiz> Quiz { get; set; }
    }
}
