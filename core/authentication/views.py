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
from rest_framework.status import HTTP_200_OK
from authentication.serializers import GoogleSocialAuthSerializer, CustomUserSerializer
# Create your views here.
from rest_framework_simplejwt.authentication import JWTAuthentication

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/api/auth/google/callback/"
    client_class = OAuth2Client
    
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

class TestAPIview(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        print(request.user, '00000000000000000')
        return JsonResponse({'test_api': "test"})