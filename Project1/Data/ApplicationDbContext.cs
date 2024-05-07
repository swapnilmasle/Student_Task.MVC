using Microsoft.EntityFrameworkCore;
using Project1.Models;
using System.Collections.Generic;

namespace Project1.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> option) : base(option)
        {

        }
        public DbSet<Registration> registrationsTb { get; set; }
        public DbSet<UploadModel> FilesTb { get; set; }

        public DbSet<StudentModel> StudentsTb { get; set;}

        public DbSet<CountryModel> CountrysTb { get; set; }
        public DbSet<CityModel> CitysTb { get; set; }

       

    }
}
