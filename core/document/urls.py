
from django.urls import path
from document import views

urlpatterns = [
    path('', views.TestAPIview.as_view()),
    
]
