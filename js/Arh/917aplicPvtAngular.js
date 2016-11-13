
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
        
     $http.get('json/bazacudata.json').success(function(pfData){
            dateJson = pfData;
          var axcol=Object.keys(dateJson)
            rdg.titluri=axcol
            rdg.continut=dateJson
             aista.dateCtrl.titluri=rdg.titluri
          cdg=aista.dateCtrl
                                ftab=new filtruTab(rdg.continut)
        cdg.continut={}                        
    })
 }]);
 aplc.controller('elmKeyCtrl' ,function() { 
      var setatKey={} ,aista=this
      aista.ascunde={}
      
    this.apasElm=function(idx ,eK){
           if (!setatKey[eK]) {
                    setezCdg_AVDkeyX(eK)
                                         /*  ftab.asTcol=[] ;  ftab.asTcol[0]=eK
                                           obMfiltre[eK]=[]
                                           ftab.mFiltre(obMfiltre)
                                           cdg.continut[eK]=ftab.ovd[eK].vd.avd   */
                    setatKey[eK]=true
                    aista.ascunde[eK]=true
         }
         aista.ascunde[eK]=!aista.ascunde[eK]
    } 
 })
 aplc.controller('elmAvCtrl' ,function(){ //Av - AraiValori
      var aista=this
          aista.selectare={icb:true ,icbinactiv:true ,icbactiv:false}
      var bifat=false
     function setezMfiltreK_avdX(keyX,vdX){
                                obMfiltre[keyX]=[]
                                obMfiltre[keyX][0]=vdX
                                ftab.asTcol=Object.keys(cdg.continut)
     } 
   this.apasElm=function(idx ,eK ,eAv){
        var kFiltru=obMfiltre[eK]
          if (bifat){
              aista.selectare={icb:true ,icbinactiv:true ,icbactiv:false}
                    }else{
              aista.selectare={icb:true ,icbinactiv:false ,icbactiv:true} 
          }
          bifat=!bifat
          
           if ((kFiltru==undefined)||(kFiltru.length==0)) {
                                setezMfiltreK_avdX(eK,eAv)
                        } else {
                            obMfiltre[eK]=[]
                        }
            ftab.mFiltre(obMfiltre)
            for (var aSkey in ftab.asTcol){
                    cdg.continut[ftab.asTcol[aSkey]]=ftab.ovd[ftab.asTcol[aSkey]].vd.avd  
            }
    } 
 })
})();

