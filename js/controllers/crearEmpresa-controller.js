


IdentiApp.controller("crearEmpresaController", ['$http','Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function ( $http ,Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaJson= {};
  
    $http.get('../web/js/services/RazonesSociales.json').then(function(data) {
       
        $scope.razonesSociales = data.data;
        $(".js-example-data-array").select2({
            data: data.data
          })

     });


    $scope.enviarEmpresa = function(){
        
        $scope.empresaJson.razon_social = $(".js-example-data-array").val();
        $scope.empresaJson.correo = $rootScope.user.correo;
        $scope.empresaJson.token = ''

        var url = $rootScope.baseUri + "/rest_diagnostico/public/empresas/crear";

        var success = function (json) {
            console.log(json)
            swal("info", 'Se creo Empresa', "success");
         
            $scope.empresaJson= {};
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };
        Enviar.elemento($scope, url, success, error, $scope.empresaJson);


    }

    $scope.GoHome = function(){     	
        $location.path('/home');
    }

}
]); 