
from django.urls import path
from document import views

urlpatterns = [
    path('', views.TestAPIview.as_view()),
    path('create/', views.CreateDocumentAPIView.as_view()),
    path('child/', views.GetDocumentsAPIView.as_view()),
]
