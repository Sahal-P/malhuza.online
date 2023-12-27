from rest_framework import exceptions, serializers
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed, APIException
from django.contrib.auth import get_user_model
from document.models import Document

class ArchiveDocumentSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Document
        fields = ('id', 'title','icon', 'isArchived', 'isPublished')

class UpdateDocumentSerializer(serializers.ModelSerializer):    
    id = serializers.UUIDField()
    class Meta:
        model = Document
        fields = ('id', 'title','icon', 'coverImageBlurHash', 'coverImage')

class SideBarDocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField()
    
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parentDocument_id','icon', 'isArchived', 'isPublished', 'createdAt')

class DocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField()
    
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parentDocument_id', 'content', 'coverImage', 'coverImageBlurHash', 'icon', 'isArchived', 'isPublished', 'createdAt')

class CreateDocumentSerializer(DocumentSerializer):
    parentDocument_id = serializers.CharField(allow_null=True, required=False)

class GetDocumentsSerializer(CreateDocumentSerializer):
    class Meta:
        model = Document
        fields = ('user_id', 'parentDocument_id')
        