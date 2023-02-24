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

// add driver
$("#saveCustomer").click(function () {
    let formData = $('#customerForm').serialize();
    $.ajax({
        url: baseUrl + "driver",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            alert(res.message);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update driver
$('#updateDriver').click(function () {
    let name = $('#inputName').val();
    let nicNo = $('#inputNicNo').val();
    let address = $('#inputAddress').val();
    let email = $('#inputEmail').val();
    let contactNo = $('#inputContactNo').val();
    let licenseNo = $('#inputLicenseNo').val();
    let username = $('#inputUsername').val();
    let password = $('#inputPassword').val();

    var driverDTO = {
        nic_no: nicNo,
        driver_name: name,
        license_no: licenseNo,
        address: address,
        contact_no: contactNo,
        email: email,
        username: username,
        password: password
    }
    $.ajax({
        url: baseUrl + "car",
        method: "put",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(driverDTO),
        success: function (res) {
            alert(res.message);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// delete driver
$('#deleteDriver').click(function () {
    let nicNo = $('#inputNicNo').val();

    $.ajax({
        url: baseUrl + "driver?nic_no=" + nicNo,
        method: "delete",
        success: function (res) {
            alert(res.message);
            clearManageDriversForm()
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function clearManageDriversForm() {
    $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , #inputPassword').val("");
}

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
            if (res.status === 200) {
                openCustomerHome();
                clearSignUpForm();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function loginCustomer(nic) {
    localStorage.setItem("nicValue", nic);
    window.location.href = "customer.html";
}

function openCustomerHome() {
    localStorage.setItem("nicValue", $('#inputNicNo').val());
    window.location.href = "customer.html";
}

function clearSignUpForm() {
    $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , ' +
        '#inputPassword, #nicFile, #licenseFile').val("");
}