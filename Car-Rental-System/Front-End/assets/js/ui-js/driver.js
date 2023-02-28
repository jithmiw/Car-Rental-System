let baseUrl = "http://localhost:8080/easycar-rental/";

$("#togglePassword").click(function () {
    togglePassword($("#password"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $(this).toggleClass("bi-eye");
}

let nic = localStorage.getItem("driverNic");

getAllSchedules();

$('#my-profile').click(function () {
    $.ajax({
        url: baseUrl + "driver/" + nic,
        success: function (res) {
            $("#name").val(res.data.driver_name);
            $("#address").val(res.data.address);
            $("#email").val(res.data.email);
            $("#contactNo").val(res.data.contact_no);
            $("#nicNo").val(res.data.nic_no);
            $("#licenseNo").val(res.data.license_no);
            $("#username").val(res.data.username);
            $("#password").val(res.data.password);
            $("#regDate").val(res.data.reg_date);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// get schedules
function getAllSchedules() {
    $('#tblSchedules').empty();
    $.ajax({
        url: baseUrl + "driver?driver_nic=" + nic,
        success: function (res) {
            if (res.data != null) {
                for (let s of res.data) {
                    let scheduleId = s.schedule_id;
                    let rentalId = s.rental_id;
                    let startDate = s.start_date;
                    let endDate = s.end_date;
                    let startTime = s.start_time;
                    let endTime = s.end_time;

                    let row = "<tr><td>" + scheduleId + "</td><td>" + rentalId + "</td><td>" + startDate + "</td>" +
                        "<td>" + endDate + "</td><td>" + startTime + "</td><td>" + endTime + "</td></tr>";
                    $('#tblSchedules').append(row);
                }
            }
            loadScheduleInfo();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the table rows
function loadScheduleInfo() {
    $('#tblSchedules > tr').on('click', function () {
        let scheduleId = $(this).children(':eq(0)').text();
        let rentalId = $(this).children(':eq(1)').text();
        let startDate = $(this).children(':eq(2)').text();
        let endDate = $(this).children(':eq(3)').text();
        let startTime = $(this).children(':eq(4)').text();
        let endTime = $(this).children(':eq(5)').text();

        $('#schedule-id').val(scheduleId);
        $('#rental-id').val(rentalId);
        $('#start-date').val(startDate);
        $('#end-date').val(endDate);
        $('#start-time').val(startTime);
        $('#end-time').val(endTime);
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
        window.onpageshow = function(e) {
            if (e.persisted)
                disableBack();
        }
    }
});