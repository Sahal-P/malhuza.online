
from django.urls import path
from document import views

urlpatterns = [
    path('', views.DocumentsAPIView.as_view()),
]
