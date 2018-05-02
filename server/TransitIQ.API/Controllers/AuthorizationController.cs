using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NodaTime.Calendars;

namespace TransitIQ.API.Controllers
{
    public class AuthorizationController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly RoleManager<IdentityRole<string>> _roleManager;

        public AuthorizationController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            //_roleManager = roleManager;
        }

        [HttpPost("~/connect/token"), Produces("application/json")]
        //public IActionResult Exchange(OpenIdConnectRequest request)
        public async Task<IActionResult> Authenticate(OpenIdConnectRequest request)
        {
            ClaimsIdentity identity = null;
            string cookieValue;

            if (this.Request.Cookies.TryGetValue("NewTransitIQPortalCookie", out cookieValue))
            {
                identity = GetIdentityFromCookie(cookieValue);
            }

            else if (request.IsPasswordGrantType())
            {
                //var user = await _userManager.FindByNameAsync(request.Username);

                var user = await _userManager.Users
                    .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                    .Where(u => u.UserName == request.Username)
                    .FirstOrDefaultAsync();


                /*if (user == null)
                {
                    return Forbid(OpenIdConnectServerDefaults.AuthenticationScheme);
                }*/

                var result = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

                if (result == PasswordVerificationResult.Failed)
                {
                    return Forbid(OpenIdConnectServerDefaults.AuthenticationScheme);
                }

                identity = GetIdentityFromUser(user);

            }

            if (identity == null)
            {
                return Forbid(OpenIdConnectServerDefaults.AuthenticationScheme);
            }
            var principal = new ClaimsPrincipal(identity);

            // Ask OpenIddict to generate a new token and return an OAuth2 token response.
            return SignIn(principal, OpenIdConnectServerDefaults.AuthenticationScheme);

            throw new InvalidOperationException("The specified grant type is not supported.");
        }

        private ClaimsIdentity GetIdentityFromUser(ApplicationUser user)
        {
            // Create a new ClaimsIdentity holding the user identity.
            var identity = new ClaimsIdentity(
                OpenIdConnectServerDefaults.AuthenticationScheme,
                OpenIdConnectConstants.Claims.Name,
                OpenIdConnectConstants.Claims.Role);
            // Add a "sub" claim containing the user identifier, and attach
            // the "access_token" destination to allow OpenIddict to store it
            // in the access token, so it can be retrieved from your controllers.
            identity.AddClaim(OpenIdConnectConstants.Claims.Subject,
                user.Id,
                OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim(OpenIdConnectConstants.Claims.Name, user.UserName,
                OpenIdConnectConstants.Destinations.AccessToken);

            foreach (var role in user.UserRoles)
            {
                identity.AddClaim(OpenIdConnectConstants.Claims.Role, role.Role.Name,
                    OpenIdConnectConstants.Destinations.AccessToken);
            }

            var agencies = user.AgencyId.Split(',');

            foreach (var agency in agencies)
            {
                identity.AddClaim("agencies", agency,
                    OpenIdConnectConstants.Destinations.AccessToken);
            }

            return identity;
        }

        private ClaimsIdentity GetIdentityFromCookie(string cookieValue)
        {
            // Create a new ClaimsIdentity holding the user identity.
            var identity = new ClaimsIdentity(
                OpenIdConnectServerDefaults.AuthenticationScheme,
                OpenIdConnectConstants.Claims.Name,
                OpenIdConnectConstants.Claims.Role);


            identity.AddClaim(OpenIdConnectConstants.Claims.Subject,
                GetValue("userid", cookieValue),
                OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim(OpenIdConnectConstants.Claims.Name, GetValue("username", cookieValue),
                OpenIdConnectConstants.Destinations.AccessToken);

            foreach (var role in GetValue("roles", cookieValue).Split(','))
            {
                identity.AddClaim(OpenIdConnectConstants.Claims.Role, role,
                    OpenIdConnectConstants.Destinations.AccessToken);
            }

            foreach (var agency in GetValue("agencies", cookieValue).Split(','))
            {
                identity.AddClaim("agencies", agency,
                    OpenIdConnectConstants.Destinations.AccessToken);
            }

            return identity;
        }

        private string GetValue(string key, string text)
        {
            var i = text.IndexOf(key + "=", StringComparison.Ordinal);

            int i1 = text.IndexOf('&', i);
            if (i1 < 0)
                i1 = text.Length;
            /*try
            {
                i1 = text.IndexOf('&', i);
            }
            catch {}*/

            var result= text.Substring(i + key.Length + 1, i1 - (i + key.Length + 1));
            return result;
        }
    }
}
