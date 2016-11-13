
(function() {
  var aplc = angular.module('aCtg', []);
  var rdg={}   //rdg='D'ate din 'R'esursa(json via http) disponibile 'G'lobal
  var cdg={}    //cdg=Date Controller disponibile Global
    
 
        var ftab ,rezultat
        var obMfiltre={}
        
  function setezCdg_AVDkeyX(keyX){ // setez Cdg.continut cu AraiValoriDistincte pt Key X
             ftab.cld__VdAic(keyX)
             cdg.continut[keyX]=ftab.ovd[keyX].vd.avd
      }
        
   aplc.controller('dateController', ['$http', function($http){
        var dateJson ,aista=this
        aista.dateCtrl={}
        
     $http.get('json/915date.csv.json').success(function(pfData){
            dateJson = pfData;
         
          var axcol=Object.keys(dateJson)
            rdg.titluri=axcol
            rdg.continut=dateJson
            
             aista.dateCtrl.titluri=rdg.titluri
          cdg=aista.dateCtrl
          
         ftab=new filtruTab(rdg.continut)
         
        cdg.continut={}
                                               
    });
   
  }]);
  aplc.controller('elmKeyCtrl' ,function() { 
      var setatKey={} ,aista=this
      aista.ascunde={}
      
      this.apasElm=function(idx ,eK){
           if (!setatKey[eK]) {
                        setezCdg_AVDkeyX(eK)
                    setatKey[eK]=true
                    aista.ascunde[eK]=true
         }
         aista.ascunde[eK]=!aista.ascunde[eK]
         
      }
      
    })
 aplc.controller('elmAvCtrl' ,function() { //Av - AraiValori
       
     function setezCdg_mFiltre_avdX(keyX,vdX){
                                obMfiltre[keyX]=[]
                                obMfiltre[keyX][0]=vdX
                                ftab.asTcol=Object.keys(cdg.continut)
                                ftab.mFiltre(obMfiltre)
                   // cdg.continut[keyX]=ftab.ovd[keyX].vd.avd
                        for (var aSkey in ftab.asTcol){
                          cdg.continut[ftab.asTcol[aSkey]]=ftab.ovd[ftab.asTcol[aSkey]].vd.avd  
                        }
     } 
      this.apasElm=function(idx ,eK ,eAv){
           if (!obMfiltre[eK]) {
                                setezCdg_mFiltre_avdX(eK,eAv)
                        } else {
                            //delete obMfiltre[eK]
                            obMfiltre[eK]=[]
                                        //ftab.aic=ftab.aim
                              ftab.mFiltre(obMfiltre)  //setezCdg_AVDkeyX(eK)
                        }
      }
      
    })

})();

