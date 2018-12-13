'use strict';

var IdentiApp = angular.module('Identi', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'ngAnimate', 'ui.bootstrap.datetimepicker', 'ngIdle']);

IdentiApp.constant('CONFIG', {
    TEMPLATE_DIR:"templates/",
    ROL_CURRENT_USER: 0
   })
    
.constant('ROLES', {
    CONSUL: {
    ROL:1,
    PATH:"/Consultor"
    },
    COORD: {
    ROL:2,
    PATH:"/Coordinador"
    },
    ADMIN: {
    ROL:3,
    PATH:"/Administrador"
    },
    EVERY: {
        ROL:0,
        PATH:"/EVERY"
        }
   })



IdentiApp.run(function ($rootScope, $location, $http, CONFIG,ROLES) {
    console.log('https://',location.host);
    // /pruebas_back
    // /rest_diagnostico/public
    $rootScope.baseUri = 'httsp://'+ location.host + '/pruebas_back' ;



    var storage;
    // try {
    //     if (sessionStorage.getItem('user')) {
    //         if ($rootScope.user == null || typeof $rootScope.user == 'undefined') {
    //             $rootScope.user = JSON.parse(sessionStorage.user);
    //             $rootScope.camara_Comercio =   sessionStorage.camara_Comercio 
    //             $rootScope.diagnostico     =  sessionStorage.diagnostico 	
    //             // $rootScope.token =  sessionStorage.token;
    //         } else {
    //             $location.url("/login");
    //         }
    //     } else {
    //         $location.url("/login");
    //     }
    // } catch (e) {
    //     storage = {};
    // }

    $rootScope.$on('$routeChangeStart', function (event, next) 
    {
        //    console.log(next.$$route.data)
        //    console.log(ROLES.ADMIN.PATH)
        //    console.log(CONFIG.ROL_CURRENT_USER)

           try {

            var found = next.$$route.data.authorized.find(function(element) {
                return element == 0;
              });

           if(found == undefined){
                    if (sessionStorage.getItem('user')) {
                        if ($rootScope.user != null || typeof $rootScope.user != 'undefined') {
                            $rootScope.user = JSON.parse(sessionStorage.user)
                            $rootScope.camara_Comercio =   sessionStorage.camara_Comercio 
                            $rootScope.diagnostico     =  sessionStorage.diagnostico 	
                            // $rootScope.token = sessionStorage.token;
                        } else {
                            $location.url("/login");
                        }
                    } else {
                        $location.url("/login");
                    }

                }else{



                }

        } catch (e) {
            storage = {};
        }


 
               
    })

    $rootScope.$on('$routeChangeSuccess', function (event, next) {

        try {
            var found = next.$$route.data.authorized.find(function(element) {
                return element == 0;
              });
            if(found == undefined){
            if (sessionStorage.getItem('user')) {
                if ($rootScope.user != null || typeof $rootScope.user != 'undefined') {
                    $rootScope.user = JSON.parse(sessionStorage.user)
                    $rootScope.camara_Comercio =   sessionStorage.camara_Comercio 
                    $rootScope.diagnostico     =  sessionStorage.diagnostico 	
                    // $rootScope.token = sessionStorage.token;
                } else {
                    $location.url("/login");
                }
            } else {
                $location.url("/login");
            }

        }else{



        }

        } catch (e) {
            storage = {};
        }

        
    })


})



IdentiApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'IdleProvider', '$controllerProvider', '$provide',"CONFIG", "ROLES",
	function ($routeProvider, $locationProvider, $httpProvider, IdleProvider, $controllerProvider, $provide,CONFIG, ROLES) {
	    $routeProvider
        .when('/home', { controller: 'HomeController', controllerAs: 'HmeCtrl', templateUrl: 'partials/home.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })
        .when('/login', { controller: 'LoginController', templateUrl: 'partials/login.html', data: {authorized: [ROLES.EVERY.ROL]} })
        .when('/crearVisita/:EmpId/:nomEmp', { controller: 'crearVisitaController', controllerAs: 'crtvisCtrl',  templateUrl: 'partials/crearVisita.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })
        .when('/crearEmpresa', { controller: 'crearEmpresaController', templateUrl: 'partials/crearEmpresa.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })

        .when('/diagnosticoEmpresa/:EmpId', { controller: 'diagnosticoEmpresaController', templateUrl: 'partials/diagnosticoEmpresa.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })

        .when('/diagnosticoEmpresaRemote/:EmpId/:str', { controller: 'diagnosticoEmpresaRemoteController', templateUrl: 'partials/diagnosticoEmpresaRemote.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL,ROLES.EVERY.ROL]} })
        
        .when('/registroIntentos/:EmpId/:nomEmp', { controller: 'registroIntentosController', controllerAs: 'regIntentCtrl',  templateUrl: 'partials/registroIntentos.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })
        .when('/consultarVisitas/:EmpId/:nomEmp', { controller: 'consultarVisitasController', controllerAs: 'consVisCtrl',  templateUrl: 'partials/consultarVisitas.html', data: {authorized: [ROLES.CONSUL.ROL,ROLES.COORD.ROL,ROLES.ADMIN.ROL]} })
        // .when('/consultarVisitas/:EmpId/:nomEmp', { controller: 'consultarVisitasController', controllerAs: 'consVisCtrl',  templateUrl: 'partials/consultarVisitas.html' })
        .otherwise({ redirectTo: '/login' });


}])
