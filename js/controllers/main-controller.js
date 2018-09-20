
    IdentiApp.controller("MainController", ['$scope', '$location', '$rootScope', 'Enviar','$filter',
	function ($scope, $location, $rootScope,  Enviar,$filter) {

        $rootScope.GoHome = function(){  
            $location.path('/home');
        }
    



 

}]);