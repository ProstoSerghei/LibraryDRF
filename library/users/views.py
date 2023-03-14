from django.shortcuts import render

from rest_framework.viewsets import mixins, GenericViewSet


from .models import User
from .serializers import UserModelSerializer
# Create your views here.


class UserModelViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

