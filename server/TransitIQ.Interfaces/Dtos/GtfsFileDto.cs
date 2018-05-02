using System;
using System.Collections.Generic;
using System.Text;

namespace TransitIQ.Interfaces.Dtos
{
    public class GtfsFileDto
    {
        public string GtfsFileId { get; set; }
        public string AgencyId { get; set; }
        public string OriginalName { get; set; }
        public DateTime UploadedUtc { get; set; }
        public DateTime? CalendarFrom { get; set; }
        public DateTime? CalendarTo { get; set; }
        public string Status { get; set; }
        public bool? Valid { get; set; }
    }
}
