from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from django.http import HttpRequest
from rest_framework_simplejwt.authentication import JWTAuthentication
from document.models import Document
from document.serializers import DocumentSerializer, GetDocumentsSerializer
from rest_framework import status
# Create your views here.

class TestAPIview(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        documents = Document.objects.filter(user_id=request.user.id)

        serialized = DocumentSerializer(documents, many=True)
        return Response(data=serialized.data)

class CreateDocumentAPIView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    # serializer_class=
    def post(self, request, *args, **kwargs):
        # Create a new document
        request.data['user_id'] = request.user.id
        print(request.data)
        serializer = DocumentSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetDocumentsAPIView(GenericAPIView):
    authentication_classes = (JWTAuthentication,)
    # serializer_class=
    def get_query_params(self):
        return self.request.query_params.get('parentDocument_id', None)
        
    def get(self, request: HttpRequest, *args, **kwargs):
        # Create a new document
        request.data['user_id'] = request.user.id
        request.data['parentDocument_id'] = self.get_query_params()
        serializer = GetDocumentsSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            print(serializer.data)
            documents = Document.objects.filter(user = serializer.data['user_id'], parentDocument=serializer.data['parentDocument_id'])
            serialized_data = DocumentSerializer(documents, many=True)
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)