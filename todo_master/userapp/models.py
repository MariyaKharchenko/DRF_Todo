from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    is_superuser = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    def __str__(self):
        return self.username