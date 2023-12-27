from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    GetDocumentsSerializer,
    ArchiveDocumentSerializer,
    SideBarDocumentSerializer,
    DocumentSerializer,
)
from .models import Document
from rest_framework.exceptions import APIException

class YourView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user_id = request.user.id
            filter_type = self.get_query_params("filter_type")
            parent_document_id = self.get_query_params("parentDocument_id")
            document_id = self.get_query_params("id")

            filter_mappings = {
                "Archive": self.get_archive_documents,
                "Sidebar": self.get_sidebar_documents,
                "ById": self.get_document_by_id,
                "default": self.get_default_documents,
            }

            selected_filter = filter_mappings.get(filter_type, filter_mappings["default"])
            documents, serialized_data = selected_filter(user_id, parent_document_id, document_id)

            return Response(data=serialized_data.data, status=status.HTTP_200_OK)

        except Exception as e:
            raise APIException(str(e), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"detail": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_archive_documents(self, user_id, *args, **kwargs):
        documents = Document.objects.filter(user=user_id, isArchived=True).only("id", "title", "icon")
        serialized_data = ArchiveDocumentSerializer(documents, many=True)
        return documents, serialized_data

    def get_sidebar_documents(self, user_id, parent_document_id, *args, **kwargs):
        documents = Document.objects.filter(
            user=user_id,
            parentDocument=parent_document_id,
            isArchived=False,
        ).exclude(coverImage=True, content=True).order_by('createdAt')
        serialized_data = SideBarDocumentSerializer(documents, many=True)
        return documents, serialized_data

    def get_document_by_id(self, user_id, *args, **kwargs):
        if kwargs.get("document_id") is None:
            raise APIException("id required as query param")
        document = Document.objects.get(user=user_id, id=kwargs["document_id"])
        serialized_data = DocumentSerializer(document)
        return document, serialized_data

    def get_default_documents(self, user_id, parent_document_id, *args, **kwargs):
        documents = Document.objects.filter(
            user=user_id,
            parentDocument=parent_document_id,
            isArchived=False,
        ).order_by('createdAt')
        serialized_data = DocumentSerializer(documents, many=True)
        return documents, serialized_data
