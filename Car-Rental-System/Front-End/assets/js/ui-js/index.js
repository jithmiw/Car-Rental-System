let baseUrl = "http://localhost:8080/easycar-rental/";

//Button Events
//Add Customer
$('#saveCustomer').click(function () {
    let formData = $('#customerForm').serialize();
    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log("Success Method Invoked");
            console.log(res);
            alert(res.message);
        },
        error: function (error) {
            console.log("Error Method Invoked");
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});