from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

class TestAPIview(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        print(request.user)
        return JsonResponse({'test_api': "test"})