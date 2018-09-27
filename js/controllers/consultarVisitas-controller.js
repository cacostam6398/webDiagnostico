


IdentiApp.controller("consultarVisitasController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaId = $routeParams.EmpId;
    $scope.nomEmpresa = $routeParams.nomEmp




    this.ListRegistros = []

    this.cargarListaRegistros = function () {

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            "id_empresa": $scope.empresaId,
            'token': ''
        }
      
        var url =  $rootScope.baseUri + "/visitas/listar";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListRegistros = json.data.Visita;            
            if(Ctrl.ListRegistros.length == 0){
                swal("info", 'No se registra Visitas', "info")
                $location.path('/home');   
            }

        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

 
    this.cargarListaRegistros();
}
]); 