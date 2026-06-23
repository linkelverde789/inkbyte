from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

from lists.models import List

# Create your models here.


class User(AbstractUser):

    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
    )
