from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from document.models import Document
from document.serializers import DocumentSerializer
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