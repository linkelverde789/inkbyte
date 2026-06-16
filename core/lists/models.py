from django.db import models

# Create your models here.

class List(models.Model):
    name = models.CharField(max_length=200)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)