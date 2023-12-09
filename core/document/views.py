from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.exceptions import APIException
from document.constants import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from document.models import Document
from document.serializers import (
    DocumentSerializer,
    GetDocumentsSerializer,
    CreateDocumentSerializer,
)
from rest_framework import status


class DocumentsAPIView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)

    def get_query_params(self, param):
        return self.request.query_params.get(param, None)

    def get(self, request: Request, *args, **kwargs):
        try:
            request.data["user_id"] = request.user.id
            request.data["parentDocument_id"] = self.get_query_params(
                "parentDocument_id"
            )
            request.data["filter_type"] = self.get_query_params("filter_type")
            serializer = GetDocumentsSerializer(data=request.data)

            if serializer.is_valid(raise_exception=True):
                if request.data["filter_type"] == "Archive":
                    documents = Document.objects.filter(
                        user=serializer.data["user_id"], isArchived=True
                    )
                else:
                    documents = Document.objects.filter(
                        user=serializer.data["user_id"],
                        parentDocument=serializer.data["parentDocument_id"],
                        isArchived=False,
                    )
                serialized_data = DocumentSerializer(documents, many=True)
                return Response(serialized_data.data, status=status.HTTP_200_OK)
        except:
            raise APIException("Error occured")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request: Request, *args, **kwargs):
        try:
            request.data["user_id"] = request.user.id
            serializer = CreateDocumentSerializer(data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            raise APIException("Error occured during creation")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request: Request, *args, **kwargs):
        try:
            _id = request.data["id"]
            document: Document = get_object_or_404(Document, id=_id)
            if request.data["type"] == "Archive":
                document.update_archived_status_recursive(True)
            if request.data["type"] == "Restore":
                document.restore_archived_status_recursive()
        except:
            raise APIException("Error occured during updation")

        return Response(data={_id}, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request: Request, *args, **kwargs):
        try:
            _id = self.get_query_params("id")
            document: Document = get_object_or_404(Document, id=_id)
            document.delete_recursive()
        except:
            raise APIException("Error occured during deletion")
        return Response(data={_id}, status=status.HTTP_204_NO_CONTENT)
