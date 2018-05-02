using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIQ.API.Models
{
    public class Token
    {
        /// <summary>
        /// Gets or sets the unique identifier associated with the current token
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Id of the authorization that this token is associated with
        /// </summary>
        public string AuthorizationId { get; set; }

        /// <summary>
        /// Authorization that this token is associated with
        /// </summary>
        public Authorization Authorization { get; set; }

        /// <summary>
        /// Id of the application that this token is assoicated with
        /// </summary>
        public long ApplicationId { get; set; }

        /// <summary>
        /// Application that this token is assoicated with
        /// </summary>
        public Application Application { get; set; }

        /// <summary>
        /// Gets or sets the type of the current token
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Gets or sets the subject associated with the current token
        /// </summary>
        public string Subject { get; set; }

        public Token()
        {
            Id = System.Guid.NewGuid().ToString();
        }
    }
}
