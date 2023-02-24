let baseUrl = "http://localhost:8080/easycar-rental/";

// add driver
$("#saveDriver").click(function () {
    let formData = $('#driverForm').serialize();
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

// add car
$("#saveCar").click(function () {
    let formData = $('#carForm').serialize();
    $.ajax({
        url: baseUrl + "car",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.status===200){
                uploadCarImages();
                clearManageCarsForm();
            }
            alert(res.message);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function uploadCarImages() {
    let data = new FormData();
    let frontView = $("#inputFrontView")[0].files[0];
    let backView = $("#inputBackView")[0].files[0];
    let sideView = $("#inputSideView")[0].files[0];
    let interiorView = $("#inputInterior")[0].files[0];
    let carRegNo = $("#inputRegNo").val();

    data.append("carImage", frontView, frontView.name);
    data.append("carImage", backView, backView.name);
    data.append("carImage", sideView, sideView.name);
    data.append("carImage", interiorView, interiorView.name);
    data.append("carRegNo", carRegNo);

    $.ajax({
        url: baseUrl + "files/upload/carImages",
        method: "post",
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

// update car
$('#updateCar').click(function () {
    let regNo = $('#inputRegNo').val();
    let brand = $('#inputBrand').val();
    let type = $('#inputType').val();
    let transType = $('#inputTransType').val();
    let color = $('#inputColor').val();
    let passengers = $('#inputNoOfPassengers').val();
    let fuelType = $('#inputFuelType').val();
    let dailyRate = $('#inputDailyRate').val();
    let monthlyRate = $('#inputMonthlyRate').val();
    let extraKmPrice = $('#inputExtraKmPrice').val();
    let freeKmDay = $('#inputFreeKmDay').val();
    let freeKmMonth = $('#inputFreeKmMonth').val();
    let ldwPayment = $('#inputLdwPayment').val();
    let status = $('#inputStatus').val();

    var carOb = {
        reg_no: regNo,
        brand: brand,
        type: type,
        transmission_type: transType,
        color: color,
        no_of_passengers: passengers,
        fuel_type: fuelType,
        daily_rate: dailyRate,
        monthly_rate: monthlyRate,
        free_km_day: freeKmDay,
        free_km_month: freeKmMonth,
        extra_km_price: extraKmPrice,
        ldw_payment: ldwPayment,
        status: status
    }
    $.ajax({
        url: baseUrl + "car",
        method: "put",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(carOb),
        success: function (res) {
            if (res.status === 200){
                uploadCarImages();
                clearManageCarsForm();
            }
            alert(res.message);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// delete car
$('#deleteCar').click(function () {
    let regNo = $('#inputRegNo').val();

    $.ajax({
        url: baseUrl + "car?reg_no=" + regNo,
        method: "delete",
        success: function (res) {
            alert(res.message);
            clearManageCarsForm()
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function clearManageCarsForm() {
    $('#inputRegNo ,#inputBrand, #inputType, #inputTransType, #inputColor, #inputNoOfPassengers, #inputFuelType, ' +
        '#inputDailyRate, #inputMonthlyRate, #inputExtraKmPrice, #inputFreeKmDay, #inputFreeKmMonth, #inputLdwPayment, ' +
        '#inputStatus, #inputFrontView, #inputBackView, #inputSideView, #inputInterior').val("");
}