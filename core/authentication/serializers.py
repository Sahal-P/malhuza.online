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

from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'is_verified', 'is_active', 'auth_provider','created_at', 'picture')

class CustomLoginSerializer(LoginSerializer):
    pass
    # def get_auth_user(self, username, email, password):
        # if 'allauth' in settings.INSTALLED_APPS:

        #     # When `is_active` of a user is set to False, allauth tries to return template html
        #     # which does not exist. This is the solution for it. See issue #264.
        #     try:
        #         val = self._validate_email(email, password)
        #         print(val)
        #         return val
        #     except url_exceptions.NoReverseMatch:
        #         msg = _('Unable to log in with provided credentials.')
        #         print(msg)
        # return self.get_auth_user_using_orm(username, email, password)

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