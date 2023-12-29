from rest_framework import exceptions, serializers
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed, APIException
from django.contrib.auth import get_user_model
from document.models import Document

class ArchiveDocumentSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Document
        fields = ('id', 'title','icon', 'is_archived', 'is_published')

class UpdateDocumentSerializer(serializers.ModelSerializer):    
    id = serializers.UUIDField()
    class Meta:
        model = Document
        fields = ('id', 'title','icon', 'cover_image_blurhash', 'cover_image')

class SideBarDocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField()
    
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parent_document_id','icon', 'is_archived', 'is_published', 'created_at')

class DocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField()
    
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parent_document_id', 'content', 'cover_image', 'cover_image_blurhash', 'icon', 'is_archived', 'is_published', 'created_at')

class CreateDocumentSerializer(DocumentSerializer):
    parent_document_id = serializers.CharField(allow_null=True, required=False)

class GetDocumentsSerializer(CreateDocumentSerializer):
    class Meta:
        model = Document
        fields = ('user_id', 'parent_document_id')
        