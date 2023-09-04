from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Computadores.models import Computador
from Computadores.serializers import ComputadorSerializer

@csrf_exempt
def ComputadoresApi(request, id=0):
    if request.method == 'GET':
        computadores = Computador.objects.all()
        computador_serializer = ComputadorSerializer(computadores, many=True)
        return JsonResponse(computador_serializer.data, safe=False)
    elif request.method == 'POST':
        data =  JSONParser().parse(request)
        computador_serializer = ComputadorSerializer(data=data)
        try:
            if computador_serializer.is_valid():
                computador_serializer.save()
                return JsonResponse("Computador Guardado", safe=False)
            return JsonResponse("Error al guardar Computador", safe=False)
        except:
            return JsonResponse("Error al guardar Computador", safe=False)
    elif request.method == 'PUT':
        data =  JSONParser().parse(request)
        computador = Computador.objects.get(ComputadorId=data["ComputadorId"])
        computador_serializer = ComputadorSerializer(computador, data=data)
        if computador_serializer.is_valid():
            computador_serializer.save()
            return JsonResponse("Computador Actualizado", safe=False)
        return JsonResponse("Error al actualizar")
    elif request.method == 'DELETE':
        computador = Computador.objects.get(ComputadorId=id)
        computador.delete()
        return JsonResponse("Computador Eliminado", safe=False)

# Create your views here.
