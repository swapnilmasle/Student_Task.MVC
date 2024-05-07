$(document).ready(function () {
    $('#submit').click(function (e) {
        e.preventDefault(); // Prevent default form submission

        var studentData = $('#studentForm').serialize(); // Serialize form data

        $.ajax({
            url: '/Student/AddStudent', // Change to your controller action URL
            type: 'POST',
            data: studentData,
            success: function (response) {
                alert("Student added successfully");
                // Redirect to another page or update UI as needed
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                alert('Error occurred while adding student');
            }
        });
    });
});