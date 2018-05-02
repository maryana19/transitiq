using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIQ.API.Models
{
    public class Application
    {
        /// <summary>
        /// Id of the application
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Name of the application
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Type of application (public or confidential)
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Client Id for application
        /// </summary>
        public string ClientId { get; set; }

        /// <summary>
        /// Hashed client secret
        /// </summary>
        public string ClientSecret { get; set; }

        /// <summary>
        /// Uri to redirect to 
        /// </summary>
        public string RedirectUri { get; set; }

        /// <summary>
        /// Uri to redirect to when logging out
        /// </summary>
        public string LogoutRedirectUri { get; set; }

        /// <summary>
        /// Gets the list of the authorizations associated with this application.
        /// </summary>
        public ICollection<Authorization> Authorizations { get; }

        /// <summary>
        /// Gets the list of the tokens associated with this application.
        /// </summary>
        public ICollection<Token> Tokens { get; set; }
    }
}
