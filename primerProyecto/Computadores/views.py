from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Computador
from .serializers import ComputadorSerializer
from django.http import HttpResponseNotFound

@csrf_exempt
def ComputadoresApi(request, id=None):
    if request.method == 'GET':
        computadores = Computador.objects.all()
        computador_serializer = ComputadorSerializer(computadores, many=True)
        return JsonResponse(computador_serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        computador_serializer = ComputadorSerializer(data=data)
        if computador_serializer.is_valid():
            computador_serializer.save()
            return JsonResponse("Computador Guardado", safe=False)
        return JsonResponse(computador_serializer.errors, status=400)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        try:
            computador = Computador.objects.get(ComputadorId=data["ComputadorId"])
            computador_serializer = ComputadorSerializer(computador, data=data)
            if computador_serializer.is_valid():
                computador_serializer.save()
                return JsonResponse("Computador Actualizado", safe=False)
            return JsonResponse(computador_serializer.errors, status=400)
        except Computador.DoesNotExist:
            return JsonResponse("El Computador no existe", status=404)
    elif request.method == 'DELETE':
        try:
            computador = Computador.objects.get(ComputadorId=id)
            computador.delete()
            return JsonResponse("Computador Eliminado", safe=False)
        except Computador.DoesNotExist:
            return JsonResponse("El Computador no existe", status=404)