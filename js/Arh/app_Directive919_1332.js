
(function() {
  var aplc = angular.module('aCtg', ['drctve']);
  var rdg={}   //rdg='D'ate din 'R'esursa(json via http) disponibile 'G'lobal
  var cdg={}    //cdg=Date Controller disponibile Global
 
        var ftab ,rezultat 
        var obMfiltre={} ,blocat={}
        
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
    })
 }]);
 aplc.controller('elmKeyCtrl' ,function() { 
      var setatKey={} ,aista=this
      aista.ascunde={}
      
    this.apasElm=function(idx ,ek){
           if (!setatKey[ek]) {
                    setezCdg_AVDkeyX(ek)
                                         /*  ftab.asTcol=[] ;  ftab.asTcol[0]=ek
                                           obMfiltre[ek]=[]
                                           ftab.mFiltre(obMfiltre)
                                           cdg.continut[ek]=ftab.ovd[ek].vd.avd   */
                    setatKey[ek]=true
                    aista.ascunde[ek]=true
         }
      
        if (obMfiltre[ek]!=undefined){ 
                    if (obMfiltre[ek].length==0)  aista.ascunde[ek]=!aista.ascunde[ek]
            }else aista.ascunde[ek]=!aista.ascunde[ek]
        
    } 
 })
 aplc.controller('elmAvCtrl' ,function(){ //Av - AraiValori
      var aista=this
          aista.selectare={icb:true ,icbinactiv:true ,icbactiv:false}
      var bifat=false
     function setezMfiltreK_avdX(keyX,vdX){
                                obMfiltre[keyX]=[]
                                obMfiltre[keyX][0]=vdX
                                
     } 
   this.apasElm=function(idx ,ek ,eAv){
        var kFiltru=obMfiltre[ek]
          if (bifat){
              aista.selectare={icb:true ,icbinactiv:true ,icbactiv:false}
                    }else{
              aista.selectare={icb:true ,icbinactiv:false ,icbactiv:true} 
          }
          bifat=!bifat
          
           if (kFiltru==undefined){        //  ||(kFiltru.length==0)) {
                                setezMfiltreK_avdX(ek,eAv)
                        } else {
                             delete obMfiltre[ek]                  //obMfiltre[ek]=[]
                        }
            ftab.asTcol=Object.keys(cdg.continut)
            ftab.mFiltre(obMfiltre)
            for (var aSkey in ftab.asTcol){
                    cdg.continut[ftab.asTcol[aSkey]]=ftab.ovd[ftab.asTcol[aSkey]].vd.avd  
            }
    } 
 })
 aplc.controller('mnuCtrl',function(){
     this.elmLista=['filtreaza' ,'ejaculeaza' ,'improvizeaza']
     this.apasElm=function(idx){
         
     }
 })
})();

