using Microsoft.EntityFrameworkCore;
using Project1.Data;
using Project1.IRepository;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddDbContext<ApplicationDbContext>
    (option => option.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

builder.Services.AddScoped<IUserRepositary, UserRepositary>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IStudentRepositary, StudentRepositary>();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICityRepository, CityRepository>();

 builder.Services.AddRazorPages().AddViewOptions(
    options=> options.HtmlHelperOptions.ClientValidationEnabled=true);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSession(Options =>
{
    Options.IdleTimeout = TimeSpan.FromMinutes(20);
    Options.Cookie.HttpOnly = true;
    Options.Cookie.IsEssential = true;
});

//Connecting to Web to Api
builder.Services.AddHttpClient();



   

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseSession();




app.MapControllerRoute(
    name: "Name",
    pattern: "{controller=StudentComplaint}/{action=AddStudentDetials}/{id?}");

app.Run();
