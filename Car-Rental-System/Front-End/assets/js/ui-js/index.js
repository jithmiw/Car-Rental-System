let baseUrl = "http://localhost:8080/easycar-rental/";

// button events
// add customer
$('#saveCustomer').click(function () {
    let formData = $('#customerForm').serialize();
    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            openCustomerHome(res.data);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
    uploadFiles();
});

function uploadFiles() {
    var data = new FormData();
    let nicFile = $("#nicFile")[0].files[0];
    let nicFileName = nicFile.name;
    let licenseFile = $("#licenseFile")[0].files[0];
    let licenseFileName = nicFile.name;

    data.append("file", nicFile, nicFileName);
    data.append("file", licenseFile, licenseFileName);

    $.ajax({
        url: baseUrl + "files/upload",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            // alert(res.message);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function openCustomerHome(data) {
    window.location.href = "customer.html";
}

// function clearSignUpForm(){
//     $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , #inputPassword, #nicFile, #licenseFile').val("");
// }