


IdentiApp.controller("diagnosticoEmpresaController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      
    $scope.nombreEmpresa =    sessionStorage.emprDiag;
    $scope.empresaId = $routeParams.EmpId;
    
    $scope.diagnostico = $rootScope.diagnostico
    $scope.camara_Comercio = $rootScope.camara_Comercio
    $scope.jsonPreguntasRespuestas = []


    $scope.lstPreguntas= function(){
        
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'id_diagnostico': $scope.diagnostico ,           
            'token': '' 
        }
        var url = $rootScope.baseUri + "/diagnostico/listar_p";

        var success = function (json) {
           

            $scope.jsonPreguntasRespuestas = json.data.Preguntas
        };
        var error = function (resp) {    
            console.log(resp)           
            $location.path('/home');       
            swal("info", 'Error en el servicio', "info")
        };
        Enviar.elemento($scope, url, success, error, jsonEnvio);


    }

    $scope.sumaTotal = 0;

    $scope.endDiagnostic = function(){

        for (let index = 0; index <  $scope.jsonPreguntasRespuestas.length; index++) {

            $scope.sumaTotal =  $scope.sumaTotal  +  parseInt(  jQuery('input[name=radio_'+  $scope.jsonPreguntasRespuestas[index].id_pregunta    +']:checked').val()) ; 
           
        }

      
        $scope.resultadoFinal =  ( $scope.sumaTotal * 100) /  ($scope.jsonPreguntasRespuestas.length * 100) 
        $scope.resultadoFinal =  Math.round($scope.resultadoFinal);
        $scope.registrarIntento($scope.resultadoFinal);
        // $scope.sumaTotal = 0
    }

    $scope.registrarRespuestas= function(idIntento){
        // {"correo":"criosmon2345@universidadean.edu.co","id_intento":"1","token":"","respuestas":[{"id_respuesta":"2"},{"id_respuesta":"4"}]}
        var arryRespuestas = []
        for (let index = 0; index <  $scope.jsonPreguntasRespuestas.length; index++) {

             let str = jQuery('input[name=radio_'+  $scope.jsonPreguntasRespuestas[index].id_pregunta    +']:checked')[0].id   ; 
             let respuestaSplit = str.split("_")[0];
             arryRespuestas.push({'id_respuesta': respuestaSplit })
        }

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'id_intento': idIntento ,           
            'token': '' ,
            'respuestas' : arryRespuestas
        }
     

        var url = $rootScope.baseUri + "/diagnostico/grabar_respuestas";

        var success = function (json) {
            console.log(json)
            swal("info", 'Se grabaron respuestas correctamente', "success")
            $location.path('/home');   
        };
        var error = function (resp) {    
            console.log(resp)           
            $location.path('/home');       
            swal("info", 'Error en el servicio(Registro Intento)', "info")
        };
         Enviar.elemento($scope, url, success, error, jsonEnvio);


    }

    $scope.registrarIntento= function(sumaTotal){
       
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'resultado': sumaTotal , 
            "id_empresa"  :$scope.empresaId,
            'token': '' 
        }
        var url = $rootScope.baseUri + "/diagnostico/reg_intento";

        var success = function (json) {
          
            $scope.idIntento = json.data.intento.id_intento;
            $scope.registrarRespuestas( $scope.idIntento)

            $scope.sumaTotal = 0;          
        };
        var error = function (resp) {    
            console.log(resp)           
            $location.path('/home');       
            swal("info", 'Error en el servicio(Registro Intento)', "info")
        };
        Enviar.elemento($scope, url, success, error, jsonEnvio);


    }

    
    $scope.lstPreguntas();

}
]); 