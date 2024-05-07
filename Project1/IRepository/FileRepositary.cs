using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Project1.IRepository
{
   
    public class FileRepository : IFileRepository
    {
         int version = 1;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHost;

        public FileRepository(ApplicationDbContext context, IWebHostEnvironment webHost)
        {
            _context = context;
            _webHost = webHost;
        }

        public async Task UploadFile(IFormFile file)
        {
            try
            {
                string uploadsFolder = Path.Combine(_webHost.WebRootPath, "Upload");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string fileName = Path.GetFileName(file.FileName);
                string fileSavePath = Path.Combine(uploadsFolder, fileName);

                using (FileStream stream = new FileStream(fileSavePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var existingFile = await _context.FilesTb.FirstOrDefaultAsync(u => u.FileName == file.FileName);
                //if (existingFile != null)
                //{
                //    _context.FilesTb.Remove(existingFile);
                //}

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var uploadFile = new UploadModel
                    {
                        FileName = file.FileName,
                        FileType = file.ContentType,
                        Data = memoryStream.ToArray()

                    };
                    _context.FilesTb.Add(uploadFile);
                    if(existingFile == null)
                    {
                        await _context.SaveChangesAsync();
                    }    
                }
            }
            catch (Exception ex)
            {
               
                throw new Exception("An error occurred while uploading the file.", ex);
            }
        }

        public async Task<IEnumerable<UploadModel>> GetAllUploads()
        {
            try
            {
                return await _context.FilesTb.ToListAsync();
            }
            catch (Exception ex)
            {
                
                throw new Exception("An error occurred while fetching the files.", ex);
            }
        }

        public async Task<UploadModel> GetFileByName(string fileName)
        {
            try
            {
                
                return await _context.FilesTb.FirstOrDefaultAsync(f => f.FileName == fileName);
            }
            catch (Exception ex)
            {
               
                throw new Exception($"An error occurred while fetching the file '{fileName}'.", ex);
            }
        }

        //public async Task<byte[]> DownloadFile(int id)
        //{
        //    try
        //    {
        //        var file = await _context.FilesTb.FindAsync(id);
        //        return file?.Data;
        //    }
        //    catch (Exception ex)
        //    {
               
        //        throw new Exception("An error occurred while downloading the file.", ex);
        //    }
        //}

        public bool FileCheck(string fileName)
        {
            try
            {
                var wwwrootpath = _webHost.WebRootPath;
                var folderpath = Path.Combine(wwwrootpath, "Upload");

                if (!Directory.Exists(folderpath))
                {
                    Directory.CreateDirectory(folderpath);
                }

                var filepath = Path.Combine(folderpath, fileName);

                if (System.IO.File.Exists(filepath))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("An error occurred while checking the file: " + ex.Message);
                return false;
            }
        }
        public MemoryStream DownloadFile(string path)
        {
            try
            {
                //var FullFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "FilesUpload", filename);
                var memory = new MemoryStream();
                if (System.IO.File.Exists(path))
                {
                    var net = new System.Net.WebClient();
                    var data = net.DownloadData(path);
                    var content = new System.IO.MemoryStream(data);
                    memory = content;
                }
                memory.Position = 0;
                return memory;
            }
            catch (Exception )
            {
                return null;
            }

        }

        public void VersionNumber(IFormFile file)
        {
            throw new NotImplementedException();
        }


        //public void VersionNumber(IFormFile file)
        //{
        //    string directory = Path.Combine(_webHost.WebRootPath, "Upload");
        //    if (!Directory.Exists(directory))
        //    {
        //        Directory.CreateDirectory(directory);
        //    }

        //    string filename = file.FileName;
        //    filename = filename + "v" + version;
        //    version++;
        //    string path = Path.Combine(directory, filename);
        //    using (FileStream stream = new FileStream(path, FileMode.Create))
        //    {
        //        file.CopyToAsync(stream);
        //    }

        //    using (var memorystream = new MemoryStream())
        //    {
        //        file.CopyTo(memorystream);
        //        var upload = new UploadModel
        //        {
        //            FileName = filename,
        //            FileType = file.ContentType,
        //            Data = memorystream.ToArray()
        //        };
        //        _context.FilesTb.Add(upload);
        //        _context.SaveChanges();
        //    }
        //    //string extension= Path.GetExtension(file.FileName);
        //    //string getfilewithoutExtension = Path.GetFileNameWithoutExtension(file.FileName);   

        //}       
    }
}
