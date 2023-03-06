from django_filters import rest_framework as filters

from .models import *


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(field_name='project__name', 
                                        to_field_name='name', 
                                        queryset=Project.objects.all())
    created = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created']
