from rest_framework import serializers
from Computadores.models import Computador

class  ComputadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computador
        fields = ('ComputadorId', 'ComputadorSerial' ,'ComputadorMarca')