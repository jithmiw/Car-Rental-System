let baseUrl = "http://localhost:8080/easycar-rental/";

$('#manage-reservations').click(function () {
    $('#reservations').css('display', 'block');
    $('#customers').css('display', 'none');
    getRentalRequests();
    $('#btnRental').click();
});

$('#view-customers').click(function () {
    $('#customers').css('display', 'block');
    $('#reservations').css('display', 'none');
    getAllCustomers();
});

let rental = [];
let accepted = [];
let closed = [];
let denied = [];

// get rental requests
function getRentalRequests() {
    rental = [];
    accepted = [];
    closed = [];
    denied = [];
    $.ajax({
        url: baseUrl + "rentalDetail/getRentalRequests",
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let rentalStatus = r.rental_status;

                    if (rentalStatus === "Rental") {
                        rental.push(r);
                    } else if (rentalStatus === "Accepted") {
                        accepted.push(r);
                    } else if (rentalStatus === "Closed") {
                        closed.push(r);
                    } else {
                        denied.push(r);
                    }
                }
            }
            clearForm();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

$('#btnRental').click(function () {
    setTableRows(rental);
});

$('#btnAccepted').click(function () {
    setTableRows(accepted);
});

$('#btnDenied').click(function () {
    setTableRows(denied);
});

$('#btnClosed').click(function () {
    setTableRows(closed);
});

// set table rows
function setTableRows(array) {
    $('#tblReservations').empty();
    array.forEach(function (r) {
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
        let rentalStatus = r.rental_status;
        let reservedDate = r.reserved_date;
        let bankSlipImg = r.bank_slip_img;

        let row = "<tr><td>" + rentalId + "</td><td>" + customerNic + "</td><td>" + carRegNo + "</td>" +
            "<td>" + pickUpDate + "</td><td>" + returnDate + "</td><td>" + pickUpTime + "</td><td>" + returnTime + "</td>" +
            "<td>" + pickUpVenue + "</td><td>" + returnVenue + "</td><td>" + driverStatus + "</td><td>" + rentalStatus + "</td>" +
            "<td>" + reservedDate + "</td><td class='d-none'>" + bankSlipImg + "</td></tr>";
        $('#tblReservations').append(row);
    });
    bindClickEventsToRows();
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
        let rentalStatus = $(this).children(':eq(10)').text();
        let reservedDate = $(this).children(':eq(11)').text();
        let bankSlipImg = $(this).children(':eq(12)').text();

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
        $("#displayBankSlip").attr("src", baseUrl + bankSlipImg);
        clearPaymentForm();

        if (rentalStatus !== "Rental" && rentalStatus !== "Accepted" && rentalStatus !== "Closed") {
            $('#rental-status').val(rentalStatus);
        } else {
            $('#rental-status').val('');
        }
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

// get customers
function getAllCustomers() {
    $('#tblCustomers').empty();
    $.ajax({
        url: baseUrl + "customer",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let nicNo = c.nic_no;
                    let customerName = c.customer_name;
                    let address = c.address;
                    let email = c.email;
                    let licenseNo = c.license_no;
                    let contactNo = c.contact_no;
                    let regDate = c.reg_date;

                    let row = "<tr><td>" + nicNo + "</td><td>" + customerName + "</td><td>" + address + "</td>" +
                        "<td>" + email + "</td><td>" + licenseNo + "</td><td>" + contactNo + "</td><td>" + regDate + "</td></tr>";
                    $('#tblCustomers').append(row);
                }
                bindClickEventsToCustomerRows();
            }
            // clearAll();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the customer table rows
function bindClickEventsToCustomerRows() {
    $('#tblCustomers > tr').on('click', function () {
        let nicNo = $(this).children(':eq(0)').text();
        let customerName = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let email = $(this).children(':eq(3)').text();
        let licenseNo = $(this).children(':eq(4)').text();
        let contactNo = $(this).children(':eq(5)').text();
        let regDate = $(this).children(':eq(6)').text();

        $('#nic-no').val(nicNo);
        $('#customer-name').val(customerName);
        $('#address').val(address);
        $('#email').val(email);
        $('#license-no').val(licenseNo);
        $('#contact-no').val(contactNo);
        $('#registered-date').val(regDate);


        $.ajax({
            url: baseUrl + "customer/" + nicNo,
            method: 'get',
            dataType: 'json',
            success: function (res) {
                let nicUrl = res.data.nic_img;
                let licenseUrl = res.data.license_img;

                $("#displayNic").attr("src", baseUrl + nicUrl);
                $("#displayLicense").attr("src", baseUrl + licenseUrl);
            },
            error: function (err) {
                console.log(err);
            }
        });
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

// accept request
$("#acceptRequest").click(function () {
    let rentalId = $('#rental-id').val();
    if (confirm('Are you sure you want to accept this request in rental id : ' + rentalId + '?')) {
        $.ajax({
            url: baseUrl + "rentalDetail?rental_id=" + rentalId,
            method: "put",
            success: function (res) {
                alert(res.message);
                getRentalRequests();
                $('#btnAccepted').click();
                clearForm();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// deny request
$("#denyRequest").click(function () {
    let rentalId = $('#rental-id').val();
    let rentalStatus = $('#rental-status').val();
    if (confirm('Are you sure you want to deny this request in rental id : ' + rentalId + '?')) {
        $.ajax({
            url: baseUrl + "rentalDetail?rental_id=" + rentalId + "&reason=" + rentalStatus,
            method: "put",
            success: function (res) {
                alert(res.message);
                getRentalRequests();
                $('#btnDenied').click();
                clearForm();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearForm() {
    $('#rental-id, #reg-no, #customer-nic, #pick-up-date, #return-date, #pick-up-time, #return-time, ' +
        '#pick-up-venue, #return-venue, #rental-status, #reserved-date').val("");
    $("#selectDriverNic").empty();
}

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

$(document).on('show.bs.modal', '#calculatePaymentModal', function (e) {
    generateNewId();

    let timeDifference = new Date($('#return-date').val()).getTime() - new Date($('#pick-up-date').val()).getTime();
    let noOfDays = timeDifference / (1000 * 60 * 60 * 24);
    calculateRates(noOfDays);
    $('#payment-rental-id').val($('#rental-id').val());
});

function generateNewId() {
    $.ajax({
        url: baseUrl + "paymentDetail/generatePaymentId",
        success: function (res) {
            $('#payment-id').val(res.data);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

let extraKmPrice;

function calculateRates(noOfDays) {
    let regNo = $('#reg-no').val();
    $.ajax({
        url: baseUrl + "car?reg_no=" + regNo,
        success: function (res) {
            let dailyRate = res.data.daily_rate;
            let monthlyRate = res.data.monthly_rate;
            let ldwPayment = res.data.ldw_payment;
            extraKmPrice = res.data.extra_km_price;

            if ($('#rental-status').val() !== '') {
                $('#returned-amount').val(ldwPayment);
                $('#rental-fee, #extra-km, #extra-km-fee, #driver-fee, #damage-fee, #total-payment').val(0);
            } else {
                if (noOfDays < 30) {
                    $('#rental-fee').val(dailyRate * noOfDays);
                } else if (noOfDays >= 30) {
                    $('#rental-fee').val(monthlyRate * (noOfDays / 30));
                }
                $('#returned-amount').val(0);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function clearPaymentForm() {
    $('#rental-fee, #extra-km, #extra-km-fee, #driver-fee, #damage-fee, #total-payment').val('');
}

$('#driver-fee, #damage-fee').on('keyup', function (event) {
    calculateTotalPayment()
});

$('#extra-km').on('keyup', function (event) {
    $('#extra-km-fee').val($('#extra-km').val() * extraKmPrice);
    calculateTotalPayment()
});

function calculateTotalPayment() {
    let rentalFee = $('#rental-fee').val() === "" ? 0 : parseInt($('#rental-fee').val());
    let driverFee = $('#driver-fee').val() === "" ? 0 : parseInt($('#driver-fee').val());
    let extraKmFee = $('#extra-km-fee').val() === "" ? 0 : parseInt($('#extra-km-fee').val());
    let damageFee = $('#damage-fee').val() === "" ? 0 : parseInt($('#damage-fee').val());
    let returnedAmount = $('#returned-amount').val() === "" ? 0 : parseInt($('#returned-amount').val());

    let totalPayment = rentalFee + driverFee + extraKmFee + damageFee - returnedAmount;
    $('#total-payment').val(totalPayment);
}

// add payment detail
$("#btnPay").click(function () {
    let paymentDTO = {};
    let dataArray = $('#paymentForm').serializeArray();
    for (let i in dataArray) {
        paymentDTO[dataArray[i].name] = dataArray[i].value;
    }
    $.ajax({
        url: baseUrl + "paymentDetail",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(paymentDTO),
        success: function (res) {
            alert(res.message);
            clearPaymentForm();
            $('#payment-id').val('');
            $('#payment-rental-id').val('');
            getRentalRequests();
            $('#btnClosed').click();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

