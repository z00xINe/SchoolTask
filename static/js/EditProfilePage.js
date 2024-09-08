$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/getUser",
        success: function (response) {
            let storedUsers = response.users;
            window.localStorage.user = JSON.stringify(response.users);
            let i = window.localStorage.IndexOfLogin;
            document.getElementsByName("email")[0].value = storedUsers[i].Email;
            document.getElementsByName("type")[0].value = storedUsers[i].Type_of_profile;
            document.getElementsByName("user")[0].value = storedUsers[i].User_name;
            document.getElementsByName("num")[0].value = storedUsers[i].Phone_number;
            if (storedUsers[i].about != undefined)
                document.getElementsByName("about")[0].value = storedUsers[i].About;
        }
    })
});

$(document).on('submit', '#post-form', function (e) {
    e.preventDefault();
    var formData = {
        pass: $('#newpass').val(),
        num: $('#num').val(),
        email: $('#email').val(),
        about: $('#about').val(),
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
    };
    let i = window.localStorage.IndexOfLogin;
    let chk = true;
    let storedUsers = JSON.parse(window.localStorage.user);

    var oldPassword = document.getElementById("old pass").value;
    var conf = document.getElementById("confirm").value;
    let v = /^(01)\d{9}$/;

    if (oldPassword == '') {
        alert("Old password is empty");
        chk = false;
    }
    else if (oldPassword != storedUsers[i].Password) {
        alert("Old password is wrong!");
        chk = false;
    }
    else if (formData.pass == '') {
        alert("New password is empty");
        chk = false;
    }
    else if (formData.pass != conf) {
        alert("Don't same password");
        chk = false;
    }
    else if (formData.pass.length < 8) {
        alert("Password must be at least 8 characters long");
        chk = false;
    }
    else if (formData.num == '') {
        alert("Phone number is empty");
        chk = false;
    }
    else if (!v.test(formData.num)) {
        alert("Invalid phone number");
        chk = false;
    }
    else if (formData.about == '') {
        alert("'About' is empty");
        chk = false;
    }

    if (chk) {
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: "/editProfile",
            data: formData,
            dataType: 'json',
            headers: { 'X-CSRFToken': csrftoken },
            success: function (response) {
                alert(response.msg);
                window.location.href = "http://127.0.0.1:8000/signup/Login.html/ProfilePage.html";
            }
        });
    }
    else {
        alert("Can not save edit, please try again!");
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}