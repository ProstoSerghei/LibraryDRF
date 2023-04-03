from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet


from .models import User
from .serializers import UserModelSerializer, UserAuthSerializer
from django.contrib.auth.models import User as AuthUser
# Create your views here.


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserAuthSerializer
        return UserModelSerializer
    
    def get_queryset(self):
        if self.request.version == '0.2':
            return AuthUser.objects.all()
        return User.objects.all()