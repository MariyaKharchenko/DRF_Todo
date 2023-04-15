from django.db import models
from userapp.models import User

class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    file_link = models.URLField(max_length=200, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_todo = models.TextField()
    date_create = models.DateField(auto_now_add=True)
    date_update = models.DateField(auto_now=True)
    user_creator = models.ForeignKey(User, on_delete=models.PROTECT)
    closed = models.BooleanField(default=False)





