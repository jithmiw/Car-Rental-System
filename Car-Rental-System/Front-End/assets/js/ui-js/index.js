let baseUrl = "http://localhost:8080/easycar-rental/";

const password = $('#inputPassword');

$('#toggleSignupPassword').click(function () {
    const type = password.attr('type') === 'password' ? 'text' : 'password';
    password.prop('type', type);
    $(this).toggleClass('bi-eye');
});

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
            uploadFiles();
            openCustomerHome(res.data);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function uploadFiles() {
    let data = new FormData();
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
            console.log(res.message);
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