
from django.urls import path
from authentication import views
from authentication.views import GoogleSocialAuthView, CustomUserDetailsView

urlpatterns = [
    path('', views.TestAPIview.as_view()),
    path("register/", views.RegisterView.as_view(), name="rest_register"),
    path("login/", views.LoginView.as_view(), name="rest_login"),
    path("logout/", views.LogoutAPIView.as_view(), name="rest_logout"),
    path("user/", views.CustomUserDetailsView.as_view(), name="rest_user_details"),
    path("users/", views.CustomUsersDetailsView.as_view(), name="rest_users_details"),
    path("token/verify/", views.TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", views.get_refresh_view().as_view(), name="token_refresh"),
    path("google/", GoogleSocialAuthView.as_view(), name="google_login"),
]
