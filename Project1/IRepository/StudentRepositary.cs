using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.Models;

namespace Project1.IRepository
{
    public class StudentRepositary : IStudentRepositary
    {
        private readonly ApplicationDbContext _context;
        private List<StudentModel> _students;

        public StudentRepositary(ApplicationDbContext context)
        {
            _context = context;
            _students = new List<StudentModel>();
        }
        public int AddStudent(StudentModel student)
        {
            StudentModel studentModel = new StudentModel();
            studentModel.FirstName = student.FirstName;
            studentModel.LastName = student.LastName;
            studentModel.Major = student.Major;
            studentModel.ExpectedYearGraduation = student.ExpectedYearGraduation;
            studentModel.StreetAddress1 = student.StreetAddress1;
            studentModel.StreetAddress2 = student.StreetAddress2;
            studentModel.Region = student.Region;
            studentModel.ZipCode = student.ZipCode;
            studentModel.Email = student.Email;
            studentModel.PhoneNumber = student.PhoneNumber;
            studentModel.PreferredContactCheackBox = student.PreferredContactCheackBox;
            studentModel.IssuesOccurredDate = student.IssuesOccurredDate;
            studentModel.NameofPersonInvolved = student.NameofPersonInvolved;
            studentModel.ComplaintDetialArea = student.ComplaintDetialArea;
            studentModel.ResolveComplaintArea = student.ResolveComplaintArea;
            studentModel.PriorattemptsArea = student.PriorattemptsArea;
            studentModel.ResolutionArea = student.ResolutionArea;
            studentModel.OtherInformationArea = student.OtherInformationArea;

            var result = _context.StudentsTb.Add(student);

            if (result != null)
            {
                _context.SaveChanges();
                return 1;
            }
            return 0;
        }
        public IEnumerable<CityModel> GetCitiesByCountryId(int countryId)
        {
            return _context.CitysTb.Where(c => c.CountryId == countryId).ToList();
        }
        public IEnumerable<StudentModel> GetAllStudents()
        {
            var getall = _context.StudentsTb.Where(u => u.IsDeleted == false).ToList();
            return getall;
        }

        public StudentModel GetIdFromView(int id)
        {
            return _context.StudentsTb.Where(s => s.StudentId == id).FirstOrDefault();
        }
        public int Delete(int id)
        {
            int i = 0;
            var deleteid = _context.StudentsTb.Find(id);
            if (deleteid != null)
            {
                deleteid.IsDeleted = true;
                i = _context.SaveChanges();
            }
            return i;
        }
        public int Update(StudentModel student)
        {
            var existing = _context.StudentsTb.Where(u => u.StudentId == student.StudentId).FirstOrDefault();
            int i = 0;
            if (existing != null)
            {
                existing.FirstName = student.FirstName;
                existing.LastName = student.LastName;
                existing.Major = student.Major;
                existing.ExpectedYearGraduation = student.ExpectedYearGraduation;
                existing.StreetAddress1 = student.StreetAddress1;
                existing.StreetAddress2 = student.StreetAddress2;
                existing.CountryId = student.CountryId;
                existing.CityId= student.CityId;
                existing.Region = student.Region;
                existing.ZipCode = student.ZipCode;
                existing.Email = student.Email;
                existing.PhoneNumber = student.PhoneNumber;
                existing.PreferredContactCheackBox = student.PreferredContactCheackBox;
                //Information about your complaint
                existing.IssuesOccurredDate = student.IssuesOccurredDate;
                existing.NameofPersonInvolved = student.NameofPersonInvolved;
                existing.ComplaintDetialArea = student.ComplaintDetialArea;
                existing.ResolveComplaintArea = student.ResolveComplaintArea;
                existing.PriorattemptsArea = student.PriorattemptsArea;
                existing.ResolutionArea = student.ResolutionArea;
                existing.OtherInformationArea = student.OtherInformationArea;
                  i =_context.SaveChanges();

            }
            return i;
            
        }

    }
}