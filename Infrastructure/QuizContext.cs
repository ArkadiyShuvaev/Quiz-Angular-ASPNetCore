using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz_Angular_ASPNetCore.Infrastructure
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Models.Question> Questions { get; set; }
    }
}
