using System.Collections.Generic;

namespace TransitIQ.API.Models
{
    public class Authorization
    {
        /// <summary>
        /// Gets or sets the unique identifier associated with the current authorization
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the subject associated with the current authorization
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets the space-delimited scopes associated with the current authorization
        /// </summary>
        public string Scope { get; set; }

        /// <summary>
        /// Gets or sets the application id
        /// </summary>
        public long ApplicationId { get; set; }

        /// <summary>
        /// Gets or sets the application
        /// </summary>
        public Application Application { get; set; }

        /// <summary>
        /// Gets or sets the list of tokens associated with the current authorization
        /// </summary>
        public virtual ICollection<Token> Tokens { get; set; }

        public Authorization()
        {
            Id = System.Guid.NewGuid().ToString();
        }
    }
}
