using Project1.Models;

namespace Project1.IRepository
{
    public interface IStudentRepositary
    {
        //int Addstudent(StudentModel student);
        //IEnumerable<StudentModel> Alllist();

        int AddStudent(StudentModel student);
        IEnumerable<StudentModel> GetAllStudents();
        
        IEnumerable<CityModel> GetCitiesByCountryId(int countryId);

        StudentModel GetIdFromView(int id);

        int Delete(int id);

        int Update(StudentModel student);
    }

   
}
