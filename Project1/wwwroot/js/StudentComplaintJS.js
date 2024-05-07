var globalvariable = {
    FirstName: "#firstName",
    LastName: "#lastName",
    Major: "#major",
    btnSubmit: "#submit",
    ExpectedgraduationYear: "#expectedgraduationYear",
    StreetAddress1: "#streetAddress1",
    StreetAddressLines2: "#streetAddressLines2",
    Country: "#countryId",
    City: "#CityId",
    Region: "#region",
    PostalZip: "#postalZip",
    Email: "#email",
    Phone: "#phone",
    EmailCheckbox: "#emailCheckbox",
    PhoneCheckbox: "#phoneCheckbox",
    MailCheckbox: "#mailCheckbox",
    Update: "#Update",
    studentid: "#StudentId",

    // @* Information About Your Complaints *@

    IssuesOccurredDate: "#IssuesOccurredDate",
    NameofPersonsInvolved: "#personsInvolved",
    ComplaintDetialArea: "#complaintDetials",
    ResolutionComplaint: "#resolutionComplaint",
    ResloveComplaintAttempts: "#resloveComplaintAttempts",
    resolutionSeek: "#resolutionSeek",
    otherInformation: "#otherInformation",

    //Error Message 
    ErrormesssagefirstName: "#firstnameError",    
    ErrormessageLastname: "#lastnameError",    
    Errormsgmajor: "#majorErrormsg",    
    expectedgraduationYearErrormsg: "#expectedgraduationYearErrormsg",
    streetAddress1Errormsg: "#streetAddress1Errormsg",
    streetAddress2Errormsg: "#streetAddress2Errormsg",
    countryErrormsg: "#countryErrormsg",
    cityErrormsg: "#cityErrormsg",
    regionErrormsg: "#regionErrormsg",
    postalZipErrormsg: "#postalZipErrormsg",
    emailErrormsg:'#emailErrormsg',
    phoneErrormsg: "#phoneErrormsg",
    IssuesOccurredDateErrormsg: "#IssuesOccurredDateErrormsg",
    personsInvolvedErrormsg:"#personsInvolvedErrormsg",
    
    

    //Error Icons
    ErrorFirstIcons: "#ErrorFirstIcons",
    ErrorlastIcons: "#ErrorlastIcons",
    ErrorIconsmajor: "#majorErrorIcons",
    expectedgraduationYearErrorIcons: "#expectedgraduationYearErrorIcons",
    streetAddress1ErrorIcons: "#streetAddress1ErrorIcons",
    streetAddress2ErrorIcons: "#streetAddress2ErrorIcons",
    countryErrorIcons: "#countryErrorIcons",
    cityErrorIcons: "#cityErrorIcons",
    regionErrorIcons: "#regionErrorIcons",
    postalZipErrorIcons: "#postalZipErrorIcons",
    emailErrorIcons: "#emailErrorIcons",
    phoneErrorIcons: "#phoneErrorIcons",
    IssuesOccurredDateErrorIcons: "#IssuesOccurredDateErrorIcons",
    personsInvolvedErrorIcons:"#personsInvolvedErrorIcons"
    

};
 
function getPreferredContactMethod() {
    var contactMethod = [];
    if ($(globalvariable.EmailCheckbox).is(':checked')) {
        contactMethod.push('Email');
    }
    if ($(globalvariable.PhoneCheckbox).is(':checked')) {
        contactMethod.push('Phone');
    }
    if ($(globalvariable.MailCheckbox).is(':checked')) {
        contactMethod.push('U.S Mail');
    }
    return contactMethod;
};

$(document).ready(function () {

 

    // Bind click event to update button
    $(globalvariable.Update).on('click', function () {
        operation = 'update';
        handleOperation();
        toggleButton();

    });

    var operation = 'insert';

    function toggleButton() {
        if (operation === 'insert') {
            $(globalvariable.btnSubmit).text('Save');
        } else if (operation === 'update') {
            $(globalvariable.Update).text('Update');
        }
    }

    $(globalvariable.FirstName).on('input', function () {
        var name = $(globalvariable.FirstName).val();
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            $(globalvariable.ErrormesssagefirstName).text("Name should only contain letters");
            $(globalvariable.ErrorFirstIcons).show();
        } else {
            $(globalvariable.ErrormesssagefirstName).text("");
            $(globalvariable.ErrorFirstIcons).hide();
        }
    });
    $(globalvariable.LastName).on('input', function () {
        var lastname = $(globalvariable.LastName).val();
        if (!/^[a-zA-Z\s]+$/.test(lastname)) {
            $(globalvariable.ErrormessageLastname).text("Last Name should only contain letters");
            $(globalvariable.ErrorlastIcons).show();
        } else {
            $(globalvariable.ErrormessageLastname).text("");
            $(globalvariable.ErrorlastIcons).hide();
        }
    });
    $(globalvariable.Major).on('input', function () {
        var major = $(globalvariable.Major).val();
        if (!/^[a-zA-Z\s]+$/.test(major)) {
            $(globalvariable.Errormsgmajor).text("Major should only contain letters");
            $(globalvariable.ErrorIconsmajor).show();
        }
        else {
            $(globalvariable.Errormsgmajor).text("");
            $(globalvariable.ErrorIconsmajor).hide();
        }

    });
    $(globalvariable.ExpectedgraduationYear).on('input', function () {
        var year = $(globalvariable.ExpectedgraduationYear).val();
        if (!/^\d{4}$/.test(year)) {
            $(globalvariable.expectedgraduationYearErrormsg).text("Mention only Year in Number");
            $(globalvariable.expectedgraduationYearErrorIcons).show();
        }
        else {
            $(globalvariable.expectedgraduationYearErrormsg).text("");
            $(globalvariable.expectedgraduationYearErrorIcons).hide();
        }

    });
    $(globalvariable.StreetAddress1).on('input', function () {
        var address1 = $(globalvariable.StreetAddress1).val();
        if (!/^[a-zA-Z0-9\s\.,#-]+$/.test(address1)) {

            $(globalvariable.streetAddress1Errormsg).text("Address is Mandatory!");
            $(globalvariable.streetAddress1ErrorIcons).show();
        } else {
            $(globalvariable.streetAddress1Errormsg).text("");
            $(globalvariable.streetAddress1ErrorIcons).hide();
        }
    });
    $(globalvariable.StreetAddressLines2).on('input', function () {
        var address2 = $(globalvariable.StreetAddressLines2).val();
        if (!/^[a-zA-Z\s\.,#-]+$/.test(address2)) {
            $(globalvariable.streetAddress2Errormsg).text("Address is Mandatory!");
            $(globalvariable.streetAddress2ErrorIcons).show();
        } else {
            $(globalvariable.streetAddress2Errormsg).text("");
            $(globalvariable.streetAddress2ErrorIcons).hide();
        }
    });

    $(globalvariable.Region).on('input', function () {
        var region = $(globalvariable.Region).val();
        if (!/^[a-zA-Z\s\.,#-]+$/.test(region)) {
            $(globalvariable.regionErrormsg).text("Region should only contain letters").show();
            $(globalvariable.regionErrorIcons).show();
        } else {
            $(globalvariable.regionErrormsg).text("");
            $(globalvariable.regionErrorIcons).hide();
        }
    });
    $(globalvariable.PostalZip).on('input', function () {
        var Zipcode = $(globalvariable.PostalZip).val();
        if (!/^[0-9]{6}$/.test(Zipcode)) {
            $(globalvariable.postalZipErrormsg).text("Enter Only 6 Digits").show();
            $(globalvariable.postalZipErrorIcons).show();
        } else {
            $(globalvariable.postalZipErrormsg).text("");
            $(globalvariable.postalZipErrorIcons).hide();
        }
    });

    $(globalvariable.Email).on('input', function () {
        var email = $(globalvariable.Email).val();
        var emailPattern = /^[^@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email) || email.length === 0) {
            $(globalvariable.emailErrormsg).text("Please enter a valid email address");
            $(globalvariable.emailErrorIcons).show();
        } else {
            $(globalvariable.emailErrormsg).text("");
            $(globalvariable.emailErrorIcons).hide();
        }
    });
    $(globalvariable.Phone).on('input', function () {
        var Phone = $(this).val();
        if (!/^(?:\+91)?[6-9]\d{9}$/.test(Phone)) {
            $(globalvariable.phoneErrormsg).text('Invalid Phone number Give a valid phone number').show();
            $(globalvariable.phoneErrorIcons).show();

        } else {
            $(globalvariable.phoneErrormsg).hide();
            $(globalvariable.phoneErrorIcons).hide();
        }
    });

    $('.status-item input[type="checkbox"]').change(function () {
        var status = $('status-item input[type = "checkbox"]:checked');

        if ($("#emailCheckbox").prop("checked")) {
            status += 'Email,';

        }


        if ($("#phoneCheckbox").prop("checked")) {
            status += 'Phone,';
        }

        if ($("#mailCheckbox").prop("checked")) {
            status += 'Mail,';
        }
        status = status.replace(/,$/, '');

        if (status === '') {
            $("#statuserror").text('Please select any one status').show();
            $("#statusicon").show();
        }
        else if (status.indexOf(',') !== -1) {
            $("#statuserror").text('Please select only one Cheackbox').show();
            $("#statusicon").show();
        }
        else {
            $("#statuserror").hide();
            $("#statusicon").hide();
        }
    });
    function handleOperation() {
        var student = {
            FirstName: $(globalvariable.FirstName).val(),
            LastName: $(globalvariable.LastName).val(),
            Major: $(globalvariable.Major).val(),
            ExpectedYearGraduation: $(globalvariable.ExpectedgraduationYear).val(),
            StreetAddress1: $(globalvariable.StreetAddress1).val(),
            StreetAddress2: $(globalvariable.StreetAddressLines2).val(),
            CountryId: $(globalvariable.Country).val(),
            CityId: $(globalvariable.City).val(),
            Region: $(globalvariable.Region).val(),
            ZipCode: $(globalvariable.PostalZip).val(),
            Email: $(globalvariable.Email).val(),
            PhoneNumber: $(globalvariable.Phone).val(),
            PreferredContactCheackBox: getPreferredContactMethod(),
            IssuesOccurredDate: $(globalvariable.IssuesOccurredDate).val(),
            NameofPersonInvolved: $(globalvariable.NameofPersonsInvolved).val(),
            ComplaintDetialArea: $(globalvariable.ComplaintDetialArea).val(),
            ResolveComplaintArea: $(globalvariable.ResolutionComplaint).val(),
            PriorAttemptsArea: $(globalvariable.ResloveComplaintAttempts).val(),
            ResolutionArea: $(globalvariable.resolutionSeek).val(),
            OtherInformationArea: $(globalvariable.otherInformation).val(),
            StudentId: $(globalvariable.studentid).val(),
            IsDeleted: false
        };
        var isValid = true;
        var value = validate();
        if (value == false) {
            swal.fire({
                position: "top-end",
                icon: "error",
                title: "please fill form",
                showconfirmbutton: false,
                timer: 1800
            });
        }


        function validate() {

            $('.error').text('');


            if (student.FirstName == '') {
                $(globalvariable.ErrormesssagefirstName).text("Name is Mandatory").show();
                $(globalvariable.ErrorFirstIcons).show();
                isValid = false;
            }
            if (student.LastName == '') {
                $(globalvariable.ErrormessageLastname).text("LastName is Mandatory").show();
                $(globalvariable.ErrorlastIcons).show();
                isValid = false;

            }
            if (student.Major == '') {
                $(globalvariable.Errormsgmajor).text("Field is Mandatory").show();
                $(globalvariable.ErrorIconsmajor).show();
                isValid = false;

            }
            if (student.ExpectedYearGraduation == '') {
                $(globalvariable.expectedgraduationYearErrormsg).text("Field is Mandatory").show();
                $(globalvariable.expectedgraduationYearErrorIcons).show();
                isValid = false;

            }
            if (student.StreetAddress1 == '') {
                $(globalvariable.streetAddress1Errormsg).text("Field is Mandatory").show();
                $(globalvariable.streetAddress1ErrorIcons).show();
                isValid = false;

            }
            if (student.StreetAddress2 == '') {
                $(globalvariable.streetAddress2Errormsg).text("Field is Mandatory").show();
                $(globalvariable.streetAddress2ErrorIcons).show();
                isValid = false;

            }
            if (student.Region == '') {
                $(globalvariable.regionErrormsg).text("Field is Mandatory").show();
                $(globalvariable.regionErrorIcons).show();
                isValid = false;

            }
            if (student.PostalZip == '') {
                $(globalvariable.postalZipErrormsg).text("Field is Mandatory").show();
                $(globalvariable.postalZipErrorIcons).show();
                isValid = false;

            }
            if (student.Email == '') {
                $(globalvariable.emailErrormsg).text("Field is Mandatory").show();
                $(globalvariable.emailErrorIcons).show();
                isValid = false;

            }
            if (student.PhoneNumber == '') {
                $(globalvariable.phoneErrormsg).text("Field is Mandatory").show();
                $(globalvariable.phoneErrorIcons).show();
                isValid = false;

            }

            return isValid;

        }
       
       
        var cheack = validate_form()
        function validate_form() {
            valid = true;

            if ($('input[type=checkbox]:checked').length == 0) {

                $("#statuserror").text('Please select Atlest one Cheakbox').show();
                $("#statusicon").show();
                valid = false;
            }

            return valid;
        }

        // Send data to the server if validation passes

        if (value) {
            var url = operation === 'insert' ? '/StudentComplaint/AddStudentDetials' : '/StudentComplaint/UpdateData';
            $.ajax({
                url: url,
                type: 'POST',
                data: student,
                success: function (data) {
                    if (data != null) {
                        var message = operation === 'insert' ? 'Successfully added' : 'Successfully updated';
                        //Swal.fire({
                        //    position: "top-end",
                        //    icon: "success",
                        //    title: "Please fill Form",
                        //    showConfirmButton: true,
                        //    timer: 1800,
                        //    href:
                        //});
                        alert(message);
                        window.location.href = '/StudentComplaint/Index';
                    }
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }

    }
        //function validateCountry() {
        //    var Cheackcountry = $(variable.Country).val();
        //    if (Cheackcountry =='') {
        //        $(variable.countryErrormsg).text('Please select a country').show();
        //        $(variable.countryErrorIcons).show();
        //        return false;
        //    }
        //    else if (Cheackcountry) {
        //        $(variable.countryErrormsg).hide()
        //        $(variable.countryErrorIcons).hide();
        //        return true;    
        //    }
        //        return true;    
        //}
        //function validateCity() {
        //    var cityId = $(variable.City).val();
        //    if (!cityId) {
        //        $(variable.cityErrormsg).text('Please select a city').show();
        //        $(variable.cityErrorIcons).show();
        //        return false; 
        //    }
        //        return true;        
        //}

        $(globalvariable.Country).on('change', function () {

            var Cheackcountry = $(globalvariable.Country).val();
            if (Cheackcountry != '') {
                $(globalvariable.countryErrormsg).hide();
                $(globalvariable.countryErrorIcons).hide();
            } else {
                $(globalvariable.countryErrormsg).hide();
                $(globalvariable.countryErrorIcons).hide();
            }

        });
        $(globalvariable.City).on('change', function () {

            var CheackCity = $(globalvariable.Country).val();
            if (CheackCity != '') {
                $(globalvariable.cityErrormsg).hide();
                $(globalvariable.cityErrorIcons).hide();
            } else {
                $(globalvariable.cityErrormsg).hide();
                $(globalvariable.cityErrorIcons).hide();
            }

        });
        $(globalvariable.btnSubmit).on('click', function () {
            handleOperation();
          

            var Cheackcountry = $(globalvariable.Country).val();
            if (Cheackcountry == '') {
                $(globalvariable.countryErrormsg).text('Please select a country').show();
                $(globalvariable.countryErrorIcons).show();
            }
            else {
                $(globalvariable.countryErrormsg).hide();
                $(globalvariable.countryErrorIcons).hide();
            }
            var CheackCity = $(globalvariable.Country).val();
            if (CheackCity == '') {
                $(globalvariable.cityErrormsg).text('Please select a country').show();
                $(globalvariable.cityErrorIcons).show();
            }
            else {
                $(globalvariable.cityErrormsg).hide()
                $(globalvariable.cityErrorIcons).hide();
            }
        });
        // Initialize button text
        toggleButton();
        $(globalvariable.Country).on('change', function () {
            var countryId = $(this).val();
            $(globalvariable.City).empty(); // Clear existing options
            if (countryId) {
                $.ajax({
                    url: '/StudentComplaint/GetCities?countryId=' + countryId,
                    type: 'GET',
                    success: function (data) {
                        if (data && data.length > 0) {
                            $(globalvariable.City).append($('<option>', {
                                value: '',
                                text: '-- Select City --'
                            }));
                            $.each(data, function (index, city) {
                                $(globalvariable.City).append($('<option>', {
                                    value: city.cityId,
                                    text: city.cityName
                                }));
                            });
                        } else {
                            $(globalvariable.City).append($('<option>', {
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
                $(globalvariable.City).append($('<option>', {
                    value: '',
                    text: '-- Select Country First --'
                }));
            }

        });
    $("#IssuesOccurredDate").datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,

    });
    
});

