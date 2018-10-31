


IdentiApp.controller("crearEmpresaController", ['$http','Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function ( $http ,Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaJson= {};
    $scope.contactoJson= {};
    $scope.paises= []
    $scope.jsonContactos = []

    $scope.botCrear = true;

    $http.get('js/services/paises.json').then(function(data) {       
    
        $scope.paises= data.data;
     });

    $http.get('js/services/RazonesSociales.json').then(function(data) {       
        $scope.razonesSociales = data.data;
        $(".js-example-data-array").select2({
            data: data.data
          })
     });    
    //  jQuery( "#datepicker" ).datepicker({
    //     dateFormat: "dd/mm/yy"     

    //  });  
     jQuery('form[id="formContacto"]').validate({ // initialize the plugin
        rules: {
           
            nombre: {
                required: true,
         
            },
            p_apellido: {
                required: true,
         
            },
            s_apellido: {
                required: true,
         
            },
            tipo_doc: {
                required: true,
         
            },
            documento: {
                required: true,
                number: true
            },
            genero: {
                required: true,
         
            },
            fec_nacimiento: {
                required: true,
         
            },
            pais: {
                required: true,
         
            },
            depto: {
                required: false,
         
            },
            mcipio: {
                required: false,
         
            },
            direccion: {
                required: true,
         
            },
            celular: {
                required: true,
                number: true
            },
            fijo: {
                required: true,
                number: true
            },
            correo: {
                required: true,
                email: true
         
            },
            nivel_estudio: {
                required: true,
         
            },  
            ocupacion: {
                required: true,
         
            }, 
            cargo: {
                required: true,
         
            }
        },
        
        submitHandler: function (form) { // for demo
       
            return false; // for demo
        }
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
            ciudad: {
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


    $scope.AddContacto = function(json){        
        if (jQuery('form[id="formContacto"]').valid()) {  
            json.correo = $rootScope.user.correo;
            json.token = '';
            $scope.jsonContactos.push(json);
            $scope.contactoJson= {};           
            swal("info", 'Se creo Contacto', "success");     
        }
    }

    $scope.enviarEmpresa = function(){
        
        $scope.empresaJson.ciu  = $(".js-example-data-array").val();
        $scope.empresaJson.correo = $rootScope.user.correo;
        $scope.empresaJson.ccit= 0;
        $scope.empresaJson.token = ''

        


        var url = $rootScope.baseUri + "/empresas/crear";

        var success = function (json) {
            
            swal("info", 'Se creo Empresa', "success");         
            $scope.empresaJson= {};
            $scope.enviarContacto(json.data.empresa.id_empresa);            
            // $scope.enviarContacto()
            // $scope.jsonContactos = []    
            // $scope.contactoJson= {};
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };
        if (jQuery('form[id="formEmpresa"]').valid()) {  
            if ($scope.jsonContactos.length > 0) {
                Enviar.elemento($scope, url, success, error, $scope.empresaJson);
            } else {
                swal("info", 'Inserte un contacto', "info")
            }
         
        }

    }


    $scope.enviarContacto = function(idEmpresa){



        var url = $rootScope.baseUri + "/contactos/crear";
        var success = function (json) {
                 
            
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio Contacto', "info")
        };        
        
        for (let index = 0; index < $scope.jsonContactos.length; index++) {
           
            var jsonEnvio = $scope.jsonContactos[index]
            jsonEnvio.id_empresa = idEmpresa

            Enviar.elemento($scope, url, success, error, jsonEnvio);
        }    
        
        $scope.jsonContactos = []    
        $scope.contactoJson= {};

    }
  
    $scope.EliminarJsonContactos = function(ind){
        $scope.jsonContactos.splice(ind, 1);        

    }
   


}
]); 