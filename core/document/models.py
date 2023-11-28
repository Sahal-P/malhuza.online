from django.db import models
from authentication.models import User
# Create your models here.

class Documents(models.Model):
    title = models.CharField(max_length=255, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')