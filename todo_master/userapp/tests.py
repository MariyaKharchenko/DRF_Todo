import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from userapp.views import UserModelViewSet
from userapp.models import User
from todoapp.models import Project



class TestUserModelViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = '1'
        self.email = 'admin@mail.ru'
        self.data = {'username': 'sidor', 'first_name': 'Sidor', 'last_name': 'Sidorov', 'email': 'sidor@mail.ru'}
        self.data_put = {'username': 'sidor', 'first_name': 'Sidor', 'last_name': 'Smirnov', 'email': 'sidor@mail.ru'}
        self.url = '/api/userapp/'
        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)


    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url,self.data,format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_admin(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        auth = User.objects.get(id=user.id)
        self.assertEqual(auth.last_name, 'Smirnov')
        client.logout()

class TestProjectModelViewSet(APITestCase):
    def setUp(self) -> None:
        self.data_user1 = {'username': 'sidor', 'first_name': 'Sidor', 'last_name': 'Sidorov', 'email': 'sidor@mail.ru'}
        self.data_user2 = {'username': 'petr', 'first_name': 'Petr', 'last_name': 'Petrov', 'email': 'petr@mail.ru'}
        self.user1 = User.objects.create(**self.data_user1)
        self.user2 = User.objects.create(**self.data_user2)


    def test_put_project(self):
        self.project = Project.objects.create(name='project')
        self.user1.project_set.add(self.project)
        self.user2.project_set.add(self.project)
        self.assertEqual(self.project.users.count(), 2)


    def test_put_mixer(self):
        self.user3 = mixer.blend(User)
        self.user4 = mixer.blend(User)
        self.project = mixer.blend(Project)
        self.user3.project_set.add(self.project)
        self.user4.project_set.add(self.project)
        self.assertEqual(self.project.users.count(), 2)

    #Действительно, создавать тесты, используя mixer значительно легче и быстрее,
    # и кода гораздо меньше получается.