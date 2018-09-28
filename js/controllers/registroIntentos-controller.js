


IdentiApp.controller("registroIntentosController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaId = $routeParams.EmpId;
    $scope.nomEmpresa = $routeParams.nomEmp
    $scope.jsonPuntajesRes = []
    $scope.idSelectRes = 0
    $scope.resultadoTotalRes = 0

    this.ListRegistros = []

    this.cargarListaRegistros = function () {

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            "id_empresa": $scope.empresaId,
            'token': ''
        }
      
        var url =  $rootScope.baseUri + "/diagnostico/intentos";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListRegistros = json.data.Intentos;  
            console.log(Ctrl.ListRegistros)
            if(Ctrl.ListRegistros.length == 0){

                swal("info", 'No se registra intentos', "info")
                $location.path('/home');   
            }

        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    this.pruebaResumenIntento = function(idIntento){
        $scope.jsonPuntajesRes = []
        $scope.idSelectRes = idIntento
        $scope.resultadoTotalRes = 0
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            "id_intento": idIntento,
            'token': ''
        }
      
        var url =  $rootScope.baseUri + "/diagnostico/p_cat";
        var Ctrl = this;
        var success = function (json) {
            
         
            $scope.jsonPuntajesRes = json.data.categoria_puntaje;
         
            $scope.resultadoTotalRes = json.data.resultado
            $('#exampleModal').modal('show');
            

        };
        var error = function (resp) {
            console.log("Error: " + resp);           
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        

    }

 
    this.cargarListaRegistros();
}
]); 