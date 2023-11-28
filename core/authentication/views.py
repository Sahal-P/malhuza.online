from django.shortcuts import render
from django.http import JsonResponse
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT
from authentication.serializers import GoogleSocialAuthSerializer, CustomUserSerializer, LogoutSerializer
# Create your views here.
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserSerializer
    
class GoogleSocialAuthView(GenericAPIView):

    serializer_class = GoogleSocialAuthSerializer

    def post(self, request):
        """

        POST with "auth_token"

        Send an idtoken as from google to get user information

        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=HTTP_200_OK)

class LogoutAPIView(GenericAPIView):
    serializer_class = LogoutSerializer

    authentication_classes = (JWTAuthentication,)
    
    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=HTTP_204_NO_CONTENT)

class TestAPIview(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        print(request.user)
        return JsonResponse({'test_api': "test"})