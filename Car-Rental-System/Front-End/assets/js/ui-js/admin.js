let baseUrl = "http://localhost:8080/easycar-rental/";

$('#manage-reservations').click(function () {
    $('#reservations').removeClass("d-none");
    $('#reservations').addClass("d-block");
    getRentalRequests();
});

// get rental requests
function getRentalRequests() {
    $('#tblReservations').empty();
    $.ajax({
        url: baseUrl + "rentalDetail/getRentalRequests",
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let rentalId = r.rental_id;
                    let customerNic = r.customer_nic;
                    let carRegNo = r.car_reg_no;
                    let pickUpDate = r.pick_up_date;
                    let returnDate = r.return_date;
                    let pickUpTime = r.pick_up_time;
                    let returnTime = r.return_time;
                    let pickUpVenue = r.pick_up_venue;
                    let returnVenue = r.return_venue;
                    let driverStatus = r.driver_status;
                    let reservedDate = r.reserved_date;

                    let row = "<tr><td>" + rentalId + "</td><td>" + customerNic + "</td><td>" + carRegNo + "</td>" +
                        "<td>" + pickUpDate + "</td><td>" + returnDate + "</td><td>" + pickUpTime + "</td><td>" + returnTime + "</td>" +
                        "<td>" + pickUpVenue + "</td><td>" + returnVenue + "</td><td>" + driverStatus + "</td><td>" + reservedDate + "</td></tr>";
                    $('#tblReservations').append(row);
                }
                bindClickEventsToRows();
            }
            // clearAll();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the table rows
function bindClickEventsToRows() {
    $('#tblReservations > tr').on('click', function () {
        let rentalId = $(this).children(':eq(0)').text();
        let customerNic = $(this).children(':eq(1)').text();
        let carRegNo = $(this).children(':eq(2)').text();
        let pickUpDate = $(this).children(':eq(3)').text();
        let returnDate = $(this).children(':eq(4)').text();
        let pickUpTime = $(this).children(':eq(5)').text();
        let returnTime = $(this).children(':eq(6)').text();
        let pickUpVenue = $(this).children(':eq(7)').text();
        let returnVenue = $(this).children(':eq(8)').text();
        let driverStatus = $(this).children(':eq(9)').text();
        let reservedDate = $(this).children(':eq(10)').text();

        $('#rental-id').val(rentalId);
        $('#reg-no').val(carRegNo);
        $('#customer-nic').val(customerNic);
        $('#pick-up-date').val(pickUpDate);
        $('#return-date').val(returnDate);
        $('#pick-up-time').val(pickUpTime);
        $('#return-time').val(returnTime);
        $('#pick-up-venue').val(pickUpVenue);
        $('#return-venue').val(returnVenue);
        $('#reserved-date').val(reservedDate);

        if (driverStatus === "Yes") {
            $("#selectDriverNic").empty();
            $.ajax({
                url: baseUrl + "driver/rentalId/" + rentalId,
                success: function (res) {
                    let nic = res.data;
                    $("#selectDriverNic").append(`<option selected value="${nic}">${nic}</option>`);
                    loadAllDrivers(nic);
                },
                error: function (error) {
                    console.log(JSON.parse(error.responseText).message);
                }
            });
        } else {
            $("#selectDriverNic").empty();
            $("#selectDriverNic").append(`<option selected value="No">No</option>`);
        }
    });
}

function loadAllDrivers(driverNic) {
    $.ajax({
        url: baseUrl + "driver/getAllDriversNic",
        success: function (res) {
            for (let n of res.data) {
                let nic = n;
                if (nic === driverNic) {
                    continue;
                }
                $("#selectDriverNic").append(`<option value="${nic}">${nic}</option>`);
            }
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText).message);
        }
    });
}

// change driver
$("#changeDriver").click(function () {
    let rentalId = $('#rental-id').val();
    let driverNic = $('#selectDriverNic').val();
    if (confirm('Are you sure you want to change the driver assigned in rental id : ' + rentalId + '?')) {
        $.ajax({
            url: baseUrl + "driver?rental_id=" + rentalId + "&nic_no=" + driverNic,
            method: "put",
            success: function (res) {
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// add driver
$("#saveDriver").click(function () {
    let formData = $('#driverForm').serialize();
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
        url: baseUrl + "driver",
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
            if (res.status === 200) {
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
            if (res.status === 200) {
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