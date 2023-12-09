from dj_rest_auth.serializers import LoginSerializer
from django.urls import exceptions as url_exceptions
from rest_framework import exceptions, serializers
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed, APIException
from . import google
from .register import register_social_user
import os
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from authentication.models import User
from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'is_verified', 'is_active', 'auth_provider','created_at', 'picture')

class CustomLoginSerializer(LoginSerializer):
    
    def _validate_email(self, email, password):
        if email and password:
            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    return user
            except User.DoesNotExist:
                raise exceptions.NotFound('Invalid email or password')
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)
    
    def get_auth_user_using_allauth(self, username, email, password):
        return self._validate_email(email, password)
    
class RegisterSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = '__all__'

class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = google.Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )

        if user_data['aud'] != "334091573966-uf7c4ubsorjvg3sp5euhdu3qdcddo9nk.apps.googleusercontent.com":

            raise AuthenticationFailed('oops, who are you?')
        user_id = user_data['sub']
        email = user_data['email']
        picture = user_data['picture']
        name = user_data['name']
        provider = 'google'

        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name, picture=picture)

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            raise APIException({
        'bad_token': ('Token is expired or invalid')
    })