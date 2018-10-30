


IdentiApp.controller("HomeController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {

    this.idRol = $rootScope.user.id_rol
    $scope.IddiagnosticoLtd = $rootScope.diagnostico
    $scope.IdCamaraComercio = $rootScope.camara_Comercio
    this.CamaraDeComercio = 0
    $scope.nombreEmpresaLink = ''

    $scope.initSelect2 = function(){
        $('.js-example-basic-single').select2();
    }
 

    $rootScope.GoCrearVisita = function(){   
        
        var empresaId = $(".js-example-basic-single").val();
        var nameEmpresa = $('.js-example-basic-single').select2('data')[0].text;     
        


        console.log(empresaId)
        console.log(nameEmpresa)
         $location.path('/crearVisita/'+empresaId + '/' + nameEmpresa);
    }

    $rootScope.GoCrearEmpresa = function(){        
        $location.path('/crearEmpresa');
    }

    $rootScope.GoDiagnostico = function(){  
        sessionStorage.emprDiag= $('.js-example-basic-single').select2('data')[0].text;       
        var empresaId = $(".js-example-basic-single").val();
        console.log(empresaId)    
        $location.path('/diagnosticoEmpresa/'+empresaId);
    }



    $rootScope.GoRegistroIntentos = function(){   
        
        var empresaId = $(".js-example-basic-single").val();
        var nameEmpresa = $('.js-example-basic-single').select2('data')[0].text;     
       
       
         $location.path('/registroIntentos/'+empresaId + '/' + nameEmpresa);
    }

    $rootScope.GoConsultarVisitas = function(){   
        
        var empresaId = $(".js-example-basic-single").val();
        var nameEmpresa = $('.js-example-basic-single').select2('data')[0].text;     
       
       
         $location.path('/consultarVisitas/'+empresaId + '/' + nameEmpresa);
    }
    
    this.ModalLink = function(){
        var nameEmpresa = $('.js-example-basic-single').select2('data')[0].text;     
        $scope.nombreEmpresaLink = nameEmpresa;
    }

    this.GenerarXlsEmpresas = function(){
        var Ctrl = this;
        var jsonEnvio = {
            'correo': $rootScope.user.correo,           
            'token': '' 
        }
        if (Ctrl.CamaraDeComercio  != 0 ) {
            jsonEnvio.camara_comercio = Ctrl.CamaraDeComercio;
        }
      
        var url =  $rootScope.baseUri + "/diagnostico/exc_emp_reg";
        
        var success = function (json) {            
           
            let uriExl =  $rootScope.baseUri +'/'+json.data.loc_archivo
            jQuery("#tmpFrame").attr('src', uriExl);       
        };
        var error = function (resp) {
            console.log(resp);
            swal("info", 'Error en el servicio', "info")
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
        

    }
    
    this.GenerarXlsVisitas = function(){
        var Ctrl = this;
        var jsonEnvio = {
            'correo': $rootScope.user.correo,           
            'token': '' 
        }

        if (Ctrl.CamaraDeComercio != 0 ) {
            jsonEnvio.camara_comercio = Ctrl.CamaraDeComercio;
        }

        var url =  $rootScope.baseUri + "/diagnostico/exc_vis_reg";
    
        var success = function (json) {            
           
            let uriExl =  $rootScope.baseUri +'/'+json.data.loc_archivo
            jQuery("#tmpFrame").attr('src', uriExl);       
        };
        var error = function (resp) {
            console.log(resp);
            swal("info", 'Error en el servicio', "info")
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
        

    }

    this.GenerarXlsDiagnosticos = function(){
        var Ctrl = this;
        var jsonEnvio = {
            'correo': $rootScope.user.correo,           
            'token': '' 
        }

        if (Ctrl.CamaraDeComercio != 0 ) {
            jsonEnvio.camara_comercio = Ctrl.CamaraDeComercio;
        }      
        var url =  $rootScope.baseUri + "/diagnostico/exc_diag_reg";
      
        var success = function (json) {            
           
            let uriExl =  $rootScope.baseUri +'/'+json.data.loc_archivo
            jQuery("#tmpFrame").attr('src', uriExl);       
        };
        var error = function (resp) {
            console.log(resp);
            swal("info", 'Error en el servicio', "info")
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
        

    }

    $('#myModal').on('hidden.bs.modal', function (e) {
        var div = document.getElementById('alert-dark');

        div.innerHTML = '';
      })

    this.GenerarLink = function(){
        var Ctrl = this;
        var empresaId = $(".js-example-basic-single").val();



        var jsonEnvio = {
            'correo': $rootScope.user.correo,           
            'token': '' ,
            "id_empresa":empresaId
        }

            
        var url =  $rootScope.baseUri + "/diagnostico/gen_link";      
        var success = function (json) {         

            console.log(json.data.Link.url)   
            //  let uriExl =  $rootScope.baseUri +'/'+empresaId+'/' +json.data.Link.url      

          
             var path = $location.absUrl();

         
             var urr = path.replace('home', 'diagnosticoEmpresaRemote' )

             let uriExl = urr +'/'+empresaId+'/' +json.data.Link.url   
             
             var div = document.getElementById('alert-dark');

            div.innerHTML = uriExl;
            
            $.toast({
                heading: 'Success',
                text: 'Link Generado Correctamente !',
                hideAfter: 4000 ,
                icon: 'success',
                position: 'top-left',
                stack: false
            })

             console.log(uriExl)


        };
        var error = function (resp) {
            console.log(resp);
            swal("info", 'Error en el servicio', "info")
        };

        console.log(jsonEnvio)
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
               
        

    }


    this.ListEmpresas = []

    this.cargarListaEmpresas = function () {

        var jsonEnvio = {
            'id_usuario': $rootScope.user.correo,
            'token': ''
        }
      
        var url =  $rootScope.baseUri + "/empresas/listar";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListEmpresas = json.data.empresas;
        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
         Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

      

        $scope.initSelect2();
        
        this.cargarListaEmpresas();
}
]); 