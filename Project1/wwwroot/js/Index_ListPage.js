
$(document).ready(function () {

    console.log("loaded");
    //Getting all Details from api for displaying to View
    $.ajax({

        url: 'https://localhost:7210/api/Student',
        type: 'Get',
        success: function (response) {
            console.log(response);
            var tbody = $('#tbody');
            // tbody.empty(); // Clear any existing rows
            response.forEach(function (item) {
                var row = $('<tr>');
                row.append('<td>' + item.studentId + '</td>');
                row.append('<td>' + item.firstName + '</td>');
                row.append('<td>' + item.lastName + '</td>');
                row.append('<td>' + item.major + '</td>');
                row.append('<td>' + item.expectedYearGraduation + '</td>');
                row.append('<td>' + item.streetAddress1 + '</td>');
                row.append('<td>' + item.region + '</td>');
                row.append('<td>' + item.zipCode + '</td>');
                row.append('<td>' + item.email + '</td>');
                row.append('<td>' + item.phoneNumber + '</td>');
                row.append('<td>' + '<a href="' + item.studentId + '" class="Viewdisplay">View</a>' + '</td>');
                // row.append('<td>' + '@Html.ActionLink("Viewd", "CrudOperation",' + new { id=item.id } + ',' + new { class = "View_Display",)
                row.append('<td>' + '<a href="' + item.studentId + '" class="Updatedisplay"> Update </a>' + '</td>');
                row.append('<td>' + '<a href="/StudentComplaint/Delete/' + item.studentId + '">Delete</a>' + '</td>');

                tbody.append(row);

            });

        },
        error: function () {

        }


    });

    $(document).on('click', '.Viewdisplay', function (e) {
        console.log('triggerd');

        e.preventDefault();
       
        var id = parseInt($(this).attr('href')); //Extracting the id from href
        console.log(id);
        window.location.href = '/StudentComplaint/DispalyViewPage?id=' + id
            

    });
    $(document).on('click', '.Updatedisplay', function (e) {
        e.preventDefault();
        var id = parseInt($(this).attr('href'));
        window.location.href = '/StudentComplaint/DispalyUpdatePage?id=' + id
    });
    //$('.View_Display').on('click', function (e) {
    //    //stop the existing event of actionlink
    //    e.preventDefault();
    //    var id = parseInt($(this).attr('data-id'),0);
    //    console.log(id)
    ;
    //    //here to call api to get complent details
    //    //http://localhost:5251/api/RestuarentComplent/GetComplent?id=
    //    ///api/RestuarentComplent/GetComplent?$filter=Id eq ${id}
    //    $.ajax({
    //        url: `http://localhost:5251/api/RestuarentComplent/GetComplent?id=`+id,
    //        type: 'Get',
    //        success: function (Response){
    //            console.log(Response);
    //        },
    //        error: function () {
    //            console.log("Error Occured");

    //        }

    //    });

    //});
});
