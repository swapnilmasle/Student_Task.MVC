//using Project1.Data;
//using Project1.IRepository;
//using Project1.Models;
//using static Project1.Concrete.LoginConcrete;
//using System;
//using Microsoft.EntityFrameworkCore;

//namespace Project1.Concrete
//{
//    public class LoginConcrete
//    {
//        private readonly ApplicationDbContext _dbContext;

//        public LoginConcrete(ApplicationDbContext dbContext)
//        {
//            _dbContext = dbContext;
//        }

//        public bool ValidateCredentials(string email, string password)
//        {
          
//            var user = _dbContext.registrationsTb.Where(u => u.Email == email && u.Password == password).FirstOrDefault();
//            if(user != null)
//            {
//                return true;
//            }
//            return false;
//        }

//        public int AddUser(Registration user)
//        {           
          
//            if(user != null)
//            {
//                var add=_dbContext.registrationsTb.Add(user);
//                if (add != null)
//                {
//                    _dbContext.SaveChanges();
//                    return 1;
//                }
//            }     
//            else
//            {
//                return 0;
//            }
//            return 0;
//        }

//        //public Registration GetUserByEmail(string email)
//        //{
            
//        //    return _dbContext.registrationsTb.FirstOrDefault(u => u.Email == email);
            
//        //}

//        public void SaveChanges()
//        {
//            _dbContext.SaveChanges();
//        }

//    }
//}
