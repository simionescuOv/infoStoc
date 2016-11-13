(function(){
    var apd=angular.module('drctve' ,[])
    
    apd.directive('listacheifiltre' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directiveHtmls/listakf.html'
        }
    })
    
    apd.directive('meniu' ,function(){
        return {
            restrict:'E'
            ,templateUrl:'directiveHtmls/meniul.html'
        }
    })
    

})()