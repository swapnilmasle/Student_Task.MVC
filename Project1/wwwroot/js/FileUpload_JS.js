
var UploadFileVariable = {
    FileInput: "#fileInput",
    Filename:"#filename",
    IconErrorMsg: "#ErrorfileIcons",
    FileErrorMsg: "#Errormesssagefile",
    BtnUpload: "#btnuploadfileId",
    ErrorMsgbtn: "#Errormessagebutton",
    BootstrapAlert: "#BootStrapErroMsg",
    BtnReplaceFile: "#replaceFileBtn",
    BtnSaveNewVersion: "#saveNewVersionBtn",
    BtnCancel:"#Cancelbtn"

};

$(document).ready(function () {
    $(UploadFileVariable.IconErrorMsg).hide();
    $(UploadFileVariable.FileInput).on('change', function (event) {
        var FileValue = $(UploadFileVariable.FileInput).val();
        if (FileValue != '') {
            $(UploadFileVariable.BootstrapAlert).hide();
        }
    });
    
    $(UploadFileVariable.BtnUpload).on('click',function () {

        var Cheakfiles = $(UploadFileVariable.FileInput)[0].files;
        var FileValue = $(UploadFileVariable.FileInput).val();
        var IsValid = true;
        //checking file is available or not
        if (FileValue == '') {
            $(UploadFileVariable.FileErrorMsg).text('Plese Select File').show();
            $(UploadFileVariable.IconErrorMsg).show();
            $(UploadFileVariable.BootstrapAlert).show();
            IsValid = false;
            return false;
        }
        //Checking File Formate 

        var RegExpression = /\.(jpg|png|ppt|pdf|doc|docx|xls|xlsx)$/i;
        if (!RegExpression.test(FileValue)) {
            $(UploadFileVariable.BootstrapAlert).show();
            $(UploadFileVariable.FileErrorMsg).text('Invalid file format. Allowed formats are: .jpg, .png, .ppt, .pdf, .doc, .docx, .xls, .xlsx').show();
            $(UploadFileVariable.IconErrorMsg).show();
            IsValid = false;

        }
        
       /* console.log(cheakfiles);*/
        if (IsValid) {
            var FileInput = $(UploadFileVariable.FileInput)[0];
            var formData = new FormData();
            var Allfiles = FileInput.files;


           
            for (let i = 0; i < Allfiles.length; i++) {
                formData.append("files", Allfiles[i]);
                CheckingExistingFileOrNot(Allfiles[i].name, formData);
            }

           // uploadFiles(Uploadfiles);
        }
    });
});

//File Checking 
    function CheckingExistingFileOrNot(filename,formData) {

        $.ajax({

            type: 'Get',
            url: 'FileOperation/FileChecking?fileName='+filename,
        
            success: function (result) {
                console.log(result);
                if (result.fileExists) {
                    $('#fileExistsPopup').modal('show');

                }
                else {

                    uploadFiles(formData);
                }


            },
            error: function (xhr, status, error) {

            }

        });
    }
$(UploadFileVariable.BtnReplaceFile).click( function () {
        console.log("Click");
        var FileInput = $(UploadFileVariable.FileInput)[0];
        var formdata = new FormData();
        var allfile = FileInput.files;
        for (var i = 0; i < allfile.length; i++) {
            formdata.append("files", allfile[i]);
        }
        uploadFiles(formdata);
    
});



$(UploadFileVariable.BtnSaveNewVersion).on('click', function () {
    var getInput = $(UploadFileVariable.FileInput)[0];
    var formdata = new FormData();
    var getallfile = getInput.files;
    for (var i = 0; i < getallfile.length; i++) {
        formdata.append("file", getallfile[i]);
    }
    

    $.ajax({
        url: 'FileOperation/GetVersionNumber',
        type: 'post',
        data:formdata,
        processData: false,
        contentType: false,
        success: function (getdata) {
            alert("File upload with New Version Number");
            window.location.href = '/FileOperation/GetFiles';
        },
        error: function () {

        }


    });
});


    $(UploadFileVariable.BtnCancel).on('click', function () {
        $.ajax({
            url: 'FileOperation/FileUpload',
            type: 'get',           
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);

                $('#fileExistsPopup').modal('hide');
            },
            error: function (xhr, status, error) {
                console.error('Upload error:', error);
                $(UploadFileVariable.ErrorMsgbtn).text('Failed to upload files. Please try again later.');
            }
        });
    });


    

function uploadFiles(formdata) {
    //var formData = new FormData();
    //for (var i = 0; i < Uploadfiles.length; i++) {
    //    formData.append('files', Uploadfiles[i]);
    //}
  

    $.ajax({
        url: 'FileOperation/FileUpload',
        type: 'POST',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            alert("File upload succussfully");
            window.location.href = '/FileOperation/GetFiles';
          
            $('#fileExistsPopup').modal('hide');
        },
        error: function (xhr, status, error) {
           
            $(UploadFileVariable.ErrorMsgbtn).text('Failed to upload files. Please try again later.');
        }
    });


}