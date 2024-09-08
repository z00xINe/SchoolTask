from django.contrib import admin
from .models import Task, UserName

admin.site.register(Task)
admin.site.register(UserName)