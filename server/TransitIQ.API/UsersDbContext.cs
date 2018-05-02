using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TransitIQ.API
{
    //public class UsersDbContext: IdentityDbContext<ApplicationUser>
    public class UsersDbContext
        : IdentityDbContext<ApplicationUser, Role, string, IdentityUserClaim<string>,
            UserRole, IdentityUserLogin<string>,
            IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public UsersDbContext(DbContextOptions options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>().Ignore(u => u.NormalizedName);
            builder.Entity<Role>().Ignore(u => u.ConcurrencyStamp);


            builder.Entity<ApplicationUser>().Ignore(u => u.NormalizedEmail);
            builder.Entity<ApplicationUser>().Ignore(u => u.ConcurrencyStamp);
            builder.Entity<ApplicationUser>().Ignore(u => u.LockoutEnd);
            builder.Entity<ApplicationUser>().Ignore(u => u.NormalizedUserName);

            builder.Entity<ApplicationUser>(b => {
                b.HasMany(x => x.UserRoles)
                //.WithOne(x => x.Role).HasForeignKey(u=> u.RoleId).IsRequired()
                .WithOne(x => x.User).HasForeignKey(ur => ur.UserId).IsRequired()
                ;
            });

            builder.Entity<Role>(role =>
            {
               // role.ToTable("AspNetRoles");
                //role.HasKey(r => r.Id);

                role.HasMany(x => x.UserRoles)
                    .WithOne(ur => ur.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
            });

            builder.Entity<UserRole>(b => {
                b.HasOne(ur => ur.Role)
                    .WithMany(ur => ur.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();
            });
        }
    }
}
