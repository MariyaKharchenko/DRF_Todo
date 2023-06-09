"""todo_master URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView

from userapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet, TodoModelViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='todo_master',
        default_version='2.0',
        description='Todo_project',
        license=openapi.License(name='MT')
    ),
    public=True
)

router = DefaultRouter()
router.register('userapp', UserModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', TodoModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

    path('swagger<str:format>', schema_view.without_ui()),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    path('',TemplateView.as_view(template_name='index.html')),
]