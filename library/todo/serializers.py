from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import *


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'name', 'repo_link', 'users', 'pk']


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
