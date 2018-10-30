


IdentiApp.controller("diagnosticoEmpresaRemoteController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter','$routeParams',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter,$routeParams) {
      
    $scope.nombreEmpresa =    ''
    $scope.empresaId = $routeParams.EmpId;
    $scope.Lnk = $routeParams.str;
    
    // $scope.diagnostico = $rootScope.diagnostico
    // $scope.camara_Comercio = $rootScope.camara_Comercio
    $scope.jsonPreguntasRespuestas = []


    $scope.lstPreguntas= function(){
        
        var jsonEnvio = {
            "url": $scope.Lnk         
        }
        var url = $rootScope.baseUri + "/diagnostico/link_lp";

        var success = function (json) {
           

            $scope.jsonPreguntasRespuestas = json.data.Preguntas
        };
        var error = function (resp) {    
            console.log(resp)           
            // $location.path('/home');       
            swal("info", 'Error en el servicio', "info")
        };
        Enviar.elemento($scope, url, success, error, jsonEnvio);


    }

    $scope.sumaTotal = 0;

    $scope.endDiagnostic = function(){

        var sumCh = 0;
        var sumRad = 0;
        for (let index = 0; index <  $scope.jsonPreguntasRespuestas.length; index++) {

            if($scope.jsonPreguntasRespuestas[index].tipo == 1){

                sumRad = parseInt(  jQuery('input[name=radio_'+  $scope.jsonPreguntasRespuestas[index].id_pregunta    +']:checked').val());
                if(sumRad == 100){
                    $scope.sumaTotal =  $scope.sumaTotal + sumRad ; 
                }
               

            }else{

                sumCh = 0
                let array = jQuery("input[name='ckeck_"+ $scope.jsonPreguntasRespuestas[index].id_pregunta  +"']:checked");
                for (let z= 0; z < array.length; z++) {                   
                    let str = array[z].id
                    sumCh = sumCh + parseInt(str.split("_")[1]) ; 
                } 

                if(sumCh == 100){
                    $scope.sumaTotal =   $scope.sumaTotal + sumCh ; 
                }
            }

           

        }
      
        $scope.resultadoFinal =   $scope.sumaTotal * 100 /  ($scope.jsonPreguntasRespuestas.length * 100) 
        $scope.resultadoFinal =  Math.round($scope.resultadoFinal);
              
        $scope.registrarIntento($scope.resultadoFinal);
         $scope.sumaTotal = 0
    }

    $scope.registrarRespuestas= function(idIntento){
      
        var arryRespuestas = []
        for (let index = 0; index <  $scope.jsonPreguntasRespuestas.length; index++) {
          
            if($scope.jsonPreguntasRespuestas[index].tipo == 1){

                let str1 = jQuery('input[name=radio_'+  $scope.jsonPreguntasRespuestas[index].id_pregunta    +']:checked')[0].id   ;              
                let respuestaSplit = str1.split("_")[1];   
                arryRespuestas.push({'id_respuesta': respuestaSplit })

            }else{
                
                let array = jQuery("input[name='ckeck_"+ $scope.jsonPreguntasRespuestas[index].id_pregunta  +"']:checked");
                for (let z= 0; z < array.length; z++) {                   
                    let str = array[z].id
                    let respuestaSplit2 = parseInt(str.split("_")[0]) ; 
                    arryRespuestas.push({'id_respuesta': respuestaSplit2 })
                } 
            }

        }

      


        var jsonEnvio = {
            "url": $scope.Lnk,             
            'id_intento': idIntento ,  
            'respuestas' : arryRespuestas
        }
     

        var url = $rootScope.baseUri + "/diagnostico/link_gp";

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
            "url": $scope.Lnk,           
            'resultado': sumaTotal    
        }
        var url = $rootScope.baseUri + "/diagnostico/link_ri";

        var success = function (json) {
          
            $scope.idIntento = json.data.intento.id_intento;
            $scope.registrarRespuestas( $scope.idIntento)

            $scope.sumaTotal = 0;          
            $scope.resultadoFinal = 0 ;  
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