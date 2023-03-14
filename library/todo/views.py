from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import *
from .serializers import *
from .filters import *

# Create your views here.


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter



class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.filter(is_active=True)
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        user_pk = kwargs['pk']
        instance = ToDo.objects.get(pk=user_pk)
        instance.is_active = False
        instance.save()

        serializer = self.get_serializer(instance)

        return Response(serializer.data)
        



# модель ToDo: доступны все варианты запросов; при удалении не удалять ToDo, а
# выставлять признак, что оно закрыто; добавить фильтрацию по проекту; для
# постраничного вывода установить размер страницы 20