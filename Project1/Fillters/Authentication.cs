
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace project1.fillters
{
    public class Authentication : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            var user = context.HttpContext.Session.GetString("User");
            if (user == null)
            {
                context.Result = new RedirectToActionResult("LoginPage", "Login", null);
            }
        }
    }
}
