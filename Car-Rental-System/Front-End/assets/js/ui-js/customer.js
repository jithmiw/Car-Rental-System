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
    let carCount = 0;
    $.ajax({
        url: baseUrl + "car",
        success: function (res) {
            var card = $(".card").clone();
            $('#carCards').empty();
            for (let c of res.data) {
                carCount++;
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
                newCard.find('.modal').attr("id", "seeImgsModal"+carCount);
                newCard.find('.btn-img').attr("data-bs-target", "#seeImgsModal"+carCount);
                newCard.find('.carousel').attr("id", "carCarousel"+carCount);
                newCard.find('.carousel-control-prev').attr("data-bs-target", "#carCarousel" + carCount);
                newCard.find('.carousel-control-next').attr("data-bs-target", "#carCarousel" + carCount);
                // loadCarImages(c.reg_no, newCard);
                newCard.find('.modal-title').text(brand);
                newCard.find('.card-header').text(type);
                newCard.find('.card-title').text(brand);
                newCard.find('#transType').text("Transmission Type : " + transType);
                newCard.find('#noOfPassengers').text("Passengers : " + noOfPassengers);
                newCard.find('#fuelType').text(fuelType);
                newCard.find('#freeKmDay').text("Free km for a Day : " + freeKmDay);
                newCard.find('#freeKmMonth').text("Free km for a Month : " + freeKmMonth);
                newCard.find('#dailyRate').text("Daily Rate(Rs.) : " + dailyRate);
                newCard.find('#monthlyRate').text("Monthly Rate(Rs.) : " + monthlyRate);
                newCard.find('#extraKmPrice').text("Price per Extra km(Rs.) : " + extraKmPrice);
                newCard.find('#ldwPayment').text("Loss Damage Waiver Payment(Rs.) : " + ldwPayment);
                $('#carCards').append(newCard);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});