﻿

IdentiApp.controller("LoginController", ['$scope', '$location', '$rootScope', '$modal', 'Enviar','Recibir',
	function ($scope, $location, $rootScope, $modal, Enviar, Recibir) {
	 
	 
	    $scope.formR1 = true;
	    $scope.formR2 = false;
	    $scope.esta = false;
	    $scope.registro = {};
	    $scope.MostrarCargaReg = false;


		

	


	    jQuery('#myform2').validate({ // initialize the plugin
	        rules: {
	            'nombre': {
	                required: true,
	                noSpecials: true
	            },
	            'apellido': {
	                required: true,
	                noSpecials: true

	            },
	            'email': {
	                required: true,
	                minlength: 2,
	                email: true
	            },
	            'telefono': {
	                required: true,
	                minlength: 2,
	                number: true
	            },
	            'contra': {
	                required: true,
	                minlength: 10,
	                maxlength: 20,
	                noSpecials: true
	            },
	            'numDoc': {
	                required: true,
	                minlength: 2,
	                number: true
	            },
	            'ciud': {
	                required: true,
	                minlength: 2
	            },
	            'dire': {
	                required: true,
	                minlength: 2
	            }

	        },
	        submitHandler: function (form) { // for demo
	            return false; // for demo
	        }
	    });



	    $scope.registrar = function (registro) {
	        $scope.MostrarCargaReg = true;

	        if (jQuery('#myform2').valid()) {
	            var url = "/Usuarios/CreateUsuario";
	            var success = function (json) {
	                if (json != 500) {
	                    $scope.registro = {};
	                    swal("Exito", registro.UsuaNombre + " Se ha registrado correctamente ", "success");
	                    $scope.formR1 = true;
	                    $scope.formR2 = false;
	                    $scope.MostrarCargaReg = false
	                } else {
	                    swal("Informacion", "Error en el registro. Por Favor Valide los campos Ingresados", "info");
	                    $scope.formR1 = true;
	                    $scope.formR2 = false;
	                    $scope.MostrarCargaReg = false
	                }
	            };
	            var error = function (resp) { $scope.MostrarCargaReg = false; console.log("Error: " + resp); swal("Informacion", "Error en el registro. Por Favor Valide los campos Ingresados", "info"); };
	            Enviar.elemento($scope, url, success, error, registro);
	        } else {
	            $scope.MostrarCargaReg = false;
	        }
	    }


	    $scope.ModalRecuperacion = function () {
	        this.Modal = $modal.open({
	            templateUrl: 'Modal.html',
	            scope: $scope,
	            size: 'sm'
	        });
	    };
		


	    $scope.login = function (forma) {
			
	        jQuery('#myform').validate({ // initialize the plugin
	            rules: {
	                'email': {
	                    required: true,
	             
	                },
	                'pass': {
	                    required: true,
	                    minlength: 2
	                }

	            },
	            submitHandler: function (form) { // for demo
	           
	                return false; // for demo
	            }
	        });

	        if (jQuery('#myform').valid()) {
	            var user = { "UsuaUsua": "", "UsuaPwd": "" };	          
	            var Ctrl = this;
	            var Url =  $rootScope.baseUri + "/rest_diagnostico/public/api/index/aut";
	             var success = function (json) {	

	                if (json.data.status != "OK") {
	                    $scope.message = 'Usuario o Contraseña incorrectos';
	                    swal("Error", $scope.message, "info");
	                } else {	                
					
					
						sessionStorage.user = JSON.stringify(json.data.usuario);						
						// sessionStorage.token =  json.data.token;
						$rootScope.user = json.data.usuario;
						// $rootScope.token = json.data.token;
	                    console.log($rootScope.user);	  
	                    $location.path('/home');
	                }
	             };
				var error = function (json) {	
					swal("Error","Usuario o Contraseña incorrectos", "info");	
				};
	            // var user = { "UsuaEmail": "", "UsuaPsw": "" };
	            // user.UsuaEmail = $scope.email;
	            // user.UsuaPsw = $scope.password;
	            var Data = { "correo": forma.email , "contrasena": forma.password  }
			    Enviar.elemento(Ctrl, Url, success, error, Data);
	        }
		};
		
		$rootScope.LogOut = function(){

			sessionStorage.removeItem('user');
			$rootScope.user = {};
			$rootScope.token = '';
			$location.path('/login');
		}		

		
		
		$rootScope.GoHome = function(){				
			$location.path('/home');
		}

		$rootScope.GoCreacionSyllabus = function(){		
			$location.path('/CreacionSyllabus');
		}


	    sessionStorage.clear();
	    $rootScope.permissions = []; 	
	    sessionStorage.clear();
	    $rootScope.permissions = [];
	    $rootScope.user = '';
	}
]);



  


