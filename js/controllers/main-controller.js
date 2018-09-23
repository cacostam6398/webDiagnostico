
    IdentiApp.controller("MainController", ['$scope', '$location', '$rootScope', 'Enviar','$filter',
	function ($scope, $location, $rootScope,  Enviar,$filter) {

    

       

  


        $rootScope.GoHome = function(){  
           
            var info = 	jQuery(".navbar-toggle");
            var arry = info[0].className.split(" ");
           
            if(arry.length = 3){
                jQuery(".navbar-toggle").toggleClass("open"), 
                jQuery("#navigation").slideToggle(400)
            }


            $location.path('/home');
        }
    


 

}]);
