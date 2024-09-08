from django.shortcuts import render, redirect
from .models import Task, UserName
from django.http import JsonResponse, HttpResponse


def Home(request):
    return render(request, 'pages/HomePage.html')


def Login(request):
    return render(request,'pages/Login.html')


def SignUp(request):
    return render(request, 'pages/SignUp.html')


def profile(request):
    if request.method == 'GET':
        for user in UserName.objects.all():
            if user.Login:
                return render(request, 'pages/ProfilePage.html')
        return render(request, 'pages/Login.html')


def Editprofile(request):
    if request.method == 'GET':
        for user in UserName.objects.all():
            if user.Login:
                return render(request, 'pages/EditProfilePage.html')
        return render(request, 'pages/Login.html')


def TeacherPage(request):
    return render(request, 'pages/TeacherPage.html')


def AvailableTasks(request):
    return render(request, 'pages/AvailableTasks.html')


def CompletedTasks(request):
    return render(request, 'pages/CompletedTasks.html')


def ViewDetails(request):
    return render(request, 'pages/ViewDetailsTask.html')


def ViewTask(request):
    return render(request, 'pages/ViewTaskTeacher.html')


def AddTask(request):
    return render(request, 'pages/AddTask.html')


def AdminHome(request):
    return render(request, 'pages/AdminHome.html', {"users":list(UserName.objects.all().values())})


def EditTask(request):
    return render(request, 'pages/EditTask.html')


def CreatedTask(request):
    return render(request, 'pages/CreatedTask.html')

def getUser(request):
    users = UserName.objects.all()
    return JsonResponse({"users":list(users.values())})

def getTask(request):
    tasks = Task.objects.all()
    return JsonResponse({"tasks":list(tasks.values())})

def createTask(request):
    if request.method == 'POST':
        Tid = request.POST.get('TaskId')
        title = request.POST.get('TaskTitle')
        teacher_name = request.POST.get('TeacherName')
        description = request.POST.get('description')
        piority = request.POST.get('Piority')
        Task(TaskID=Tid, Title=title, Teacher_name=teacher_name, Description=description, Piority=piority).save()
        return JsonResponse({"msg": "New task has just created!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def deleteTask(request):
    if request.method == 'POST':
        task_id = request.POST.get('task_id')
        task = Task.objects.get(TaskID=task_id)
        task.delete()
        return JsonResponse({"msg": "Task has just deleted!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def completeTask(request):
    if request.method == 'POST':
        task_id = request.POST.get('task_id')
        task = Task.objects.get(TaskID=task_id)
        task.Complete = True
        task.save()
        return JsonResponse({"msg": "Task has just completed!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def notCompleteTask(request):
    if request.method == 'POST':
        task_id = request.POST.get('task_id')
        task = Task.objects.get(TaskID=task_id)
        task.Complete = False
        task.save()
        return JsonResponse({"msg": "Task has just been available!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def editTask(request):
    if request.method == 'POST':
        Tid = request.POST.get('TaskId')
        for task in Task.objects.all():
            if task.TaskID == Tid:
                task.Title = request.POST.get('TaskTitle')
                task.Teacher_name = request.POST.get('TeacherName')
                task.Description = request.POST.get('description')
                task.Piority = request.POST.get('Piority')
                task.save()
                return JsonResponse({"msg": "Task has just edited!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def createProfile(request):
    if request.method == 'POST':
        username = request.POST.get('user')
        password = request.POST.get('pass')
        num = request.POST.get('num')
        As = request.POST.get('as')
        email = request.POST.get('email')
        UserName(User_name=username, Password=password, Phone_number=num, Email=email, Type_of_profile=As).save()
        return JsonResponse({"msg": "New profile has just created!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def editProfile(request):
    if request.method == 'POST':
        for user in UserName.objects.all():
            if user.Login:
                user.Phone_number = request.POST.get('num')
                user.Email = request.POST.get('email')
                user.About = request.POST.get('about')
                user.Password = request.POST.get('pass')
                user.save()
                return JsonResponse({"msg": "Profile has just edited!"})
    HttpResponse("An error occurred while processing your request, try again!!")

def loginProfile(request):
    if request.method == 'POST':
        admin = False
        teacher = False
        for i in UserName.objects.all():
            if i.User_name == request.POST.get('user') and i.Password == request.POST.get('pass') and i.Type_of_profile == request.POST.get('as') == 'Admin' and not teacher and not admin:
                i.Login = True
                i.save()
                admin = True
            elif i.User_name == request.POST.get('user') and i.Password == request.POST.get('pass') and i.Type_of_profile == request.POST.get('as') == 'Teacher' and not teacher and not admin:
                i.Login = True
                i.save()
                teacher = True
            else:
                i.Login = False
                i.save()
        return JsonResponse({"msg":"Login successfully!"})
    HttpResponse("An error occurred while processing your request, try again!!")
