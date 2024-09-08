$(document).ready(function () {
    setInterval(
        function () {
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
                    window.localStorage.tasks = JSON.stringify(Tasks);
                    var radio = document.getElementsByName("Piority");
                    let pr = window.localStorage.p;
                    if (pr == "All")
                        radio[0].checked = true;
                    else if (pr == "Low")
                        radio[1].checked = true;
                    else if (pr == "Medium")
                        radio[2].checked = true;
                    else if (pr == "High")
                        radio[3].checked = true;
                    Tasks.forEach(t => {
                        var task = document.getElementById(`t${t.TaskID}`);
                        if (task) {
                            task.remove();
                        }
                    });
                    if (Tasks.length > 0) {
                        var parent = document.querySelector(".ava_tasks");
                        Tasks.forEach(task => {
                            if (task.Complete && (task.Piority == pr || pr == "All")) {
                                var NewTask = document.createElement("div");
                                NewTask.className = "task";
                                NewTask.id = `t${task.TaskID}`;
                                NewTask.innerHTML = `
                                <h4>${task.Title}${task.TaskID}</h4>
                                <p>${task.Description}</p>`;
                                parent.appendChild(NewTask);
                                var buttons = document.createElement("div");
                                buttons.className = "buttons";
                                var completeButton = document.createElement("button");
                                completeButton.textContent = "Not Complete";
                                completeButton.type = "button";
                                completeButton.onclick = function () {
                                    NotCompleted(task.TaskID);
                                };
                                var ViewButton = document.createElement("button");
                                ViewButton.textContent = "View Details";
                                ViewButton.type = "button";
                                ViewButton.onclick = function () {
                                    pass(task.TaskID);
                                    window.location.href = "ViewDetailsTask.html";
                                };
                                buttons.appendChild(ViewButton);
                                buttons.appendChild(completeButton);
                                NewTask.appendChild(buttons);
                            }
                        });
                    }
                }
            })
        }, 3500)
});

function pass(id) {
    window.localStorage.targetId = id;
}

function pi(i) {
    if (i == 0)
        window.localStorage.p = "All";
    else if (i == 1)
        window.localStorage.p = "Low";
    else if (i == 2)
        window.localStorage.p = "Medium";
    else if (i == 3)
        window.localStorage.p = "High";
}

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

function NotCompleted(id) {
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "/notCompleteTask",
        data: { task_id: id },
        dataType: 'json',
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            alert(response.msg);
        }
    });
}