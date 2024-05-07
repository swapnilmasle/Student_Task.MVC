using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.Models;

namespace Project1.IRepository
{
    public interface IUserRepositary
    {
        //   Registration ValidateUser(string username, string password);
        bool ValidateCredentials(string username, string password);
        int Add(Registration user);
        IEnumerable<Project1.Models.Registration> GetallList();
        void SaveChanges();
        Registration Edit(int id,Registration update);
        Registration GetById(int id);

        Registration Delete(int id);




    }
    public class UserRepositary : IUserRepositary
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepositary(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool ValidateCredentials(string email, string password)
        {

            var user = _dbContext.registrationsTb.Where(u => u.Email == email && u.Password == password && u.IsDeleted==false).FirstOrDefault();
            if (user != null)
            {
                return true;
            }
            return false;
        }

        public int Add(Registration user)
        {
            try
            {
                if (user != null && _dbContext != null)
                {
                    _dbContext.registrationsTb.Add(user);
                    _dbContext.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0; 
                }
            }
            catch (Exception)
            {
                
                return -1; 
            }

        }

        public IEnumerable<Project1.Models.Registration> GetallList()
        {
           var getlist = _dbContext.registrationsTb.Where(u=> u.IsDeleted==false).ToList();
           return getlist;

        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
        public Registration Edit(int id,Registration update)
        {
           var getid = _dbContext.registrationsTb.Find(id);
            if (getid != null)
            {
                
                getid.Name = update.Name;
                getid.Email= update.Email;
                _dbContext.registrationsTb.Update(getid);
                _dbContext.SaveChanges();
                return getid;
            }
            else 
            {
                throw new InvalidOperationException("No registration found with the provided ID.");
            }
        }
        public Registration Delete(int id)
        {
            var registration = _dbContext.registrationsTb.Find(id);

            if (registration != null)
            {
                registration.IsDeleted = true;
                
                _dbContext.SaveChanges();
            }
            return registration;
        }
        public Registration GetById(int id)
        {
            return _dbContext.registrationsTb.FirstOrDefault(u => u.Id == id);
        }

    }
}
    
