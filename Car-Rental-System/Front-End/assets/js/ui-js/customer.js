let baseUrl = "http://localhost:8080/easycar-rental/";

$(document).ready(function () {
    $("#home").click();
});

$("#home").click(function () {
    $('#customer-home').css('display', 'block');
    $('#reservations').css('display', 'none');
});

$("#my-reservations").click(function () {
    $('#reservations').css('display', 'block');
    $('#customer-home').css('display', 'none');
    getAllReservations();
});

$("#toggleUpdatePassword").click(function () {
    togglePassword($("#updatePassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $('#toggleUpdatePassword').toggleClass("bi bi-eye");
}

let nic = localStorage.getItem("nicValue");

$('#my-profile').click(function () {
    $.ajax({
        url: baseUrl + "customer/" + nic,
        success: function (res) {
            $("#updateName").val(res.data.customer_name);
            $("#updateAddress").val(res.data.address);
            $("#updateEmail").val(res.data.email);
            $("#updateContactNo").val(res.data.contact_no);
            $("#updateNicNo").val(res.data.nic_no);
            $("#updateLicenseNo").val(res.data.license_no);
            $("#updateUsername").val(res.data.username);
            $("#updatePassword").val(res.data.password);
            $("#updateRegDate").val(res.data.reg_date);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update customer
$('#updateCustomer').click(function () {
    let nicNo = $('#updateNicNo').val();

    $.ajax({
        url: baseUrl + "rentalDetail/countRequests?customer_nic=" + nic,
        success: function (res) {
            if (res.data === 0) {
                if (confirm('Are sure you want to update your profile?')) {
                    let name = $('#updateName').val();
                    let address = $('#inputAddress').val();
                    let email = $('#updateEmail').val();
                    let contactNo = $('#updateContactNo').val();
                    let licenseNo = $('#updateLicenseNo').val();
                    let username = $('#updateUsername').val();
                    let password = $('#updatePassword').val();
                    let regDate = $('#updateRegDate').val();

                    var customerDTO = {
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
                        url: baseUrl + "customer",
                        method: "put",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(customerDTO),
                        success: function (res) {
                            alert(res.message);
                        },
                        error: function (error) {
                            alert(JSON.parse(error.responseText).message);
                        }
                    });
                }
            } else {
                alert('Sorry, you are not allowed to update your profile while there is an ongoing rental');
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// get reservations
function getAllReservations() {
    $('#tblReservations').empty();
    $.ajax({
        url: baseUrl + "rentalDetail/?customer_nic=" + nic,
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let rentalId = r.rental_id;
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

                    let button = ``;
                    if (rentalStatus === "Rental" || rentalStatus === "Accepted") {
                        button = `<button type='button' class='btn btn-outline-secondary'>Cancel Request</button>`;
                    }
                    if (rentalStatus === "Rental") {
                        rentalStatus = "Pending";
                    }
                    let row = "<tr><td>" + rentalId + "</td><td>" + carRegNo + "</td><td>" + pickUpDate + "</td>" +
                        "<td>" + returnDate + "</td><td>" + pickUpTime + "</td><td>" + returnTime + "</td>" +
                        "<td>" + pickUpVenue + "</td><td>" + returnVenue + "</td><td>" + driverStatus + "</td><td>" + rentalStatus + "</td>" +
                        "<td>" + reservedDate + "</td><td>" + button + "</td></tr>";

                    $('#tblReservations').append(row);
                }
            }
            loadDriverInfo();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the table rows
function loadDriverInfo() {
    $('#tblReservations > tr').on('click', function () {
        let rentalId = $(this).children(':eq(0)').text();
        let driverStatus = $(this).children(':eq(8)').text();
        let rentalStatus = $(this).children(':eq(9)').text();

        if (driverStatus === "Yes" && rentalStatus === "Accepted") {
            $.ajax({
                url: baseUrl + "driver/rentalId/" + rentalId,
                success: function (res) {
                    let nic = res.data;
                    $('#rental-id').val(rentalId);
                    getDriver(nic);
                },
                error: function (error) {
                    console.log(JSON.parse(error.responseText).message);
                }
            });
        } else {
            $('#rental-id, #driver-name, #contact-no, #email').val("");
        }
    });
    $('#tblReservations > tr > td:nth-child(12) > button').on('click', function () {
        let rentalId = $(this).parent().parent().children(':eq(0)').text();

        if (confirm('Are sure you want to cancel the reservation in ' + rentalId + '?')) {
            $.ajax({
                url: baseUrl + "rentalDetail/cancelRequest?rental_id=" + rentalId,
                method: "put",
                success: function (res) {
                    alert(res.message);
                    getAllReservations();
                    $('#driver-name, #contact-no, #email').val("");
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
        }
    });
}

function getDriver(driverNic) {
    $.ajax({
        url: baseUrl + "driver/" + driverNic,
        success: function (res) {
            let name = res.data.driver_name;
            let contactNo = res.data.contact_no;
            let email = res.data.email;

            $('#driver-name').val(name);
            $('#contact-no').val(contactNo);
            $('#email').val(email);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText).message);
        }
    });
}

let carCards = $("#carCards");
$('#searchCar').click(function () {
    let pickUpDate = $("#search-pick-up-date").val();
    let returnDate = $("#search-return-date").val();
    let carCount = 0;
    $.ajax({
        url: baseUrl + "rentalDetail?pick_up_date=" + pickUpDate + "&return_date=" + returnDate,
        success: function (res) {
            if (res.data != null) {
                carCards.removeClass("d-none");
                carCards.addClass("d-block");
                var card = $("#carCards > div:nth-child(1)").clone();
                carCards.empty();
                for (let c of res.data) {
                    carCount++;
                    let regNo = c.reg_no;
                    let brand = c.brand;
                    let type = c.type;
                    let transType = c.transmission_type;
                    let noOfPassengers = c.no_of_passengers;
                    let fuelType = c.fuel_type;
                    let dailyRate = c.daily_rate;
                    let monthlyRate = c.monthly_rate;
                    let freeKmDay = c.free_km_day;
                    let freeKmMonth = c.free_km_month;
                    let extraKmPrice = c.extra_km_price;
                    let ldwPayment = c.ldw_payment;

                    var newCard = card.clone();
                    newCard.find('.car-reg-no').attr("id", "regNo" + carCount);
                    newCard.find('.see-img-modal').attr("id", "seeImgsModal" + carCount);
                    newCard.find('.reservation-modal').attr("id", "reservationModal" + carCount);
                    newCard.find('.btn-img').attr("data-bs-target", "#seeImgsModal" + carCount);
                    newCard.find('.btn-reservation').attr("data-bs-target", "#reservationModal" + carCount);
                    newCard.find('.carousel').attr("id", "carCarousel" + carCount);
                    newCard.find('.carousel-control-prev').attr("data-bs-target", "#carCarousel" + carCount);
                    newCard.find('.carousel-control-next').attr("data-bs-target", "#carCarousel" + carCount);
                    loadCarImages(regNo, newCard);
                    newCard.find('.modal-title').text(brand);
                    newCard.find('.card-header').text(type);
                    newCard.find('.card-title').text(brand);
                    newCard.find('#regNo' + carCount).text(regNo);
                    newCard.find('.transType').text("Transmission Type : " + transType);
                    newCard.find('.noOfPassengers').text("Passengers : " + noOfPassengers);
                    newCard.find('.fuelType').text(fuelType);
                    newCard.find('.freeKmDay').text("Free km for a Day : " + freeKmDay);
                    newCard.find('.freeKmMonth').text("Free km for a Month : " + freeKmMonth);
                    newCard.find('.dailyRate').text("Daily Rate(Rs.) : " + dailyRate);
                    newCard.find('.monthlyRate').text("Monthly Rate(Rs.) : " + monthlyRate);
                    newCard.find('.extraKmPrice').text("Price per Extra km(Rs.) : " + extraKmPrice);
                    newCard.find('.ldwPayment').text("Loss Damage Waiver Payment(Rs.) : " + ldwPayment);
                    newCard.find('#reservationForm').attr("id", "#reservationForm" + carCount);
                    carCards.append(newCard);
                }
                bindClickEventsToButtons();
            } else {
                carCards.removeClass("d-block");
                carCards.addClass("d-none");
                alert("No cars available for the time duration you searched for");
            }
        },
        error: function () {
            carCards.removeClass("d-block");
            carCards.addClass("d-none");
            alert("No cars available for the time duration you searched for");
        }
    });
});

function loadCarImages(reg_no, newCard) {
    $.ajax({
        url: baseUrl + "carImageDetail/" + reg_no,
        success: function (res) {
            newCard.find('.card-img-top').attr("src", baseUrl + res.data.image_one);
            newCard.find('.carousel-inner > div:nth-child(1) > img').attr("src", baseUrl + res.data.image_one);
            newCard.find('.carousel-inner > div:nth-child(2) > img').attr("src", baseUrl + res.data.image_two);
            newCard.find('.carousel-inner > div:nth-child(3) > img').attr("src", baseUrl + res.data.image_three);
            newCard.find('.carousel-inner > div:nth-child(4) > img').attr("src", baseUrl + res.data.image_four);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

$(document).on('show.bs.modal', '.reservationModal', function (e) {
    let reservationModalId = '#' + $(this).attr("id");
    generateNewId(reservationModalId);

    let num = reservationModalId.slice(17);
    let regNo = $('#regNo' + num).text();
    $(reservationModalId + ' .reg-no').val(regNo);
    $(reservationModalId + ' .customer-nic').val(nic);
    $(reservationModalId + ' .pick-up-date').val($("#search-pick-up-date").val());
    $(reservationModalId + ' .return-date').val($("#search-return-date").val());
});

function generateNewId(reservationModalId) {
    $.ajax({
        url: baseUrl + "rentalDetail/generateRentalId",
        success: function (res) {
            $(reservationModalId + ' .rental-id').val(res.data);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function bindClickEventsToButtons() {
    $('.rentCar').on('click', function () {
        let rentalId;
        let rentalDTO = {};
        let bankSlip = $(this).closest('form').find('.bank-slip')[0].files[0];
        let dataArray = $(this).closest("form").serializeArray();
        for (let i in dataArray) {
            rentalDTO[dataArray[i].name] = dataArray[i].value;
            if (dataArray[i].name === "rental_id") {
                rentalId = dataArray[i].value;
            }
        }
        if (bankSlip === undefined) {
            alert('Please input bank slip image of loss damage waiver payment');
        } else {
            $.ajax({
                url: baseUrl + "rentalDetail",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(rentalDTO),
                success: function (res) {
                    if (res.status === 200) {
                        let data = new FormData();
                        data.append("bankSlipImage", bankSlip, bankSlip.name);
                        data.append("rentalId", rentalId);

                        $.ajax({
                            url: baseUrl + "files/upload/bankSlipImages",
                            method: "post",
                            async: true,
                            contentType: false,
                            processData: false,
                            data: data,
                            success: function () {
                                clearReservationForm();
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                    alert(res.message);
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
        }
    });
}

function clearReservationForm() {
    location.reload();
    disableBackButton();
}

// log out
$("#logOut").click(function () {
    if (confirm('Are sure you want to logout?')) {
        window.location.href = "index.html";
        disableBackButton();
    }
});

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