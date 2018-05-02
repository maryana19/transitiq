using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TransitIQ.API
{
    public class ApplicationUser: IdentityUser
    {
        public override string NormalizedUserName => this.UserName.ToUpper();

        public override string NormalizedEmail => this.Email.ToUpper();

        public string AgencyId { get; set; }

        public virtual ICollection<UserRole> UserRoles { get;  } = new List<UserRole>();
    }

    public class Role : IdentityRole<string>
    {
        public virtual ICollection<UserRole> UserRoles { get; } = new List<UserRole>();
    }

    public class UserRole : IdentityUserRole<string>
    {
        public virtual ApplicationUser User { get; set; }
        public virtual Role Role { get; set; }
    }
}
