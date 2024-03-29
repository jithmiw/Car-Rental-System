let baseUrl = "http://localhost:8080/easycar-rental/";

$(document).ready(function () {
    $('#home').click();
});

$('#home').click(function () {
    $('#dashboard').css('display', 'block');
    $('#reservations, #cars, #customers, #drivers, #payments, #cars').css('display', 'none');
    setDashboard();
});

$('#manage-reservations').click(function () {
    $('#reservations').css('display', 'block');
    $('#dashboard, #cars, #customers, #payments, #drivers').css('display', 'none');
    getRentalRequests();
    $('#btnRental').click();
});

$('#manage-cars').click(function () {
    $('#cars').css('display', 'block');
    $('#dashboard, #customers, #drivers, #payments, #reservations').css('display', 'none');
    getRentalRequests();
    $('#btnRental').click();
});

$('#manage-drivers').click(function () {
    $('#drivers').css('display', 'block');
    $('#dashboard, #cars, #customers, #reservations, #payments').css('display', 'none');
    getAllDrivers();
});

$('#view-customers').click(function () {
    $('#customers').css('display', 'block');
    $('#dashboard, #reservations, #cars, #drivers, #payments').css('display', 'none');
    getAllCustomers();
});

$('#view-payments').click(function () {
    $('#payments').css('display', 'block');
    $('#dashboard, #reservations, #cars, #drivers, #customers').css('display', 'none');
    getAllPayments();
});

function setDashboard() {
    getAllCustomers();
    getAllCars();
    getRentalRequests();
    getAllPayments();
}

let rental = [];
let accepted = [];
let closed = [];
let cancelled = [];
let denied = [];

// get rental requests
function getRentalRequests() {
    let todayBookings = 0;
    rental = [];
    accepted = [];
    closed = [];
    cancelled = [];
    denied = [];
    $.ajax({
        url: baseUrl + "rentalDetail/getRentalRequests",
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let resDate = new Date(r.reserved_date);
                    let currDate = new Date();

                    if (resDate.setHours(0, 0, 0, 0) ===
                        currDate.setHours(0, 0, 0, 0)) {
                        todayBookings++;
                    }
                    let rentalStatus = r.rental_status;

                    if (rentalStatus === "Rental") {
                        rental.push(r);
                    } else if (rentalStatus === "Accepted") {
                        accepted.push(r);
                    } else if (rentalStatus === "Closed") {
                        closed.push(r);
                    } else if (rentalStatus === "Cancelled") {
                        cancelled.push(r);
                    } else {
                        denied.push(r);
                    }
                }
                $('#todayBookings').text(todayBookings);
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

$('#btnCancelled').click(function () {
    setTableRows(cancelled);
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

        if (rentalStatus !== "Rental" && rentalStatus !== "Accepted" && rentalStatus !== "Cancelled" && rentalStatus !== "Closed") {
            $('#rental-status').val(rentalStatus);
            $('#rental-status-hd').text('(Denied)');
        } else {
            $('#rental-status').val('');
            $('#rental-status-hd').text('(' + rentalStatus + ')');
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

$('#viewCars').click(function (){
    getAllCars();
    $('#inputStatus').val('');
});

// get cars
function getAllCars() {
    let availableCars = 0;
    let reservedCars = 0;
    $('#tblCars').empty();
    $.ajax({
        url: baseUrl + "car",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let regNo = c.reg_no;
                    let brand = c.brand;
                    let type = c.type;
                    let transmissionType = c.transmission_type;
                    let color = c.color;
                    let noOfPassengers = c.no_of_passengers;
                    let fuelType = c.fuel_type;
                    let dailyRate = c.daily_rate;
                    let monthlyRate = c.monthly_rate;
                    let extraKmPrice = c.extra_km_price;
                    let freeKmDay = c.free_km_day;
                    let freeKmMonth = c.free_km_month;
                    let ldwPayment = c.ldw_payment;
                    let status = c.status;

                    if (status === "Available") {
                        availableCars++;
                    } else if (status === "Reserved") {
                        reservedCars++;
                    }

                    let row = "<tr><td>" + regNo + "</td><td>" + brand + "</td><td>" + type + "</td>" +
                        "<td>" + transmissionType + "</td><td>" + color + "</td><td>" + noOfPassengers + "</td>" +
                        "<td>" + fuelType + "</td><td>" + dailyRate + "</td><td>" + monthlyRate + "</td>" +
                        "<td>" + extraKmPrice + "</td><td>" + freeKmDay + "</td><td>" + freeKmMonth + "</td>" +
                        "<td>" + ldwPayment + "</td><td>" + status + "</td></tr>";
                    $('#tblCars').append(row);
                }
                bindClickEventsToCarRows();
            }
            clearManageCarsForm();
            $('#availableCars').text(availableCars);
            $('#reservedCars').text(reservedCars);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the car table rows
function bindClickEventsToCarRows() {
    $('#tblCars > tr').on('click', function () {
        let regNo = $(this).children(':eq(0)').text();
        let brand = $(this).children(':eq(1)').text();
        let type = $(this).children(':eq(2)').text();
        let transType = $(this).children(':eq(3)').text();
        let color = $(this).children(':eq(4)').text();
        let noOfPassengers = $(this).children(':eq(5)').text();
        let fuelType = $(this).children(':eq(6)').text();
        let dailyRate = $(this).children(':eq(7)').text();
        let monthlyRate = $(this).children(':eq(8)').text();
        let extraKmPrice = $(this).children(':eq(9)').text();
        let freeKmDay = $(this).children(':eq(10)').text();
        let freeKmMonth = $(this).children(':eq(11)').text();
        let ldwPayment = $(this).children(':eq(12)').text();
        let status = $(this).children(':eq(13)').text();
        let imgOne = $(this).children(':eq(14)').text();
        let imgTwo = $(this).children(':eq(15)').text();
        let imgThree = $(this).children(':eq(16)').text();
        let imgFour = $(this).children(':eq(17)').text();

        $('#inputRegNo').val(regNo);
        $('#inputBrand').val(brand);
        $('#inputType').val(type);
        $('#inputTransType').val(transType);
        $('#inputColor').val(color);
        $('#inputNoOfPassengers').val(noOfPassengers);
        $('#inputFuelType').val(fuelType);
        $('#inputDailyRate').val(dailyRate);
        $('#inputMonthlyRate').val(monthlyRate);
        $('#inputExtraKmPrice').val(extraKmPrice);
        $('#inputFreeKmDay').val(freeKmDay);
        $('#inputFreeKmMonth').val(freeKmMonth);
        $('#inputLdwPayment').val(ldwPayment);
        $('#inputFrontView').val(imgOne);
        $('#inputBackView').val(imgTwo);
        $('#inputSideView').val(imgThree);
        $('#inputInterior').val(imgFour);

        $('#inputStatus option').each(function () {
            if (status === "Available") {
                $("#inputStatus option[value=1]").attr('selected', 'selected');
            } if (status === "Not Available") {
                $("#inputStatus option[value=2]").attr('selected', 'selected');
            } else {
                $("#inputStatus option[value=3]").attr('selected', 'selected');
            }
        });
    });
}

// get customers
function getAllCustomers() {
    $('#tblCustomers').empty();
    let registeredUsers = 0;
    $.ajax({
        url: baseUrl + "customer",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    registeredUsers++;
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
            $('#registeredUsers').text(registeredUsers);
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

// cancel request
$("#cancelRequest").click(function () {
    $("#denyRequest").click();
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
            getAllDrivers();
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update driver
$('#updateDriver').click(function () {
    let nicNo = $('#inputNicNo').val();

    if (confirm('Are sure you want to update the driver in ' + nicNo + '?')) {
        let name = $('#inputName').val();
        let address = $('#inputAddress').val();
        let email = $('#inputEmail').val();
        let contactNo = $('#inputContactNo').val();
        let licenseNo = $('#inputLicenseNo').val();
        let username = $('#inputUsername').val();
        let password = $('#inputPassword').val();
        let regDate = $('#regDate').val();

        var driverDTO = {
            nic_no: nicNo,
            driver_name: name,
            license_no: licenseNo,
            address: address,
            contact_no: contactNo,
            email: email,
            username: username,
            password: password,
            reg_date: regDate,
        }
        $.ajax({
            url: baseUrl + "driver",
            method: "put",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(driverDTO),
            success: function (res) {
                alert(res.message);
                getAllDrivers();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// delete driver
$('#deleteDriver').click(function () {
    let nicNo = $('#inputNicNo').val();

    if (confirm('Are sure you want to delete the driver in ' + nicNo + '?')) {
        $.ajax({
            url: baseUrl + "driver?nic_no=" + nicNo,
            method: "delete",
            success: function (res) {
                alert(res.message);
                getAllDrivers();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearManageDriversForm() {
    $('#inputName ,#inputAddress, #inputEmail, #inputContactNo, #inputNicNo, #inputLicenseNo, #inputUsername , #inputPassword').val("");
}

// get customers
function getAllDrivers() {
    $('#tblDrivers').empty();
    $.ajax({
        url: baseUrl + "driver",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let nicNo = c.nic_no;
                    let driverName = c.driver_name;
                    let address = c.address;
                    let email = c.email;
                    let licenseNo = c.license_no;
                    let contactNo = c.contact_no;
                    let username = c.username;
                    let password = c.password;
                    let regDate = c.reg_date;

                    let row = "<tr><td>" + nicNo + "</td><td>" + driverName + "</td><td>" + address + "</td>" +
                        "<td>" + email + "</td><td>" + licenseNo + "</td><td>" + contactNo + "</td><td class='d-none'>" + username + "</td>" +
                        "<td class='d-none'>" + password + "</td><td>" + regDate + "</td></tr>";
                    $('#tblDrivers').append(row);
                }
                bindClickEventsToDriverRows();
            }
            clearManageDriversForm();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the driver table rows
function bindClickEventsToDriverRows() {
    $('#tblDrivers > tr').on('click', function () {
        let nicNo = $(this).children(':eq(0)').text();
        let driverName = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let email = $(this).children(':eq(3)').text();
        let licenseNo = $(this).children(':eq(4)').text();
        let contactNo = $(this).children(':eq(5)').text();
        let username = $(this).children(':eq(6)').text();
        let password = $(this).children(':eq(7)').text();
        let regDate = $(this).children(':eq(8)').text();

        $('#inputNicNo').val(nicNo);
        $('#inputName').val(driverName);
        $('#inputAddress').val(address);
        $('#inputEmail').val(email);
        $('#inputLicenseNo').val(licenseNo);
        $('#inputContactNo').val(contactNo);
        $('#inputUsername').val(username);
        $('#inputPassword').val(password);
        $('#regDate').val(regDate);
    });
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
                getAllCars();
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

    if (confirm('Are sure you want to update the car in ' + regNo + '?')) {
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
                    getAllCars();
                    $('#inputStatus').val('');
                }
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// delete car
$('#deleteCar').click(function () {
    let regNo = $('#inputRegNo').val();

    if (confirm('Are sure you want to delete the car in ' + regNo + '?')) {
        $.ajax({
            url: baseUrl + "car?reg_no=" + regNo,
            method: "delete",
            success: function (res) {
                alert(res.message);
                getAllCars();
                $('#inputStatus').val('');
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearManageCarsForm() {
    $('#inputRegNo ,#inputBrand, #inputType, #inputTransType, #inputColor, #inputNoOfPassengers, #inputFuelType, ' +
        '#inputDailyRate, #inputMonthlyRate, #inputExtraKmPrice, #inputFreeKmDay, #inputFreeKmMonth, #inputLdwPayment, ' +
        '#inputFrontView, #inputBackView, #inputSideView, #inputInterior').val("");
    $('#inputStatus option[value=0]').attr('selected', 'selected');
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
let ldwPayment;

function calculateRates(noOfDays) {
    let regNo = $('#reg-no').val();
    $.ajax({
        url: baseUrl + "car?reg_no=" + regNo,
        success: function (res) {
            let dailyRate = res.data.daily_rate;
            let monthlyRate = res.data.monthly_rate;
            ldwPayment = res.data.ldw_payment;
            extraKmPrice = res.data.extra_km_price;

            if ($('#rental-status-hd').text() === '(Denied)' || $('#rental-status-hd').text() === '(Cancelled)') {
                $('#returned-amount').val(ldwPayment);
                $('#rental-fee, #extra-km, #extra-km-fee, #driver-fee, #damage-fee, #total-payment').val(0);
            } else {
                if (noOfDays < 30) {
                    $('#rental-fee').val(dailyRate * noOfDays);
                } else if (noOfDays >= 30) {
                    $('#rental-fee').val(monthlyRate * (noOfDays / 30));
                }
                if ($('#selectDriverNic').val() !== 'No') {
                    $('#driver-fee').val(1000);
                } else {
                    $('#driver-fee').val(0);
                }
                $('#returned-amount').val(ldwPayment);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function clearPaymentForm() {
    $('#rental-status-hd, #rental-fee, #extra-km, #extra-km-fee, #driver-fee, #damage-fee, #returned-amount, #total-payment').val('');
    $("#calculatePaymentModal .btn-close").click();
}

$('#driver-fee').on('keyup', function (event) {
    calculateTotalPayment();
});

$('#damage-fee').on('keyup', function (event) {
    $('#returned-amount').val(ldwPayment - parseInt($('#damage-fee').val()));
    calculateTotalPayment();
});

$('#extra-km').on('keyup', function (event) {
    $('#extra-km-fee').val($('#extra-km').val() * extraKmPrice);
    calculateTotalPayment();
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

// get payments
function getAllPayments() {
    let dailyIncome = 0;
    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "paymentDetail",
        success: function (res) {
            if (res.data != null) {
                for (let p of res.data) {
                    let payDate = new Date(p.payment_date);
                    let currDate = new Date();

                    if (payDate.setHours(0, 0, 0, 0) ===
                        currDate.setHours(0, 0, 0, 0)) {
                        dailyIncome += p.total_payment;
                    }

                    let paymentId = p.payment_id;
                    let rentalId = p.rental_id;
                    let rentalFee = p.rental_fee;
                    let driverFee = p.driver_fee;
                    let extraKm = p.extra_km;
                    let extraKmFee = p.extra_km_fee;
                    let returnedAmount = p.returned_amount;
                    let damageFee = p.damage_fee;
                    let totalPayment = p.total_payment;
                    let paymentDate = p.payment_date;

                    let row = "<tr><td>" + paymentId + "</td><td>" + rentalId + "</td><td>" + rentalFee + "</td>" +
                        "<td>" + driverFee + "</td><td>" + extraKm + "</td><td>" + extraKmFee + "</td><td>" + damageFee + "</td>" +
                        "<td>" + returnedAmount + "</td><td>" + totalPayment + "</td><td>" + paymentDate + "</td></tr>";
                    $('#tblPayments').append(row);
                }
                $('#dailyIncome').text(dailyIncome);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// log out
$("#logOut").click(function () {
    if (confirm('Are sure you want to logout?')) {
        window.location.href = "index.html";

        function disableBack() {
            window.history.forward()
        }

        window.onload = disableBack();
        window.onpageshow = function (e) {
            if (e.persisted)
                disableBack();
        }
    }
});

