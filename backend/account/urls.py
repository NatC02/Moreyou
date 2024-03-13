from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import api

urlpatterns = [
    
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', api.signup, name='signup'),
    path('me/', api.me, name="me"),
    path('friends/request/<uuid:pk>', api.send_friend_request, name='send_friend_request'),
    
]