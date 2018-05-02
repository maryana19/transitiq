using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using TransitIQ.Interfaces;

namespace TransitIQ.AzureStorage
{
    public class Storage: IStorage
    {
        private readonly StorageSettings _settings;

        public Storage(IOptions<StorageSettings> options)
        {
            _settings = options.Value;
        }

        private const string StorageConnectionStringPattern = "DefaultEndpointsProtocol=https;AccountName={0};AccountKey={1}";
        private const string ContainerName = "gtfs";
        private const string StorageConnectionString =  "https://{0}.blob.core.windows.net/{1}/{2}";
        
        public async Task<string> StoreFileInBlob(string storageName, string filename, byte[] fileBytes)
        {
            var accountKey = _settings.StorageAccounts[storageName];

            var url = string.Format(StorageConnectionString, storageName, ContainerName, filename);
            var creds = new StorageCredentials(storageName, accountKey);
            var blob = new CloudBlockBlob(new Uri(url), creds);

            try
            {
                if (!(await blob.ExistsAsync()))
                {
                    await blob.UploadFromByteArrayAsync(fileBytes, 0, fileBytes.Length);
                }
            }
            catch (Exception ex)
            {
                
            }
            return url;
        }

        public async Task<string> StoreFileInBlob(string storageName, string filename, Stream stream)
        {
            var accountKey = _settings.StorageAccounts[storageName];

            var url = string.Format(StorageConnectionString, storageName, ContainerName, filename);
            var creds = new StorageCredentials(storageName, accountKey);
            var blob = new CloudBlockBlob(new Uri(url), creds);

            try
            {
                if (!(await blob.ExistsAsync()))
                {
                    await blob.UploadFromStreamAsync(stream);
                }
            }
            catch (Exception ex)
            {

            }
            return url;
        }

        public async Task DeleteBlob(string storageName, string filename)
        {
            var accountKey = _settings.StorageAccounts[storageName];

            var url = string.Format(StorageConnectionString, storageName, ContainerName, filename);
            var creds = new StorageCredentials(storageName, accountKey);
            var blob = new CloudBlockBlob(new Uri(url), creds);

            await blob.DeleteIfExistsAsync();
        }
    }
}
