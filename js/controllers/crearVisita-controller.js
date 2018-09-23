


IdentiApp.controller("crearVisitaController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      

    $scope.empresaId = $routeParams.EmpId;
    $scope.nomEmpresa = $routeParams.nomEmp
    this.comentario = ''
    this.categoria  = ''

    jQuery('form[id="formVisita"]').validate({ // initialize the plugin
        rules: {
           
            SelectCategoria: {
                required: true,
         
            },
            comentario: {
                required: true,
                minlength: 4
            }

        },
        messages: {
            SelectCategoria: "Este campo es requerido.",
            comentario: {
              required: "Este campo es requerido.",
              minlength: "Por favor ingrese al menos 4 caracteres."
            }
          },
        submitHandler: function (form) { // for demo
       
            return false; // for demo
        }
    });

    $scope.enviarVista = function(jsonValues){
    
        var Ctrl = this;
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'id_empresa':  $scope.empresaId ,
            "comentario":  Ctrl.crtvisCtrl.comentario,
            "id_categoria": Ctrl.crtvisCtrl.categoria ,
            'token': '' 
        }
        var url = $rootScope.baseUri + "/visitas/crear";

        var success = function (json) {
           
            swal("info", 'Se creo visita', "success");
        
            Ctrl.crtvisCtrl.comentario = ''
            Ctrl.crtvisCtrl.categoria  = ''
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };

        var valid =jQuery('#formVisita').valid()

        if (jQuery('#formVisita').valid()) {     
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
        }


    }

    this.ListCategorias = []

    this.cargarListaCategorias = function () {

        var jsonEnvio = {
            'id_usuario': $rootScope.user.correo,
            'token': ''
        }
      
        var url =  $rootScope.baseUri + "/visitas/categorias";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListCategorias = json.data.categorias;  

        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

 
    this.cargarListaCategorias();
}
]); 