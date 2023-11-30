from django.db import models
from authentication.models import User
# Create your models here.
# https://chat.openai.com/share/eaa86813-596f-41a9-82ed-b68314d8812c

class Document(models.Model):
    title = models.CharField(max_length=355, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', db_index=True)
    parentDocument = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, db_index=True)
    content = models.TextField(null=True, blank=True)
    coverImage = models.CharField(max_length=500, null=True, blank=True)
    icon = models.CharField(max_length=500, null=True, blank=True)
    isArchived = models.BooleanField(default=False)
    isPublished = models.BooleanField(default=False)