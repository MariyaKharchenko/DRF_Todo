from django.core.management import BaseCommand

from userapp.models import User
from todoapp.models import Project

class Command(BaseCommand):

    def handle(self, *args, **options):

        # if User.objects.get(username='super'):
        #     pass
        # else:
        #     User.objects.create_superuser(username='super', email='super@gmail.com', password='1')
        data_user = {
            'username': 'Ivan',
            'first_name': 'Ivan',
            'last_name': 'Ivanov',
            'email': 'ivanushka@mail.ru'
        }
        user = User.objects.create(**data_user)

        # data_project = {
        #     'name': 'project3880',
        #     'file_link': '',
        #     'users': [user.id]
        # }
        project = Project.objects.create(name='project3880')
        project.users.add(user.id)