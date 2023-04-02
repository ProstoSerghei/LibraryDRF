import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User as djangoUser
from .views import UserModelViewSet
from .models import User

# Create your tests here.


class TestUserModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'user_name': 'LoLKeK', 
            'first_name': 'Django',
            'last_name': 'Framework',
            'email': 'drf@drf.drf'
            }, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {
            'user_name': 'LoLKeK', 
            'first_name': 'Django',
            'last_name': 'Framework',
            'email': 'drf@drf.drf'
            }, format='json')
        admin = djangoUser.objects.create_superuser('serghei', 'serghei@serghei.ru', 'serghei')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_guest(self):
        user = User.objects.create(
            user_name='LoLKeK', 
            first_name='Django',
            last_name='Framework',
            email='drf@drf.drf'
        )
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_admin(self):
        user = User.objects.create(
            user_name='LoLKeK', 
            first_name='Django',
            last_name='Framework',
            email='drf@drf.drf'
        )
        client = APIClient()
        admin = djangoUser.objects.create_superuser('serghei', 'serghei@serghei.ru', 'serghei')
        client.login(username='serghei', password='serghei')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class TestUserModelViewSetAPITestCase(APITestCase):
    
    def test_get_detail_admin(self):
        user = User.objects.create(
            user_name='LoLKeK', 
            first_name='Django',
            last_name='Framework',
            email='drf@drf.drf'
        )
        admin = djangoUser.objects.create_superuser('serghei', 'serghei@serghei.ru', 'serghei')
        self.client.login(username='serghei', password='serghei')
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_detail_mixer_admin(self):
        user = mixer.blend(User)
        admin = djangoUser.objects.create_superuser('serghei', 'serghei@serghei.ru', 'serghei')
        self.client.login(username='serghei', password='serghei')
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)