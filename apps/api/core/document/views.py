from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.exceptions import APIException
from common.types import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from document.models import Document
from document.serializers import (
    DocumentSerializer,
    GetDocumentsSerializer,
    CreateDocumentSerializer,
    SideBarDocumentSerializer,
    ArchiveDocumentSerializer,
    UpdateDocumentSerializer
)
from rest_framework import status


class DocumentsAPIView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)

    def get_query_params(self, param: str):
        return self.request.query_params.get(param, None)

    def get(self, request: Request, *args, **kwargs):
        try:
            request.data["user_id"] = request.user.id
            request.data["parent_document_id"] = self.get_query_params(
                "parent_document_id"
            )
            request.data["filter_type"] = self.get_query_params("filter_type")
            serializer = GetDocumentsSerializer(data=request.data)

            if serializer.is_valid(raise_exception=True):
                if request.data["filter_type"] == "Archive":
                    documents = Document.objects.filter(
                        user=serializer.data["user_id"], is_archived=True
                    ).only("id", "title", "icon")
                    serialized_data = ArchiveDocumentSerializer(documents, many=True)
                    return Response(
                        data=serialized_data.data, status=status.HTTP_200_OK
                    )

                elif request.data["filter_type"] == "Sidebar":
                    documents = Document.objects.filter(
                        user=serializer.data["user_id"],
                        parent_document=serializer.data["parent_document_id"],
                        is_archived=False,
                    ).exclude(cover_image=True, content=True).order_by('created_at')
                    serialized_data = SideBarDocumentSerializer(documents, many=True)
                    return Response(
                        data=serialized_data.data, status=status.HTTP_200_OK
                    )

                elif request.data["filter_type"] == "ById":
                    _id = self.get_query_params("id")
                    if _id is None:
                        raise APIException("id required as query param")
                    document = Document.objects.get(
                        user=serializer.data["user_id"],
                        id=_id,
                    )
                    serialized_data = DocumentSerializer(document)
                    return Response(
                        data=serialized_data.data, status=status.HTTP_200_OK
                    )

                else:
                    documents = Document.objects.filter(
                        user=serializer.data["user_id"],
                        parent_document=serializer.data["parent_document_id"],
                        is_archived=False,
                    ).order_by('created_at')
                serialized_data = DocumentSerializer(documents, many=True)
                return Response(data=serialized_data.data, status=status.HTTP_200_OK)

        except Exception as e:
            raise e
            # raise APIException("Error occured")

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
            _id: str = request.data["id"]
            document: Document = get_object_or_404(Document, id=_id)
            if request.data["type"] == "Archive":
                document.update_archived_status_recursive(True)
            if request.data["type"] == "Restore":
                document.restore_archived_status_recursive()
            if request.data["type"] == "CoverImage":
                image = request.data["image"]
                document.cover_image = image
                document.save()
                data = {"presigned_url": image}
                return Response(data=data, status=status.HTTP_200_OK)

        except:
            raise APIException("Error occured during updation")

        return Response(data={_id}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, *args, **kwargs):
        try:
            data = request.data['document']
            document_instance = Document.objects.get(id=data['id'])
            serializer = UpdateDocumentSerializer(instance=document_instance, data=data, partial=True )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            
            print(serializer.data)
        except:
            raise APIException("Error occured during updation")

        return Response(status=status.HTTP_200_OK)

    def delete(self, request: Request, *args, **kwargs):
        try:
            _id: str = self.get_query_params("id")
            document: Document = get_object_or_404(Document, id=_id)
            document.delete_recursive()
        except:
            raise APIException("Error occured during deletion")
        return Response(data={_id}, status=status.HTTP_204_NO_CONTENT)
