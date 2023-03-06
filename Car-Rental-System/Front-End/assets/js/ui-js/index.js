let baseUrl = "http://localhost:8080/easycar-rental/";

// validations

// regular expressions
const usernameRegEx = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const cusNicRegEx = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusEmailRegEx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const cusContactNoRegEx = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
const cusLicenseNoRegEx = /^([x|X|b|B][0-9]{7}[x|X|d|D])$/;

// disable tab key of all text fields
$('#enterUsername, #enterPassword, #inputName, #inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername, #inputPassword').on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

// login validations
let loginValidations = [];
loginValidations.push({
    reg: usernameRegEx,
    field: $('#enterUsername'),
    error: 'Wrong username pattern'
});
loginValidations.push({
    reg: passwordRegEx,
    field: $('#enterPassword'),
    error: 'Wrong password pattern'
});

$('#enterUsername, #enterPassword').on('keyup', function (event) {
    checkValidity(loginValidations, '#loginUser');
});

$('#enterUsername').on('keydown', function (event) {
    if (event.key === "Enter" && check(usernameRegEx, $('#enterUsername'))) {
        $('#enterPassword').focus();
    } else {
        focusText($('#enterUsername'));
    }
});

$('#enterPassword').on('keydown', function (event) {
    if (event.key === "Enter" && check(passwordRegEx, $('#enterPassword'))) {
        $('#loginUser').click();
    }
});

// customer validations
let customerValidations = [];
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#inputName'),
    error: 'Wrong name pattern'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#inputAddress'),
    error: 'Wrong address pattern'
});
customerValidations.push({
    reg: cusEmailRegEx,
    field: $('#inputEmail'),
    error: 'Wrong email pattern'
});
customerValidations.push({
    reg: cusContactNoRegEx,
    field: $('#inputContactNo'),
    error: 'Wrong contact no pattern'
});
customerValidations.push({
    reg: cusNicRegEx,
    field: $('#inputNicNo'),
    error: 'Wrong nic pattern'
});
customerValidations.push({
    reg: cusLicenseNoRegEx,
    field: $('#inputLicenseNo'),
    error: 'Wrong license no pattern'
});
customerValidations.push({
    reg: usernameRegEx,
    field: $('#inputUsername'),
    error: 'Wrong username pattern'
});
customerValidations.push({
    reg: passwordRegEx,
    field: $('#inputPassword'),
    error: 'Wrong password pattern'
});

$('#inputName, #inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername, #inputPassword').on('keyup', function (event) {
    checkValidity(customerValidations, '#saveCustomer');
});

$('#inputName').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegEx, $('#inputName'))) {
        $('#inputAddress').focus();
    } else {
        focusText($('#inputName'));
    }
});

$('#inputAddress').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusAddressRegEx, $('#inputAddress'))) {
        $('#inputEmail').focus();
    } else {
        focusText($('#inputAddress'));
    }
});

$('#inputEmail').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusEmailRegEx, $('#inputEmail'))) {
        $('#inputContactNo').focus();
    } else {
        focusText($('#inputEmail'));
    }
});

$('#inputContactNo').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusContactNoRegEx, $('#inputContactNo'))) {
        $('#inputNicNo').focus();
    } else {
        focusText($('#inputContactNo'));
    }
});

$('#inputNicNo').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNicRegEx, $('#inputNicNo'))) {
        $('#inputLicenseNo').focus();
    } else {
        focusText($('#inputNicNo'));
    }
});

$('#inputLicenseNo').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusLicenseNoRegEx, $('#inputLicenseNo'))) {
        $('#inputUsername').focus();
    } else {
        focusText($('#inputLicenseNo'));
    }
});

$('#inputUsername').on('keydown', function (event) {
    if (event.key === "Enter" && check(usernameRegEx, $('#inputUsername'))) {
        $('#inputPassword').focus();
    } else {
        focusText($('#inputUsername'));
    }
});

$('#inputPassword').on('keydown', function (event) {
    if (event.key === "Enter" && check(passwordRegEx, $('#inputPassword'))) {
        $('#nicFile').focus();
    } else {
        focusText($('#inputPassword'));
    }
});

$('#nicFile').on('keydown', function (event) {
    if (event.key === "Enter" && $('#nicFile').val() !== '') {
        $('#licenseFile').focus();
    } else {
        focusText($('#nicFile'));
    }
});

$('#licenseFile').on('keydown', function (event) {
    if (!(event.key === "Enter" && $('#licenseFile').val() !== '')) {
        focusText($('#licenseFile'));
    }
});

function isImgFieldsEmpty() {
    return !($('#nicFile').val() !== '' && $('#licenseFile').val() !== '');
}

//
$("#toggleSignupPassword").click(function () {
    togglePassword($("#inputPassword"));
});

$("#toggleLoginPassword").click(function () {
    togglePassword($("#enterPassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $('#toggleSignupPassword').toggleClass("bi bi-eye");
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
                if (res.message === "Customer") {
                    loginCustomer(res.data.nic_no);
                } else if (res.message === "Driver") {
                    loginDriver(res.data.nic_no);
                } else if (res.message === "Admin") {
                    loginAdmin();
                }
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// add customer
$("#saveCustomer").click(function () {
    if (isImgFieldsEmpty()) {
        alert('Please input your nic & license images');
    } else {
        let formData = $('#customerForm').serialize();
        $.ajax({
            url: baseUrl + "customer",
            method: "post",
            data: formData,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.status === 200) {
                    uploadFiles();
                }
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
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

function disableBackButton() {
    function disableBack() {
        window.history.forward()
    }

    window.onload = disableBack();
    window.onpageshow = function (e) {
        if (e.persisted)
            disableBack();
    }
}

function loginCustomer(nic) {
    localStorage.setItem("nicValue", nic);
    window.location.href = "customer.html";
    disableBackButton();
}

function loginDriver(nic) {
    localStorage.setItem("driverNic", nic);
    window.location.href = "driver.html";
    disableBackButton();
}

function loginAdmin() {
    window.location.href = "admin.html";
    disableBackButton();
}

function openCustomerHome() {
    localStorage.setItem("nicValue", $('#inputNicNo').val());
    window.location.href = "customer.html";
    disableBackButton();
}

function clearSignUpForm() {
    $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , ' +
        '#inputPassword, #nicFile, #licenseFile').val("");
}