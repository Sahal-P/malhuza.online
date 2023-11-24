from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework import exceptions


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # token = request.COOKIES.get("access_token")
        auth = get_authorization_header(request).split()
        if auth and len(auth)==2:
            token = auth[1].decode(config("HEADER_ENCODED"))
            user = get_user(token)
            return (user, None)
        raise exceptions.AuthenticationFailed("unauthenticated")