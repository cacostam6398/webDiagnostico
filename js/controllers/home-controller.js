


IdentiApp.controller("HomeController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {



    $scope.initSelect2 = function(){
        $('.js-example-basic-single').select2();
    }
 

    $rootScope.GoCrearVisita = function(){   
        
        var empresaId = $(".js-example-basic-single").val();
        console.log(empresaId)
        $location.path('/crearVisita/'+empresaId);
    }

    $rootScope.GoCrearEmpresa = function(){        
        $location.path('/crearEmpresa');
    }

    $rootScope.GoDiagnostico = function(){    
        var empresaId = $(".js-example-basic-single").val();
        console.log(empresaId)    
        $location.path('/diagnosticoEmpresa/'+empresaId);
    }
    


    this.ListSyllabus = []

    this.cargarListaEmpresas = function () {

        var jsonEnvio = {
            'id_usuario': $rootScope.user.id_usuario,
            'token': $rootScope.token
        }
        var url = $rootScope.baseUri + "/restapi-syllabusean/public/usuarios/listarsyl";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListSyllabus = json.data.Syllabus;
        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    //  this.cargarListaSyllabus();

    $scope.initSelect2();
}
]); 