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
            if (res.status===200){
                uploadCarImages();
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