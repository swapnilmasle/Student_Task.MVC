const { data } = require("jquery");

var variable = {
    FirstName: "#firstName",
    LastName: "#lastName",
    Major: "#major",
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
    studentid: "#StudentId",
    btnSubmit: "#submit",
    Update: "#Update",


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
    emailErrormsg: '#emailErrormsg',
    phoneErrormsg: "#phoneErrormsg",
    IssuesOccurredDateErrormsg: "#IssuesOccurredDateErrormsg",
    personsInvolvedErrormsg: "#personsInvolvedErrormsg",



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
    personsInvolvedErrorIcons: "#personsInvolvedErrorIcons"

};
function getPreferredContactMethod() {
    var contactMethod = '';
    if ($(variable.EmailCheckbox).is(':checked')) {
        contactMethod='Email';
    }
    if ($(variable.PhoneCheckbox).is(':checked')) {
        contactMethod='Phone';
    }
    if ($(variable.MailCheckbox).is(':checked')) {
        contactMethod = 'U.S Mail';
    }
    return contactMethod;
}

$(document).ready(function () {

    //$(variable.Country).on('change', function () {
    //    var countryId = $(variable.Country).val();
    //    $.ajax({
    //        url: 'https://localhost:7210/api/Student/cities/' + countryId,
    //        type: 'Get',
    //        success: function (response) {
    //            var citydropdown = $(variable.City);
    //            response.forEach(function (list) {
    //                citydropdown.append($('<option>', {
    //                    value: list.cityId,
    //                    text: list.cityName
    //                }));
    //            });
                
    //        },
    //        error: function (xhr, status, error) {
    //            console.error(xhr.responseText);
    //        }
    //    });
    //});
  
    console.log('love');
    var id = parseInt($('#StudentId').val(), 0);
    $.ajax({

        url: 'https://localhost:7210/api/Student/GetById?id=' + id,
        type: 'Get',
        success: function (data) {
            console.log(data);
            $(variable.FirstName).val(data.firstName);
            $(variable.LastName).val(data.lastName);
            $(variable.Major).val(data.major);
            $(variable.ExpectedgraduationYear).val(data.expectedYearGraduation);
            $(variable.StreetAddress1).val(data.streetAddress1);
            $(variable.StreetAddressLines2).val(data.streetAddress2);
            $(variable.Country).val(data.countryId);
            var Cid = data.countryId;

            $(variable.City).val(data.cityId);
            $(variable.Region).val(data.region);
            $(variable.PostalZip).val(data.zipCode);
            $(variable.Email).val(data.email);
            $(variable.Phone).val(data.phoneNumber);
            $(variable.EmailCheckbox).prop('checked', data.preferredContactCheackBox === 'Email');
            $(variable.PhoneCheckbox).prop('checked', data.preferredContactCheackBox === 'Phone');
            $(variable.MailCheckbox).prop('checked', data.preferredContactCheackBox === 'USMail');
            var datetimeString = data.issuesOccurredDate;
            var dateString = datetimeString.substring(0, 10); // Extract the date part (first 10 characters)
            console.log(dateString); // Output: "2024-01-05"


            $(variable.IssuesOccurredDate).val(dateString);
            $(variable.NameofPersonsInvolved).val(data.nameofPersonInvolved);
            $(variable.ComplaintDetialArea).val(data.complaintDetialArea);
            $(variable.ResolutionComplaint).val(data.resolveComplaintArea);
            $(variable.ResloveComplaintAttempts).val(data.priorattemptsArea);
            $(variable.resolutionSeek).val(data.resolutionArea);
            $(variable.otherInformation).val(data.otherInformationArea);



            var cityDropdown = $('#CityId');
            cityDropdown.val(data.countryId);
            //Binding Country in dropdown
            $.ajax({
                url: 'https://localhost:7210/api/Student/countries',
                type: 'GET',
                success: function (countries) {
                    // Populate country dropdown
                    var countryDropdown = $('#countryId');
                    console.log(countryDropdown);
                    countries.forEach(function (country) {
                        countryDropdown.append($('<option>', {
                            value: country.countryId,
                            text: country.countryName
                        }));
                    });

                    // Select the country of the student
                    countryDropdown.val(data.countryId);

                    // Fetch cities

                    $.ajax({
                        url: 'https://localhost:7210/api/Student/cities/' + Cid,
                        type: 'GET',
                        /*data: { countryId: data.countryId }, // Send selected country ID*/
                        success: function (cities) {
                            // Populate city dropdown CityId
                            var cityDropdown = $('#CityId');
                            cityDropdown.empty(); // Clear previous options
                            cities.forEach(function (city) {
                                cityDropdown.append($('<option>', {
                                    value: city.cityId,
                                    text: city.cityName
                                }));
                            });

                            // Select the city of the student
                            cityDropdown.val(data.cityId);
                        },
                        error: function (xhr, status, error) {
                            console.error(xhr.responseText);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
            //$(variable.Country).on('change', function () {
            //    var countryId = $(this).val();

            //    $(variable.City).empty(); // Clear existing options
            //    if (countryId) {
            //        $.ajax({
            //            url: 'https://localhost:7210/api/Student/cities/' + Cid,
            //            type: 'GET',
            //            success: function (data) {
            //                if (data && data.length > 0) {
            //                    $(variable.City).append($('<option>', {
            //                        value: '',
            //                        text: '-- Select City --'
            //                    }));
            //                    $.each(data, function (index, city) {
            //                        $(variable.City).append($('<option>', {
            //                            value: city.cityId,
            //                            text: city.cityName
            //                        }));
            //                    });
            //                    cityDropdown.val(data.cityId);
            //                } else {
            //                    $(variable.City).append($('<option>', {
            //                        value: '',
            //                        text:
            //                            '-- No Cities --'
            //                    }));
            //                }
            //            },
            //            error: function (xhr, status, error) {
            //                console.error(xhr.responseText);
            //            }
            //        });
            //    } else {
            //        $(variable.City).append($('<option>', {
            //            value: '',
            //            text: '-- Select Country First --'
            //        }));
            //    }

            //});
        }

    })

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
                $(variable.regionErrormsg).text("Region should only contain letters").show();
                $(variable.regionErrorIcons).show();
            } else {
                $(variable.regionErrormsg).text("");
                $(variable.regionErrorIcons).hide();
            }
        });
        $(variable.PostalZip).on('input', function () {
            var Zipcode = $(variable.PostalZip).val();
            if (!/^[0-9]{6}$/.test(Zipcode)) {
                $(variable.postalZipErrormsg).text("Enter Only 6 Digits").show();
                $(variable.postalZipErrorIcons).show();
            } else {
                $(variable.postalZipErrormsg).hide()
                $(variable.postalZipErrorIcons).hide();
            }
        });

        $(variable.Email).on('input', function () {
            var email = $(variable.Email).val();
            var emailPattern = /^[^@]+@[^\s@]+\.[^\s@]+$/;
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
    
        $("#IssuesOccurredDate").datepicker({
            dateFormat: 'dd-mm-yy',
            changeMonth: true,
            changeYear: true

        });
    
  

    var operation = 'insert';

    function toggleButton() {
        if (operation === 'insert') {
            $(variable.btnSubmit).text('Save');
        } else if (operation === 'update') {
            $(variable.Update).text('Update');
        }
    }

    // Bind click event to update button
    $(variable.Update).on('click', function () {
        operation = 'update';
        handleOperation();
        var StudentUpdateDto = {
            firstName: $(variable.FirstName).val(),
            LastName: $(variable.LastName).val(),
            Major: $(variable.Major).val(),
            ExpectedYearGraduation: $(variable.ExpectedgraduationYear).val(),
            StreetAddress1: $(variable.StreetAddress1).val(),
            StreetAddress2: $(variable.StreetAddressLines2).val(),
            CountryId: parseInt($(variable.Country).val()),
            CityId: parseInt($(variable.City).val()),
            Region: $(variable.Region).val(),
            ZipCode: $(variable.PostalZip).val(),
            Email: $(variable.Email).val(),
            PhoneNumber: $(variable.Phone).val(),
            PreferredContactCheackBox: getPreferredContactMethod(),
            IssuesOccurredDate: $(variable.IssuesOccurredDate).val(),
            NameofPersonInvolved: $(variable.NameofPersonsInvolved).val(),
            ComplaintDetialArea: $(variable.ComplaintDetialArea).val(),
            ResolveComplaintArea: $(variable.ResolutionComplaint).val(),
            PriorAttemptsArea: $(variable.ResloveComplaintAttempts).val(),
            ResolutionArea: $(variable.resolutionSeek).val(),
            OtherInformationArea: $(variable.otherInformation).val(),
            StudentId: parseInt($(variable.studentid).val()),
            
        };
        console.log(StudentUpdateDto);
       // toggleButton();
        $.ajax({
            'async': false,
            'global': false,
            url: 'https://localhost:7210/api/Student/UpdateStudent',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            type: 'PUT',
            //dataType: "json",
            data: JSON.stringify(StudentUpdateDto ), 
           // data: ({ studentUpdateDto: studentDetails }),
            success: function (response) {
                if (response != null) {
                    alert("updated Succefully");
                    window.location.href = '/StudentComplaint/Index';
                }

            },
            error: function (xhr, status, error) {
                console.error();
                alert("api error came");
            }
        });

    });
   
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
    function handleOperation() {
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
            IssuesOccurredDate: $(variable.IssuesOccurredDate).val(),
            NameofPersonInvolved: $(variable.NameofPersonsInvolved).val(),
            ComplaintDetialArea: $(variable.ComplaintDetialArea).val(),
            ResolveComplaintArea: $(variable.ResolutionComplaint).val(),
            PriorAttemptsArea: $(variable.ResloveComplaintAttempts).val(),
            ResolutionArea: $(variable.resolutionSeek).val(),
            OtherInformationArea: $(variable.otherInformation).val(),
            StudentId: $(variable.studentid).val(),
            IsDeleted: false
        };
        var isValid = true;
        var value = validate();
        if (value == false) {
            //Swal.fire({
            //    position: "top-end",
            //    icon: "error",
            //    title: "Please fill Form",
            //    showConfirmButton: false,
            //    timer: 1800
            //});
        }


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

            return isValid;

        }
    




     

        // Send data to the server if validation passes

        //if (value) {
        //    var url = operation === 'insert' ? '/StudentComplaint/AddStudentDetials' : 'https://localhost:7210/api/Student';
        //    $.ajax({
        //        url: url,
        //        type: 'PUT',
        //        data: student,
        //        success: function (data) {
        //            if (data != null) {
        //                var message = operation === 'insert' ? 'Successfully added' : 'Successfully updated';
        //                //Swal.fire({
        //                //    position: "top-end",
        //                //    icon: "success",
        //                //    title: "Please fill Form",
        //                //    showConfirmButton: true,
        //                //    timer: 1800,
        //                //    href:
        //                //});
        //                alert(message);
        //                window.location.href = '/StudentComplaint/Index';
        //            }
        //            console.log(data);
        //        },
        //        error: function (xhr, status, error) {
        //            console.error(xhr.responseText);
        //        }
        //    });
        //}
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

    $(variable.Country).on('change', function () {

        var Cheackcountry = $(variable.Country).val();
        if (Cheackcountry != '') {
            $(variable.countryErrormsg).hide();
            $(variable.countryErrorIcons).hide();
        } else {
            $(variable.countryErrormsg).hide();
            $(variable.countryErrorIcons).hide();
        }

    });
    $(variable.City).on('change', function () {

        var CheackCity = $(variable.Country).val();
        if (CheackCity != '') {
            $(variable.cityErrormsg).hide();
            $(variable.cityErrorIcons).hide();
        } else {
            $(variable.cityErrormsg).hide();
            $(variable.cityErrorIcons).hide();
        }

    });
    $(variable.btnSubmit).on('click', function () {
        handleOperation();
        //var countryValid = validateCountry();
        //var cityValid = validateCity();

        var Cheackcountry = $(variable.Country).val();
        if (Cheackcountry == '') {
            $(variable.countryErrormsg).text('Please select a country').show();
            $(variable.countryErrorIcons).show();
        }
        else {
            $(variable.countryErrormsg).hide();
            $(variable.countryErrorIcons).hide();
        }
        var CheackCity = $(variable.Country).val();
        if (CheackCity == '') {
            $(variable.cityErrormsg).text('Please select a country').show();
            $(variable.cityErrorIcons).show();
        }
        else {
            $(variable.cityErrormsg).hide()
            $(variable.cityErrorIcons).hide();
        }
    }); 


});