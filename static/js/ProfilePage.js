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
            if (storedUsers[i].About != undefined)
                document.getElementsByName("about")[0].value = storedUsers[i].About;
        }
    }, 5000)
});

function toHome() {
    let users = JSON.parse(window.localStorage.user);
    let i = window.localStorage.IndexOfLogin;
    if (users[i].Type_of_profile == 'Admin')
        window.location.href = "http://127.0.0.1:8000/signup/Login.html/AdminHome.html/";
    else
        window.location.href = "http://127.0.0.1:8000/signup/Login.html/TeacherPage.html/";
}