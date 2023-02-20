let baseUrl = "http://localhost:8080/easycar-rental/";

getAllCars();

function getAllCars() {
    $.ajax({
        url: baseUrl + "car",
        success: function (res) {
            var card = $(".card").clone();
            $('#carCards').empty();
            for (let c of res.data) {
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
                loadCarImages(c.reg_no, newCard);
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
}

function loadCarImages(reg_no, newCard) {
    $.ajax({
        url: baseUrl + "carImageDetail/" + reg_no,
        success: function (res) {
            newCard.find('#img-1').attr("src", baseUrl + res.data.image_one);
            newCard.find('#img-2').attr("src", baseUrl + res.data.image_two);
            newCard.find('#img-3').attr("src", baseUrl + res.data.image_three);
            newCard.find('#img-4').attr("src", baseUrl + res.data.image_four);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}