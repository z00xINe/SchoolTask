$(document).on('submit', '#post-form', function (e) {
    e.preventDefault();
    var formData = {
        user: $('#user').val(),
        pass: $('#pass').val(),
        num: $('#num').val(),
        as: $('input[name="as"]:checked').val(),
        email: $('#email').val(),
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
    };
    chk = true;
    if (formData.user == '') {
        alert("User name is empty");
        chk = false;
    }
    else if (formData.user.length < 6) {
        alert("Username must be at least 6 characters long");
        chk = false;
    }
    var conf = document.getElementById("Cpass").value;
    if (formData.pass == '') {
        alert("Password is empty");
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

    let v = /^(01)\d{9}$/;
    if (formData.num == '') {
        alert("Phone number is empty");
        chk = false;
    }
    else if (!v.test(formData.num)) {
        alert("Invalid phone number");
        chk = false;
    }

    if (formData.as == "")
        chk = false;

    if (chk) {
        $.ajax({
        type: 'POST',
        url: "/createProfile",
        data: formData,
        dataType: 'json',
        success: function (response) {
            alert(response.msg);
            window.location.href = "Login.html";
        }
        });
    }
    else {
        alert("Cannot sign up, try again!");
    }
});