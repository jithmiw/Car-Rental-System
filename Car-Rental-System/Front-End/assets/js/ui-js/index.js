let baseUrl = "http://localhost:8080/easycar-rental/";

$("#toggleSignupPassword").click(function () {
    togglePassword($("#inputPassword"));
});

$("#toggleLoginPassword").click(function () {
    togglePassword($("#enterPassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $(this).toggleClass("bi-eye");
}

// login user
$("#loginUser").click(function () {

    let userDTO = {
        username: $("#enterUsername").val(),
        password: $("#enterPassword").val()
    }

    $.ajax({
        url: baseUrl + "login",
        method: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === ("Customer")) {
                    loginCustomer(res.data.nic_no)
                }
            }
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
        }
    });
});

// add customer
$("#saveCustomer").click(function () {
    let formData = $('#customerForm').serialize();
    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.status === 200){
                uploadFiles();
            }
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
    let licenseFile = $("#licenseFile")[0].files[0];
    let nicNo = $("#inputNicNo").val();

    data.append("file", nicFile, nicFile.name);
    data.append("file", licenseFile, licenseFile.name);
    data.append("customerNic", nicNo);

    $.ajax({
        url: baseUrl + "files/upload",
        method: "post",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log(res.message);
            if (res.status === 200){
                clearSignUpForm();
                openCustomerHome();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function loginCustomer(id) {
    localStorage.setItem("idValue", id);
    window.location.href = "customer.html";
}

function openCustomerHome() {
    localStorage.setItem("idValue", $('#inputNicNo').val());
    window.location.href = "customer.html";
}

function clearSignUpForm(){
    $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , #inputPassword, #nicFile, #licenseFile').val("");
}