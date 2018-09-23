


IdentiApp.controller("crearEmpresaController", ['$http','Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function ( $http ,Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaJson= {};
  
    $http.get('js/services/RazonesSociales.json').then(function(data) {       
        $scope.razonesSociales = data.data;
        $(".js-example-data-array").select2({
            data: data.data
          })
     });  

     jQuery('form[id="formEmpresa"]').validate({ // initialize the plugin
        rules: {
           
            razon_social: {
                required: true,
         
            },
            nit: {
                required: true,
                // minlength: 5
            },
            afiliacion: {
                required: true,
                // minlength: 5
            },
            web: {
                required: true,
                // minlength: 5
            },
            repr_legal: {
                required: true,
                // minlength: 5
            },
            ger_general: {
                required: true,
                // minlength: 5
            },
            direccion: {
                required: true,
                // minlength: 5
            },
            constitucion: {
                required: true,
                // minlength: 5
            },
            ccit: {
                required: true,
                // minlength: 5
            }           

        },
        
        submitHandler: function (form) { // for demo
       
            return false; // for demo
        }
    });



    $scope.enviarEmpresa = function(){
        
        $scope.empresaJson.ciu  = $(".js-example-data-array").val();
        $scope.empresaJson.correo = $rootScope.user.correo;
        $scope.empresaJson.token = ''

        var url = $rootScope.baseUri + "/empresas/crear";

        var success = function (json) {
            console.log(json)
            swal("info", 'Se creo Empresa', "success");         
            $scope.empresaJson= {};
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };
        if (jQuery('form[id="formEmpresa"]').valid()) {  
            Enviar.elemento($scope, url, success, error, $scope.empresaJson);
        }

    }

   
}
]); 