using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Linq;
using CsvHelper;
using NodaTime;
using TransitIQ.Interfaces.Entities;

namespace TransitIQ.Services.Helpers
{
    public class GtfsHelper
    {
        public static string GetGtfsFileId(string agencyId)
        {
            var date = DateTime.Now;
            return $"{agencyId}_{date.Year}_{date.Month}_{date.Day}_{(date - date.Date).Ticks}.zip";
        }

        public static void ParseGtfs(Stream fileContent, out DateTime? fromDate, out DateTime? toDate, out string timezone, out List<GtfsSubAgency> gtfsSubAgencies)
        {
            gtfsSubAgencies = new List<GtfsSubAgency>();

            using (var gtfsZip = new ZipArchive(fileContent, ZipArchiveMode.Read, true))
            {
                var file = gtfsZip.GetEntry("agency.txt");

                ParseAgencyFile(file, out timezone, out  gtfsSubAgencies);

                file = gtfsZip.GetEntry("stop_times.txt");

                var serviceStartTime = ParseStopTimesFile(file);

                ParseCalendars(gtfsZip.GetEntry("calendar.txt"),
                    gtfsZip.GetEntry("calendar_dates.txt"),
                    serviceStartTime, out fromDate, out toDate);
            }
        }

        private static TimeSpan? ParseStopTimesFile(ZipArchiveEntry zipEntry)
        {
            TimeSpan? serviceStartTime = null;
            //var records = new List<GtfsSubAgency>();

            using (var reader = new StreamReader(zipEntry.Open()))
            {
                using (var csv = new CsvReader(reader))
                {
                    csv.Read();
                    csv.ReadHeader();
                    while (csv.Read())
                    {
                        TimeSpan arrivalTime;

                        if (TimeSpan.TryParseExact(csv["arrival_time"], "t", CultureInfo.InvariantCulture,
                                out arrivalTime) &&
                            (!serviceStartTime.HasValue ||
                             serviceStartTime.Value > arrivalTime))
                            serviceStartTime = arrivalTime;
                    }
                }
            }

            return serviceStartTime;
        }

        private static void ParseCalendars(
            ZipArchiveEntry calendarZipEntry,
            ZipArchiveEntry datesZipEntry,
            TimeSpan? serviceStartTime, out DateTime? fromDate, out DateTime? toDate) { 
        
            var dates = new List<DateTime>();
            fromDate = null;
            toDate = null;

            using (var reader = new StreamReader(calendarZipEntry.Open()))
            {
                using (var csv = new CsvReader(reader))
                {
                    csv.Read();
                    csv.ReadHeader();
                    while (csv.Read())
                    {
                        TimeSpan start_date;

                        if (TimeSpan.TryParseExact(csv.GetField<string>("start_date"), "yyyyMMdd",
                                CultureInfo.InvariantCulture, out start_date) &&
                            (!serviceStartTime.HasValue ||
                             serviceStartTime.Value > start_date))
                            serviceStartTime = start_date;
                    }
                }
            }

            using (var reader = new StreamReader(datesZipEntry.Open()))
            {
                using (var csv = new CsvReader(reader))
                {
                    csv.Read();
                    csv.ReadHeader();
                    while (csv.Read())
                    {
                        var dateStr = csv.GetField<string>("date");

                        DateTime date;

                        if (DateTime.TryParseExact(csv.GetField<string>("date"), "yyyyMMdd",
                            CultureInfo.InvariantCulture, DateTimeStyles.None, out date))
                            dates.Add(date);
                    }
                }
            }

            if (dates.Any())
            {
                dates.Sort();

                fromDate = dates.First();
                toDate = dates.Last();
            }
        }

        private static void ParseAgencyFile( ZipArchiveEntry zipEntry, out string timezone, out List<GtfsSubAgency> gtfsSubAgencies)
        {
            timezone = string.Empty;
            gtfsSubAgencies = new List<GtfsSubAgency>();

            using (var reader = new StreamReader(zipEntry.Open()))
            {
                using (var csv = new CsvReader(reader))
                {
                    csv.Read();
                    csv.ReadHeader();
                    while (csv.Read())
                    {
                        timezone = csv.GetField<string>("agency_timezone");

                        gtfsSubAgencies.Add(new GtfsSubAgency
                        {
                            AgencyName = csv.GetField<string>("agency_name"),
                            IgnoreAgency = false
                        });
                    }
                }
            }
        }


        public static DateTimeOffset DateTimeToDateTimeOffset(string timezone, DateTime date)
        {
            var offset = DateTimeZoneProviders.Tzdb[timezone].GetUtcOffset(Instant.FromDateTimeUtc(DateTime.UtcNow)).ToTimeSpan();

            return new DateTimeOffset(date, offset);
        }
    }

   
}
