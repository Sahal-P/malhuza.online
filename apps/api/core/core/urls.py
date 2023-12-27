from django.contrib import admin
from django.urls import path, include
from s3.views import S3PresignedUrl, BlurHash
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/docs/', include('document.urls')),
    path('api/s3/presigned-url', S3PresignedUrl.as_view(), name="s3-presigned-url"),
    path('api/s3/blurhash', BlurHash.as_view(), name="s3-blurhash"),
]
