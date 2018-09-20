


IdentiApp.controller("crearVisitaController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaId = $routeParams.EmpId;
    $scope.comentario = ''
    $scope.categoria  = ''

    $scope.enviarVista = function(){
        
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'id_empresa':  $scope.empresaId ,
            "comentario":  $scope.comentario,
            "id_categoria": $scope.categoria ,
            'token': '' 
        }
        var url = $rootScope.baseUri + "/pruebas_back/visitas/crear";

        var success = function (json) {
            console.log(json)
            swal("info", 'Se creo visita', "success");
         
            $scope.comentario = ''
            $scope.categoria  = ''
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };
        Enviar.elemento($scope, url, success, error, jsonEnvio);


    }

 

}
]); 