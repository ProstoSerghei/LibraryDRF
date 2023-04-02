from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from django.contrib.auth import models
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'pk', 'user_name', 'first_name', 'last_name', 'email']


class UserAuthSerializer(ModelSerializer):
    class Meta:
        model = models.User
        fields = ['username', 'is_staff', 'is_superuser']