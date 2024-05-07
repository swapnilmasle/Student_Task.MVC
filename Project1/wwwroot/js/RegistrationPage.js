
$(document).ready(function () {
    var validate = {
        name: "#name",
        email: "#email",
        password: "#password",
        confirmPassword: "#confirmPassword",
        NameError: "#nameError",
        NameIcon: "#nameIcon",
        EmailError: "#emailError",
        EmailIcon: "#emailIcon",
        PassswordError: "#passwordError",
        PasswordIcon: "#passwordIcon",
        ConfirmPasswordError: "#confirmPasswordError",
        ConfirmPasswordIcon: "#confirmPasswordIcon",
        RegistrationForm: "#registrationForm",
        SubmitButton: "#Submit" 
    };

    $(validate.name).on('input', function () {
            var name = $(validate.name).val();
            if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(name)) {
                $(validate.NameError).text("Name should only contain letters");
                $(validate.NameIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                $(validate.NameError).text("");
                $(validate.NameIcon).html('<i class="bi bi-check-circle text-success"></i>');
            }
    });

    $(validate.email).on('input', function () {
            var email = $(validate.email).val();
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email) || email.length === 0) {
                $(validate.EmailError).text("Please enter a valid email address");
                $(validate.EmailIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                $(validate.EmailError).text("");
                $(validate.EmailIcon).html('');
            }
        });

    $(validate.password).on('input', function () {
            var password = $(validate.password).val();

            if (password.length < 5) {
                $(validate.PassswordError).text("Password must be at least 5 characters long");
                $(validate.PasswordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>');
                return;
            } else {
                $(validate.PassswordError).text("");
                $("#passwordIcon").html('');
            }

        });

    // Confirm password validation
    $(validate.confirmPassword).on('input', function () {
            var password = $(validate.password).val();
            var confirmPassword = $(validate.confirmPassword).val();

            if (password !== confirmPassword) {
                $(validate.ConfirmPasswordError).text("Passwords do not match");
                $(validate.ConfirmPasswordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                $(validate.ConfirmPasswordError).text("");
                $(validate.ConfirmPasswordIcon).html('');
            }
        });


        $(validate.SubmitButton).click(function (event) {
            console.log("Button clicked");
            event.preventDefault(); // Prevent default button click behavior

            if (validateForm()) {
                console.log("Form is valid. Submitting...");

                // Disable the button to prevent multiple submissions
                $(this).prop('disabled', true);

                // Perform any additional actions before submission, if needed

                // Then submit the form programmatically
                $(this).closest('form').submit();
            } else {
                console.log("Form validation failed.");
            }
        });
    

    function validateForm() {
        var name = $(validate.name).val().trim();
        var email = $(validate.email).val().trim();
        var password = $(validate.password).val().trim();
        var confirmPassword = $(validate.confirmPassword).val().trim();

        $('.error').text('');
        var isValid = true;

        if (!name) {
            $(validate.NameError).text("Name is Required").show();
            $(validate.NameIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            isValid = false;
        }
        if (!email) {
            $(validate.EmailError).text("Email is Required").show();
            $(validate.EmailIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            isValid = false;
        }
        if (!password) {
            $(validate.PassswordError).text("Password is Required").show();
            $(validate.PasswordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            isValid = false;
        }
        if (!confirmPassword) {
            $(validate.ConfirmPasswordError).text("Confirm Password is Required").show();
            $(validate.ConfirmPasswordIcon).html('<i class="bi bi-exclamation-circle text-danger"></i>').show();
            isValid = false;
        }
        return isValid;
    }

});


