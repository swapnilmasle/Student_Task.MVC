using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class UploadModel
    {
        [Key]
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public byte[] Data { get; set; }
    }
}
