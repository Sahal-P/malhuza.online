from django.db import models, transaction
from authentication.models import User
import uuid
from django.utils import timezone


# Create your models here.
# https://chat.openai.com/share/eaa86813-596f-41a9-82ed-b68314d8812c

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_index=True)
    title = models.CharField(max_length=355, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', db_index=True)
    parentDocument = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, db_index=True)
    content = models.TextField(null=True, blank=True)
    coverImage = models.CharField(max_length=500, null=True, blank=True)
    coverImageBlurHash = models.CharField(max_length=150, null=True, blank=True)
    icon = models.CharField(max_length=500, null=True, blank=True)
    isArchived = models.BooleanField(default=False)
    isPublished = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    @transaction.atomic
    def update_archived_status_recursive(self, isArchived):
        try:
            self.isArchived = isArchived
            self.save()

            children = Document.objects.filter(parentDocument=self)
            for child in children:
                child.update_archived_status_recursive(isArchived)
        except Exception as e:
            raise e
        
    @transaction.atomic
    def restore_archived_status_recursive(self):
        try:
            self.update_archived_status_recursive(False)  
            self.restore_archived_parent_recursive()
        except Exception as e:
            raise e
        
    @transaction.atomic
    def restore_archived_parent_recursive(self):
        try:
            if self.parentDocument_id is not None:
                parent = Document.objects.get(id=self.parentDocument_id)
                parent.isArchived = False
                parent.save()
                parent.restore_archived_parent_recursive()
        except Document.DoesNotExist:
            # Handle the case where the parent document does not exist
            pass
        except Exception as e:
            raise e
    
    @transaction.atomic
    def delete_recursive(self):
        try:
            children = Document.objects.filter(parentDocument=self)
            for child in children:
                child.delete_recursive()
            self.delete()
            
        except Exception as e:
            raise e