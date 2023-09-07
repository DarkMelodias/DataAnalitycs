from django.urls import path
from Computadores import views
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),  # Agregar una barra diagonal al final
    
    path('computador/', views.ComputadoresApi),
    path('computador/<int:id>/', views.ComputadoresApi),
]

