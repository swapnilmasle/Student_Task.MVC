using Microsoft.AspNetCore.Mvc;
using Project1.IRepository;
using Project1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
//using project1.fillters;

namespace Project1.Controllers
{
    //[Route("/")]
    //[Route("FileOperation")]
    public class FileOperationController : Controller
    {
        private readonly IFileRepository _fileRepository;
        public FileOperationController(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        // [Authentication]
        public IActionResult FileUpload()
        {
            var model = new UploadModel();
            return View("~/Views/FileOperation/FileUpload.cshtml", model);
        }


        // [Authentication]
        [HttpPost]
        //[Route("")]
        //[Route("FileUpload")]

        public async Task<IActionResult> FileUpload(List<IFormFile> files)
        {
            int count = 0;

            foreach (var fileItem in files)
            {
                var existingFile = await _fileRepository.GetFileByName(fileItem.FileName);
                await _fileRepository.UploadFile(fileItem);
                count++;
            }
            if (count == 1)
            {
                ViewBag.Message = count + " file uploaded successfully";
            }
            else
            {
                ViewBag.Message = count + " files uploaded successfully";
            }
            return View();

        }

        public async Task<IActionResult> GetFiles()
        {
            var list = await _fileRepository.GetAllUploads();
            return View(list);
        }

        public ActionResult FetchAllFile()
        {
            var GetPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload");
            if (!Directory.Exists(GetPath))
            {
                return NotFound();
            }
            string[] Filename = Directory.GetFiles(GetPath).Select(Path.GetFileName).ToArray();
            return Json(Filename);

        }
        public IActionResult FileChecking(string fileName)
        {
            bool check = _fileRepository.FileCheck(fileName);
            return Ok(new { fileExists = check });

        }
        public ActionResult GetVersionNumber(List<IFormFile> file)
        {
            foreach (var filenew in file)
            {
                _fileRepository.VersionNumber(filenew);
            }

            return RedirectToAction("GetFiles");
        }
    

        public IActionResult FileDowmload(string Filename, string Filetype)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", Filename);
            var memory = _fileRepository.DownloadFile(filepath);
            return File(memory.ToArray(), Filetype, Filename);
        }

        //  public async Task<IActionResult> Download(int id)
        //{
        //    var file = await _fileRepository.DownloadFile(id);
        //    if (file == null)
        //    {
        //        return NotFound();
        //    }
        //    return File(file, "application/octet-stream");
        //}



        //public async Task<IActionResult> Download(int id)
        //{
        //    var fileData = await _fileRepository.DownloadFile(id);
        //    if (fileData == null)
        //    {
        //        return NotFound(); // Handle file not found scenario
        //    }

        //    var file = await _fileRepository.GetFileById(id); // Assuming you have a method to retrieve file metadata

        //    // Determine content type based on file extension
        //    string contentType;
        //    switch (file.Extension.ToLower())
        //    {
        //        case ".jpg":
        //        case ".jpeg":
        //            contentType = "image/jpeg";
        //            break;
        //        case ".png":
        //            contentType = "image/png";
        //            break;
        //        // Add more cases for other image formats if needed
        //        default:
        //            contentType = "application/octet-stream"; // Default to generic binary type
        //            break;
        //    }

        //    // Return the file data as a file result with appropriate content type
        //    return File(fileData, contentType);
        //}

    }
}
