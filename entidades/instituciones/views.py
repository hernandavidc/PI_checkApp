from .models import Inscrito, Institucion, Programa
from django.http import JsonResponse

def getUsuarios(request):
    users = Inscrito.objects.all()
    data = list(users.values("id","nombre"))
    return JsonResponse(data, safe=False)

def getUsuariosByInstitucion(request, slug):
    entidad = Institucion.objects.get(slug=slug)
    data = list(entidad.get_inscritos.values("id","nombre"))
    return JsonResponse(data, safe=False)

def getUsuarioDetail(request, pk):
    inscrito = Inscrito.objects.filter(idEntidad=pk)
    if not inscrito:
        return JsonResponse(status=404, data={'status':'false','message':'Id no encontrado'})
    else:
        data = [{'id': inscrito[0].idEntidad, 'name': inscrito[0].nombre, 'programa': inscrito[0].programas.nombre}]
        return JsonResponse(data, safe=False)
