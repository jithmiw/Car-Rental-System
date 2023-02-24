let baseUrl = "http://localhost:8080/easycar-rental/";

$("#toggleUpdatePassword").click(function () {
    togglePassword($("#updatePassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $(this).toggleClass("bi-eye");
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
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

$('#searchCar').click(function () {
    let carCards = $("#carCards");
    carCards.removeClass("d-none");
    carCards.addClass("d-block");
    let pickUpDate = $("#pick-up-date").val();
    let returnDate = $("#return-date").val();
    let carCount = 0;
    $.ajax({
        url: baseUrl + "rentalDetail?pick_up_date=" + pickUpDate + "&return_date=" + returnDate,
        success: function (res) {
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
                carCards.append(newCard);
            }
            bindClickEventsToButtons();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
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
        let rentalDTO = {};
        var dataArray=$(this).closest("form").serializeArray();
        for (let i in dataArray) {
            rentalDTO[dataArray[i].name] = dataArray[i].value;
            console.log(dataArray[i].name);
        }
        $.ajax({
            url: baseUrl + "rentalDetail",
            method: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(rentalDTO),
            success: function (res) {
                console.log(res);
                if (res.status === 200) {
                    // uploadFiles();
                }
                alert(res.message);
            },
            error: function (error) {
                console.log(JSON.parse(error.responseText));
                alert(JSON.parse(error.responseText).message);
            }
        });
    });
}

function uploadFiles(formId) {
    let data = new FormData();
    let bankSlip = $(formId + ' #bank-slip')[0].files[0];

    data.append("bankSlipImage", bankSlip, bankSlip.name);
    data.append("rentalId", $(formId + ' #rental-id').val());

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
                clearReservationForm();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function clearReservationForm() {
    $('#pick-up-date ,#return-date, #pick-up-time, #return-time, #pick-up-venue, #return-venue, #bank-slip, #addDriver').val("");
}