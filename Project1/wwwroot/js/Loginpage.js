
var validateGlobal = {
    email: "#email",
    password: "#password",
    emailError: "#emailError",
    passwordError: "#passwordError",
    InvalidMessage: "#InvalidMessage",
    EmailIcon: "#emailIcon",
    passwordIcon: "#PasswordIcon"
};

$(document).ready(function () {
    // $('#Message').hide();
    $(validateGlobal.email).on('input', function () {
        var email = $(this).val();
        console.log("password");

        if (!/^[a-zA-Z]{1}[a-z0-9]+@gmail.com$/.test(email)) {
            $('#Message').hide();
            $(validateGlobal.emailError).text('Enter a valid email address').show();
            $(validateGlobal.EmailIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(validateGlobal.emailError).hide();
            $(validateGlobal.InvalidMessage).hide();
            $(validateGlobal.EmailIcon).hide();
            if (email.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
        }
    });

    // password regular expression checking in on event
    $(validateGlobal.password).on('input', function () {
        var password = $(this).val();
        console.log("password");
        if (!/^[a-zA-Z0-9@]{4,15}$/.test(password)) { // Check if password length is between 4 and 15 characters
            $(validateGlobal.passwordError).text('Password must be between 4 and 15 characters long').show();
            $(validateGlobal.passwordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
        } else {
            $(validateGlobal.passwordError).hide();
            $(validateGlobal.passwordIcon).hide();
            if (password.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid is-invalid');
            }
        }
    });



    $('#loginForm').submit(function (event) {
        console.log("submited");
       
        event.preventDefault();
     
        // Perform validation
        var isValid = validateForm();

        // If all fields are valid, submit the form
        if (isValid) {
            this.submit();
            // Here you can proceed with submitting the form to the server
        }
    });
    

    function validateForm() {
        // Get input values
        var email = $(validateGlobal.email).val();
        var password = $(validateGlobal.password).val();
        if (email != '' && password != '') {
            // $('#Message').text('Invalid Credentials').show();
        }

        // Reset error messages
        $('.error').text('');

        // Flag to track form validity
        var isValid = true;

        // Validate email
        if (!email) {
            $(validateGlobal.emailError).text('Email is required').show();
            $(validateGlobal.EmailIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
          /*  swal.fire("Error", "Email is required", "error");*/
           
            isValid = false;
        }// else if (!/^[a-z]$/.test(email)) { // Check if email has valid format
        //     $('#emailError').text('Enter a valid email address').show();
        //     isValid = false;
        // }

        // Validate password
        if (!password) {
            $(validateGlobal.passwordError).text('Password is required').show();
            $(validateGlobal.passwordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            /*  swal.fire("Error", "Password is required", "error");*/
            
            isValid = false;
        }

        return isValid;
    }
});