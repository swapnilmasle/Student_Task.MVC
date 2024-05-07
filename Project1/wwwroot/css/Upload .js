

var Globalvariable = {

    btnupload: "#btn-upload",
    fileinput: "#fileinput",
    passworddata: "#password-id",
    errordata: "#error",
    erroricon: "#icon",
    overrideyes: "#override-yes",
    popupmodal: "#popup-modal",
    invalidfileformat: "#invalidfileformat",
    versionsave: "#versiondetails"
};


$(document).ready(function () {
    $(Globalvariable.btnupload).click(function () {

        /*e.preventDefault();*/
        var isvalid = true;

        let fileInput = $(Globalvariable.fileinput)[0];
        if (fileInput.files.length === 0) {
            $(Globalvariable.errordata).text("Please select any file").show();
            $(Globalvariable.erroricon).html('<i class="fas  fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        }

        let fileextensioncheck = $(Globalvariable.fileinput).val();
        var validextensions = /\.(jpg|png|pdf|ppt|docx|xlsx?)$/i;
        if (!validextensions.test(fileextensioncheck)) {
            $(Globalvariable.invalidfileformat).text("Invalid File format").show();
            return false;
            isvalid = false;
        }


        if (isvalid) {
            let formData = new FormData();

            let files = fileInput.files;


            var foldername = "FileDocuments";
            for (let i = 0; i < files.length; i++) {
                fileName = formData.append('files', files[i]);
                FileNameExistence(foldername, files[i].name, formData);
            }


            //let file = fileInput.files[0];
            //formData.append('file', file);
        }
    });

    //This is for override
    $(Globalvariable.overrideyes).click(function () {
        var formData = new FormData();
        var files = $(Globalvariable.fileinput)[0].files;

        for (var i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        uploadFiles(formData);
    });

    //This is for version file Name
    $(Globalvariable.versionsave).click(function () {
        var formData = new FormData();

        var files = $(Globalvariable.fileinput)[0].files;
        for (var i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

    });
});

function FileNameExistence(foldername, fileName, formData) {

    $.ajax({
        url: 'GetFolder?foldername=' + foldername + '&fileName=' + fileName,
        type: 'GET',
        success: function (data) {
            if (data.fileExists) {

                console.log(data);
                $(Globalvariable.popupmodal).modal('show');
            }
            else {
                uploadFiles(formData);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error', error);
        }
    });
}

function uploadFiles(formData) {
    $.ajax({
        url: "Data/FileUpload",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data !== 0) {
                alert('File uploaded successfully');
                window.location.href = 'Purple/Files/FileList';

            } else {
                alert('File uploaded error');
            }
        },
        error: function () {
            alert('An error occurred during the file upload');
        }
    });
}

_________________________________________________________________________________________________________________________________________
var globalvariable = {
    fileId: "#fileId",
    uploadfileId: "#uploadfileId",
    Errormesssagefile: "#Errormesssagefile",
    Errormessagebutton: "#Errormessagebutton",
    Formid: "#Formid",
    ErrorfileIcons: "#ErrorfileIcons",
    succussMessage:"#SuccessMessage"
};

$(document).ready(function () {
    console.log("Loaded");
    $(globalvariable.ErrorfileIcons).hide();
    var message = $(globalvariable.succussMessage).val();
    if (message != '') {
        alert("File Upload SuccussFully");
    }
 

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
                FileChecking();
            }
        }
    });
    function filechecking() {
        var filename = document.getelementbyid(globalvariable.fileid);
        $.ajax({
            type: 'get',
            url: 'fileoperation/fetchallfile',
            datatype: 'json',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i] == filename) {               
                        $('#fileexistspopup').modal('show');
                       



                    }
                }
            },


        });
    }

    $(globalvariable.Formid).submit(function (event) {
        event.preventDefault();
        var fileid = $(globalvariable.fileId).val();
        var isValid = true;

        if (fileid == '') {
            $(globalvariable.Errormesssagefile).text("Choose a file to upload").show();
            $(globalvariable.ErrorfileIcons).show();
            isValid = false;
            console.log("Submitted");
        } else {
            $(globalvariable.Errormesssagefile).hide();
            isValid = true;
            FileChecking();
            
         
        }

        if (isValid) {
            var fileName = fileid.split("\\").pop(); 
            var existingFileNames = []; // Replace this with actual list of existing file names
            if (existingFileNames.includes(fileName)) {
                var userChoice = confirm("A file with the same name already exists. Choose an action:\n\n1. Replace the existing file with the newly uploaded one.\n2. Save the uploading file with a version number.\n3. Cancel the upload.");
                if (userChoice) {
                    // Replace the existing file
                    $(this).unbind('submit').submit();
                } else {
                    var versionedFileName = getUniqueFileName(fileName, existingFileNames);
                    // Upload the file with versioned file name
                    // For demonstration purpose, we'll alert the versioned file name
                    alert("File will be uploaded with versioned name: " + versionedFileName);
                }
            } else {
                // No file name conflict, proceed with upload
                $(this).unbind('submit').submit();
            }
        }
    });
});

// Function to generate a unique file name with version number
function getUniqueFileName(fileName, existingFileNames) {
    var version = 1;
    var versionedFileName = fileName;
    while (existingFileNames.includes(versionedFileName)) {
        var extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex != -1) {
            versionedFileName = fileName.substring(0, extensionIndex) + "_v" + version + fileName.substring(extensionIndex);
        } else {
            versionedFileName = fileName + "_v" + version;
        }
        version++;
    }
    return versionedFileName;
}
