var globalvariable = {
    fileId: "#fileId",
    uploadfileId: "#uploadfileId",
    Errormesssagefile: "#Errormesssagefile",
    Errormessagebutton: "#Errormessagebutton",
    Formid: "#Formid",
    ErrorfileIcons: "#ErrorfileIcons"

};
$(document).ready(function () {
    console.log("Loaded");


    $(globalvariable.fileId).on('change', function () {
        var file = $(this).val();
        if (file != '') {
            var validExtensions = [".jpg", ".jpeg", ".png", ".ppt", ".pdf", ".doc", ".docx", ".xls", ".xlsx"];
            var fileExtension = file.split('.').pop().toLowerCase();
            if ($.inArray("." + fileExtension, validExtensions) == -1) {
                $(globalvariable.Errormesssagefile).text("Invalid file format. Allowed formats are: .jpg, .png, .ppt, .pdf, .doc, .docx, .xls, .xlsx").show();
                $(globalvariable.ErrorfileIcons).show();
                $(this).val(''); // Clear the file input
            } else {
                $(globalvariable.Errormesssagefile).hide();
                $(globalvariable.ErrorfileIcons).hide();
            }
        }
    });
      

    $(globalvariable.Formid).submit('click',function (event) {
        
        event.preventDefault();
        var fileid = $(globalvariable.fileId).val();
    
        var IsValid = true;
        if (fileid =='') {
            $(globalvariable.Errormesssagefile).text("Choose File to upload").show();
            $(globalvariable.ErrorfileIcons).show();
           
            IsValid = false;
            console.log("Submited");
        }
        else {
            $(globalvariable.Errormesssagefile).hide();
            IsValid = true;
        }
        if (IsValid) {
            $(this).unbind('submit').submit();
        }

    });
});


function uploadFile() {
    // Get the file input element
    var fileInput = document.querySelector('input[type="file"]');
    // Get the selected file
    var file = fileInput.files[0];

    // Create a FormData object to send the file
    var formData = new FormData();
    formData.append('file', file);

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Set up the request method, URL, and asynchronous flag
    xhr.open('POST', '/FileOperation/FileUpload', true);

    // Set up a function to handle the response when the request completes
    xhr.onload = function () {
        // Check if the response status is OK (200)
        if (xhr.status === 200) {
            // Update the message span with success message
            document.getElementById('message').innerText = "File uploaded successfully!";
        } else {
            // Update the message span with error message
            document.getElementById('message').innerText = "Choose File To upload !";
        }
    };
    // Send the FormData object with the file to the server
    xhr.send(formData);
}

/* ------------------------------------------------------------------------------------------------------------------------------------*/

                                              /*<<<<<<Student Complient Js>>>>>*/


$(document).ready(function () {
    $(variable.btnSubmit).on('click', function () {
        var student = {
            FirstName: $(variable.FirstName).val(),
            LastName: $(variable.LastName).val(),
            Major: $(variable.Major).val(),
            ExpectedYearGraduation: $(variable.ExpectedgraduationYear).val(),
            StreetAddress1: $(variable.StreetAddress1).val(),
            StreetAddress2: $(variable.StreetAddressLines2).val(),
            CountryId: $(variable.Country).val(),
            CityId: $(variable.City).val(),
            Region: $(variable.Region).val(),
            ZipCode: $(variable.PostalZip).val(),
            Email: $(variable.Email).val(),
            PhoneNumber: $(variable.Phone).val(),
            PreferredContactCheackBox: getPreferredContactMethod(),



            //@* Information About Your Complaints *@

            IssuesOccurredDate: $(variable.IssuesOccurredDate).val(),
            NameofPersonInvolved: $(variable.NameofPersonsInvolved).val(),
            ComplaintDetialArea: $(variable.ComplaintDetialArea).val(),
            ResolveComplaintArea: $(variable.ResolutionComplaint).val(),
            PriorAttemptsArea: $(variable.ResloveComplaintAttempts).val(),
            ResolutionArea: $(variable.resolutionSeek).val(),
            OtherInformationArea: $(variable.otherInformation).val(),
            IsDeleted: false,



        };
        var isValid = true;
        var value = validate();

        function validate() {

            $('.error').text('');


            if (student.FirstName == '') {
                $(variable.ErrormesssagefirstName).text("Name is Mandatory").show();
                $(variable.ErrorFirstIcons).show();
                isValid = false;
            }
            if (student.LastName == '') {
                $(variable.ErrormessageLastname).text("LastName is Mandatory").show();
                $(variable.ErrorlastIcons).show();
                isValid = false;
            }
            if (student.Major == '') {
                $(variable.Errormsgmajor).text("Field is Mandatory").show();
                $(variable.ErrorIconsmajor).show();
                isValid = false;
            }
            if (student.ExpectedYearGraduation == '') {
                $(variable.expectedgraduationYearErrormsg).text("Field is Mandatory").show();
                $(variable.expectedgraduationYearErrorIcons).show();
                isValid = false;
            }
            if (student.StreetAddress1 == '') {
                $(variable.streetAddress1Errormsg).text("Field is Mandatory").show();
                $(variable.streetAddress1ErrorIcons).show();
                isValid = false;
            }
            if (student.StreetAddress2 == '') {
                $(variable.streetAddress2Errormsg).text("Field is Mandatory").show();
                $(variable.streetAddress2ErrorIcons).show();
                isValid = false;
            }
            if (student.Region == '') {
                $(variable.regionErrormsg).text("Field is Mandatory").show();
                $(variable.regionErrorIcons).show();
                isValid = false;
            }
            if (student.PostalZip == '') {
                $(variable.postalZipErrormsg).text("Field is Mandatory").show();
                $(variable.postalZipErrorIcons).show();
                isValid = false;
            }
            if (student.Email == '') {
                $(variable.emailErrormsg).text("Field is Mandatory").show();
                $(variable.emailErrorIcons).show();
                isValid = false;
            }
            if (student.PhoneNumber == '') {
                $(variable.phoneErrormsg).text("Field is Mandatory").show();
                $(variable.phoneErrorIcons).show();
                isValid = false;
            }
            //if (student.IssuesOccurredDate == '') {
            //    $(variable.IssuesOccurredDateErrormsg).text("Field is Mandatory").show();
            //    $(variable.IssuesOccurredDateErrorIcons).show();
            //    isValid = false;
            //} if (student.NameofPersonInvolved == '') {
            //    $(variable.personsInvolvedErrormsg).text("Field is Mandatory").show();
            //    $(variable.personsInvolvedErrorIcons).show();
            //    isValid = false;
            //}
            return isValid;

        }


        // Send data to the server
        if (value) {
            $.ajax({
                url: '/StudentComplaint/AddStudentDetials',
                type: 'POST',
                data: student,
                success: function (data) {
                    if (data != null) {
                        alert("Successfully added");
                        window.location.href = '/StudentComplaint/Index';
                    }
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                }
            });
        }
    });
    $(variable.FirstName).on('input', function () {
        var name = $(variable.FirstName).val();
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            $(variable.ErrormesssagefirstName).text("Name should only contain letters");
            $(variable.ErrorFirstIcons).show();
        } else {
            $(variable.ErrormesssagefirstName).text("");
            $(variable.ErrorFirstIcons).hide();
        }
    });

    $(variable.LastName).on('input', function () {
        var lastname = $(variable.LastName).val();
        if (!/^[a-zA-Z\s]+$/.test(lastname)) {
            $(variable.ErrormessageLastname).text("Last Name should only contain letters");
            $(variable.ErrorlastIcons).show();
        } else {
            $(variable.ErrormessageLastname).text("");
            $(variable.ErrorlastIcons).hide();
        }
    });
    $(variable.Major).on('input', function () {
        var major = $(variable.Major).val();
        if (!/^[a-zA-Z\s]+$/.test(major)) {
            $(variable.Errormsgmajor).text("Major should only contain letters");
            $(variable.ErrorIconsmajor).show();
        } else {
            $(variable.Errormsgmajor).hide();
            $(variable.ErrorIconsmajor).hide();
        }

    });
    $(variable.ExpectedgraduationYear).on('input', function () {
        var year = $(variable.ExpectedgraduationYear).val();
        if (!/^\d{4}$/.test(year)) {
            $(variable.expectedgraduationYearErrormsg).text("Mention only Year in Number");
            $(variable.expectedgraduationYearErrorIcons).show();
        }
        else {
            $(variable.expectedgraduationYearErrormsg).hide();
            $(variable.expectedgraduationYearErrorIcons).hide();
        }

    });
    $(variable.StreetAddress1).on('input', function () {
        var address1 = $(variable.StreetAddress1).val();
        if (!/^[a-zA-Z0-9\s\.,#-]+$/.test(address1)) {

            $(variable.streetAddress1Errormsg).text("Address is Mandatory!");
            $(variable.streetAddress1ErrorIcons).show();
        } else {
            $(variable.streetAddress1Errormsg).text("");
            $(variable.streetAddress1ErrorIcons).hide();
        }
    });
    $(variable.StreetAddressLines2).on('input', function () {
        var address2 = $(variable.StreetAddressLines2).val();
        if (!/^[a-zA-Z\s\.,#-]+$/.test(address2)) {
            $(variable.streetAddress2Errormsg).text("Address is Mandatory!");
            $(variable.streetAddress2ErrorIcons).show();
        } else {
            $(variable.streetAddress2Errormsg).text("");
            $(variable.streetAddress2ErrorIcons).hide();
        }
    });

    $(variable.Region).on('input', function () {
        var region = $(variable.Region).val();
        if (!/^[a-zA-Z\s\.,#-]+$/.test(region)) {
            $(variable.regionErrormsg).text("Region should only contain letters");
            $(variable.regionErrorIcons).show();
        } else {
            $(variable.regionErrormsg).text("");
            $(variable.regionErrorIcons).hide();
        }
    });
    $(variable.PostalZip).on('input', function () {
        var Zipcode = $(variable.PostalZip).val();
        if (!/^[0-9]{5}$/.test(Zipcode)) {
            $(variable.postalZipErrormsg).text("Enter Only 6 Digits");
            $(variable.postalZipErrorIcons).show();
        } else {
            $(variable.postalZipErrormsg).hide()
            $(variable.postalZipErrorIcons).hide();
        }
    });

    $(variable.Email).on('input', function () {
        var email = $(variable.Email).val();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email) || email.length === 0) {
            $(variable.emailErrormsg).text("Please enter a valid email address");
            $(variable.emailErrorIcons).show();
        } else {
            $(variable.emailErrormsg).hide();
            $(variable.emailErrorIcons).hide();
        }
    });
    $(variable.Phone).on('input', function () {
        var Phone = $(this).val();
        if (!/^(?:\+91)?[6-9]\d{9}$/.test(Phone)) {
            $(variable.phoneErrormsg).text('Invalid Phone number Give a valid phone number').show();
            $(variable.phoneErrorIcons).show();

        } else {
            $(variable.phoneErrormsg).hide();
            $(variable.phoneErrorIcons).hide();
        }
    });


    $('.status-item input[type="checkbox"]').on("change", function () {
        var status = $('status-item input[type = "checkbox"]:checked');

        if ($("#emailCheckbox").prop("checked")) {
            status += 'Staff,';

        }

        if ($("#phoneCheckbox").prop("checked")) {
            status += 'Management,';
        }

        if ($("#mailCheckbox").prop("checked")) {
            status += 'Other,';
        }
        status = status.replace(/,$/, '');

        if (status === '') {
            $("#statuserror").text('Please select any one status').show();
        }
        else if (status.indexOf(',') !== -1) {
            $("#statuserror").text('Please select only one status').show();
        }
        else {
            $("#statuserror").hide();
        }
    });


    //$(variable.IssuesOccurredDate).rules('add', {
    //    required: true,
    //    messages: {
    //        required: "Date is required."
    //    }
    //});

    //$(variable.IssuesOccurredDate).on('input', function () {
    //    $(this).valid(); // Trigger validation on input
    //});

    // Populate cities based on selected country
    $(variable.Country).on('change', function () {
        var countryId = $(this).val();
        $(variable.City).empty(); // Clear existing options
        if (countryId) {
            $.ajax({
                url: '/StudentComplaint/GetCities?countryId=' + countryId,
                type: 'GET',
                success: function (data) {
                    if (data && data.length > 0) {
                        $(variable.City).append($('<option>', {
                            value: '',
                            text: '-- Select City --'
                        }));
                        $.each(data, function (index, city) {
                            $(variable.City).append($('<option>', {
                                value: city.cityId,
                                text: city.cityName
                            }));
                        });
                    } else {
                        $(variable.City).append($('<option>', {
                            value: '',
                            text:
                                '-- No Cities --'
                        }));
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        } else {
            $(variable.City).append($('<option>', {
                value: '',
                text: '-- Select Country First --'
            }));
        }

    });
});