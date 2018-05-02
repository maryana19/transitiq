using System;
using System.ComponentModel.DataAnnotations;

namespace TransitIQ.Interfaces.Entities
{
    public class GtfsFile
    {
        [Key]
        public string GtfsFileId { get; set; }
        public string AgencyId { get; set; }
        public string OriginalName { get; set; }
        public DateTime UploadedUtc { get; set; }
        public DateTimeOffset? CalendarFrom { get; set; }
        public DateTimeOffset? CalendarTo { get; set; }
        public string Status { get; set; }
        public bool? Valid { get; set; }
    }
}
