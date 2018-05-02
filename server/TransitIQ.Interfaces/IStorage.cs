using System.IO;
using System.Threading.Tasks;

namespace TransitIQ.Interfaces
{
    public interface IStorage
    {
        Task<string> StoreFileInBlob(string storageName, string filename, byte[] fileBytes);

        Task<string> StoreFileInBlob(string storageName, string filename,Stream stream);

        Task DeleteBlob(string storageName, string filename);

    }
}
