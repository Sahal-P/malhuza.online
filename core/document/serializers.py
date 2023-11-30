
from rest_framework import exceptions, serializers
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed, APIException
from django.contrib.auth import get_user_model
from document.models import Document

class DocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField()
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parentDocument', 'content', 'coverImage','icon', 'isArchived', 'isPublished')

class CreateDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'title', 'user_id', 'parentDocument', 'content', 'coverImage','icon', 'isArchived', 'isPublished')