from django.db import models


class Task(models.Model):
    kinds = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    TaskID = models.IntegerField(null=False)
    Title = models.TextField(null=False)
    Teacher_name = models.CharField(max_length=20, null=False)
    Description = models.TextField(null=False)
    Piority = models.CharField(max_length=20, choices=kinds, null=False)
    Complete = models.BooleanField(null=True, default=False)

    def __str__(self):
        return self.Title


class UserName(models.Model):
    types = [
        ('Admin', 'Admin'),
        ('Teacher', 'Teacher'),
    ]
    User_name = models.TextField(null=False)
    Password = models.TextField(null=False)
    Phone_number = models.TextField(null=False)
    Email = models.EmailField(null=True)
    Type_of_profile = models.CharField(max_length=20, choices=types, null=False)
    About = models.TextField(null=True, blank=True)
    Login = models.BooleanField(null=True)

    def __str__(self):
        return self.User_name
