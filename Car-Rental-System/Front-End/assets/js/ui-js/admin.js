let baseUrl = "http://localhost:8080/easycar-rental/";

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
            alert(res.message);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});