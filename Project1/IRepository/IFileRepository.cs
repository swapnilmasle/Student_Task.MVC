using Project1.Models;
using System.Drawing.Drawing2D;

namespace Project1.IRepository
{
    public interface IFileRepository
    {
        Task UploadFile(IFormFile file);
       // Task<byte[]> DownloadFile(int id);

        Task<IEnumerable<UploadModel>> GetAllUploads();
        Task<UploadModel> GetFileByName(string fileName);
        bool FileCheck( string fileName);


         MemoryStream DownloadFile(string path);

        public void VersionNumber(IFormFile file);



    }
}
