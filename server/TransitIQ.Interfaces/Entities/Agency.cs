namespace TransitIQ.Interfaces.Entities
{
    public class Agency
    {
        public string AgencyId { get; set; }
        public string AgencyName { get; set; }
        public string RealtimeDataReceiverService { get; set; }
        public string StorageAccountName { get; set; }
        public string StorageAccountKey { get; set; }
        public decimal? TimeZoneOffset { get; set; }
       
    }
}
