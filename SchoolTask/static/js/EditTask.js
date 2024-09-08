$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/getUser",
        success: function (response) {
            user = response.users;
            var li = document.querySelector(".wel");
            var li2 = document.querySelector(".sign");
            var log = false;
            for (let i = 0; i < user.length; i++) {
                if (user[i].Login) {
                    li.innerHTML = `${user[i].User_name}`;
                    li2.innerHTML = "Sign out";
                    log = true;
                    break;
                }
            }
            if (!log) {
                li.innerHTML = "Login";
                li2.innerHTML = "Sign up";
            }
        }
    }), 5000,
    $.ajax({
        type: "GET",
        url: "/getTask",
        success: function (response) {
            let tasks = response.tasks;
            window.localStorage.tasks = JSON.stringify(response.tasks);
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].TaskID == window.localStorage.targetId) {
                    window.localStorage.edit = i;
                    document.getElementsByName('TaskId')[0].value = tasks[i].TaskID;
                    document.getElementsByName('TaskTitle')[0].value = tasks[i].Title;
                    document.getElementsByName('TeacherName')[0].value = tasks[i].Teacher_name;
                    document.getElementById('5').textContent = tasks[i].Description;
                    var radio = document.getElementsByName("Piority");
                    if (tasks[i].Piority == "Low") {
                        radio[0].checked = true;
                    }
                    else if (tasks[i].Piority == "Medium") {
                        radio[1].checked = true;
                    }
                    else if (tasks[i].Piority == "High") {
                        radio[2].checked = true;
                    }
                    break;
                }
            }
        }
    }, 5000)
})

function Update(event) {
    event.preventDefault();
    let tasks = JSON.parse(window.localStorage.tasks);
    var TaskId = document.getElementById("TaskId").value;
    var unique = true;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].TaskID == TaskId && TaskId != window.localStorage.targetId) {
            unique = false;
            break;
        }
    }
    var chk = true;
    if (!unique) {
        alert("Not available id, try another id");
        chk = false;
    }
    var TaskTitle = document.getElementById("TaskTitle").value;
    if (TaskTitle == '') {
        alert("Task title is empty");
        chk = false;
    }
    var TeacherName = document.getElementById("TeacherName").value;
    if (TeacherName == '') {
        alert("Teacher name is empty");
        chk = false;
    }
    var des = document.getElementById("5").value;
    if (des == '') {
        alert("Description is empty");
        chk = false;
    }
    var radio = document.getElementsByName("Piority");
    let pr;
    if (radio[0].checked) {
        pr = 'Low';
    }
    else if (radio[1].checked) {
        pr = 'Medium';
    }
    else if (radio[2].checked) {
        pr = 'High';
    }
    else {
        alert("You didn't choose 'Piority'");
        chk = false;
    }
    if (chk) {
        $.ajax({
            type: 'POST',
            url: "/editTask",
            data: {
                TaskId: $('#TaskId').val(),
                TaskTitle: $('#TaskTitle').val(),
                TeacherName: $('#TeacherName').val(),
                description: $('#5').val(),
                Piority: $('input[name="Piority"]:checked').val(),
                csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (response) {
                alert(response.msg);
                window.location.href = "http://127.0.0.1:8000/signup/Login.html/AdminHome.html";
            }
        });
    }
    else {
        alert("Can not add task, try again!");
    }
}