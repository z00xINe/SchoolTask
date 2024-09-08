
$(document).ready(function () {
    setInterval(
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
                var Tasks = response.tasks;
                $(document).on('submit', '#post-form', function (e) {
                    e.preventDefault();
                    var TaskData = {
                        TaskId: $('#TaskId').val(),
                        TaskTitle: $('#TaskTitle').val(),
                        TeacherName: $('#TeacherName').val(),
                        description: $('#5').val(),
                        Piority: $('input[name="Piority"]:checked').val(),
                        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
                    };
                    chk = true;
                    var unique = true;
                    for (let i = 0; i < Tasks.length; i++) {
                        if (Tasks[i].TaskID == TaskData.TaskId) {
                            unique = false;
                            break;
                        }
                    }
                    if (TaskData.TaskId == '') {
                        alert("Task id is empty");
                        chk = false;
                    }
                    else if (!unique) {
                        alert("This id is exist, try another id");
                        chk = false;
                    }
                    else if (TaskData.TaskTitle == '') {
                        alert("Task title is empty");
                        chk = false;
                    }
                    else if (TaskData.TeacherName == '') {
                        alert("Teacher name is empty");
                        chk = false;
                    }
                    else if (TaskData.description == '') {
                        alert("Description is empty");
                        chk = false;
                    }
                    else if (TaskData.Piority == '') {
                        alert("Choose piority!");
                        chk = false;
                    }
                    if (chk) {
                        $.ajax({
                            type: 'POST',
                            url: "/createTask",
                            data: TaskData,
                            dataType: 'json',
                            success: function (response) {
                                alert(response.msg);
                                window.location.href = "http://127.0.0.1:8000/signup/Login.html/AdminHome.html";
                            }
                        });
                    }
                    else
                        alert("Cannot add task, try again!");
                });
            }
        }, 5000)
    )
})