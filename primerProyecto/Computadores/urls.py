from django.urls import path
from Computadores import views
from django.contrib import admin


urlpatterns = [
    path('admin', admin.site.urls),
    path('computador/', views.ComputadoresApi)
]
