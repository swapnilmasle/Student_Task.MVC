// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
  //Custom JavaScript Validation Logic-- >
 
    
$(document).ready(function () {

        $("#name").on("input", function () {
            var name = $("#name").val();
            if (!/^[a-z]{1}[a-zA-Z\s]+$/.test(name)) {
                $("#nameError").text("Name should only contain letters");
                $("#nameIcon").html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                $("#nameError").text("");
                $("#nameIcon").html('<i class="bi bi-check-circle text-success"></i>'); 
            }
        });

        $("#email").on("input", function () {
            var email = $("#email").val();
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email) || email.length === 0) {
                    $("#emailError").text("Please enter a valid email address");
                    $("#emailIcon").html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                    $("#emailError").text("");
                    $("#emailIcon").html(''); 
            }
        });

        $("#password").on("input", function () {
            var password = $("#password").val();
            var strength = 0;

            
            if (password.length < 8) {
                $("#passwordError").text("Password must be at least 8 characters long");
                $("#passwordIcon").html('<i class="bi bi-exclamation-circle text-danger"></i>');
                return;
            } else {
                $("#passwordError").text("");
                $("#passwordIcon").html(''); 
            }

            
            if (/[A-Z]/.test(password)) {
                strength++;
            }

            
            if (/[a-z]/.test(password)) {
                strength++;
            }

            
            if (/\d/.test(password)) {
                strength++;
            }

            
            if (/[$-/:-?{-~!"^_`\[\]]/.test(password)) {
                strength++;
            }

            
            switch (strength) {
                case 1:
                    $("#passwordError").text("Weak password");
                    break;
                case 2:
                    $("#passwordError").text("Moderate password");
                    break;
                case 3:
                case 4:
                    $("#passwordError").text("Strong password");
                    break;
                default:
                    $("#passwordError").text("");
            }
        });

        // Confirm password validation
        $("#confirmpassword").on("input", function () {
            var password = $("#password").val();
            var confirmPassword = $("#confirmpassword").val();

            if (password !== confirmPassword) {
                $("#confirmPasswordError").text("Passwords do not match");
                $("#confirmpasswordIcon").html('<i class="bi bi-exclamation-circle text-danger"></i>');
            } else {
                $("#confirmPasswordError").text("");
                $("#confirmpasswordIcon").html(''); 
            }
        });
    });
