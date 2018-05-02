using System;
using System.ComponentModel.DataAnnotations;

namespace TransitIQ.Interfaces.Entities
{
    public class GtfsSubAgency
    {
        [Key]
        public string GtfsFileId { get; set; }
        public string AgencyName { get; set; }
        public string AgencyAbbr { get; set; }
        public bool IgnoreAgency { get; set; }
    }
}
