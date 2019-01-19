using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Quiz_Angular_ASPNetCore.Infrastructure
{
    public class UserDbContext : IdentityDbContext<IdentityUser>
    {
        public UserDbContext(Microsoft.EntityFrameworkCore.DbContextOptions<UserDbContext> options) : base(options)
        {
        }

    }
}
