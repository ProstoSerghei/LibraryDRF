from rest_framework.serializers import HyperlinkedModelSerializer

from .models import *


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['url', 'name', 'repo_link', 'users', 'pk']


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ['url', 'text', 'created', 'updated',
                  'project', 'user', 'pk']
