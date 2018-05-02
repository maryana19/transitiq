using System;
using TransitIQ.Interfaces.Dtos;
using TransitIQ.Interfaces.Entities;

namespace TransitIQ.Interfaces.Extensions
{
    public static class GtfsFileExtensions
    {
        public static GtfsFileDto ToView(this GtfsFile gtfs)
        {
            var dto = new GtfsFileDto
            {
                AgencyId = gtfs.AgencyId,
                GtfsFileId = gtfs.GtfsFileId,
                OriginalName = gtfs.OriginalName,
                UploadedUtc = gtfs.UploadedUtc,
                Valid = gtfs.Valid
            };

            if (gtfs.CalendarFrom.HasValue)
            {
                dto.CalendarFrom = gtfs.CalendarFrom.Value.LocalDateTime;
            }

            if (gtfs.CalendarTo.HasValue)
            {
                dto.CalendarTo = gtfs.CalendarTo.Value.LocalDateTime;
            }

            return dto;
        }
    }
}
