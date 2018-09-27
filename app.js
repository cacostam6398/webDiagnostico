'use strict';

var IdentiApp = angular.module('Identi', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'ngAnimate', 'ui.bootstrap.datetimepicker', 'ngIdle']);





IdentiApp.run(function ($rootScope, $location, $http) {
    console.log('http://',location.host);
    // /pruebas_back
    // /rest_diagnostico/public
    $rootScope.baseUri = 'http://'+ location.host + '/pruebas_back' ;
   
    var storage;
    try {
        if (sessionStorage.getItem('user')) {
            if ($rootScope.user == null || typeof $rootScope.user == 'undefined') {
                $rootScope.user = JSON.parse(sessionStorage.user);
                $rootScope.camara_Comercio =   sessionStorage.camara_Comercio 
                $rootScope.diagnostico     =  sessionStorage.diagnostico 	
                // $rootScope.token =  sessionStorage.token;
            } else {
                $location.url("/login");
            }
        } else {
            $location.url("/login");
        }
    } catch (e) {
        storage = {};
    }

  

    $rootScope.$on('$routeChangeSuccess', function () {

        try {

           
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
        } catch (e) {
            storage = {};
        }
    })


})


IdentiApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'IdleProvider', '$controllerProvider', '$provide',
	function ($routeProvider, $locationProvider, $httpProvider, IdleProvider, $controllerProvider, $provide) {
	    $routeProvider
        .when('/home', { controller: 'HomeController', controllerAs: 'HmeCtrl', templateUrl: 'partials/home.html' })
        .when('/login', { controller: 'LoginController', templateUrl: 'partials/login.html' })
        .when('/crearVisita/:EmpId/:nomEmp', { controller: 'crearVisitaController', controllerAs: 'crtvisCtrl',  templateUrl: 'partials/crearVisita.html' })
        .when('/crearEmpresa', { controller: 'crearEmpresaController', templateUrl: 'partials/crearEmpresa.html' })
        .when('/diagnosticoEmpresa/:EmpId', { controller: 'diagnosticoEmpresaController', templateUrl: 'partials/diagnosticoEmpresa.html' })
        .when('/registroIntentos/:EmpId/:nomEmp', { controller: 'registroIntentosController', controllerAs: 'regIntentCtrl',  templateUrl: 'partials/registroIntentos.html' })
        .when('/consultarVisitas/:EmpId/:nomEmp', { controller: 'consultarVisitasController', controllerAs: 'consVisCtrl',  templateUrl: 'partials/consultarVisitas.html' })
        .otherwise({ redirectTo: '/login' });


}])
