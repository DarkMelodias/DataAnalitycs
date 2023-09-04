from django.db import models

class Computador(models.Model):
    ComputadorId = models.IntegerField(primary_key=True, blank=False, null=False, unique=True)
    ComputadorSerial = models.IntegerField(blank=True, null=True)
    ComputadorMarca = models.CharField(max_length=50)
