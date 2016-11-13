
(function() {
  var aplc = angular.module('aCtg', ['drctve']);
  var rdg={}   //rdg='D'ate din 'R'esursa(json via http) disponibile 'G'lobal
  var cdg={}    //cdg=Date Controller disponibile Global
 
        var ftab ,rezultat 
        var obMfiltre={} ,blocat={}
        var oaAic ,astaAicCtrl
        var scurtatura={}
            scurtatura.filtre=true
  function cldAicVd(){
      var arez=[]
      
      var avdLung=ftab.ovd['nume'].vd.avd.length
      var ab=ftab.ovd['nume'].vd.ab
      var aixs=ftab.ovd['nume'].ixs
        for (var i=0;i<avdLung;i++){
               arez[i]=ftab.aic[aixs[ab[i]]]
        }
      return arez
  }      
  function cldAicOa(arrKey){
            oaAic=[]
            astaAicCtrl.oaAic=oaAic
         var aicVD=cldAicVd()
         for (var i=0; i<aicVD.length; i++){
              oaAic[i]=ftab.obtInregRow(aicVD[i] ,arrKey)
         }
                              /*   for (var x in aicVD){
                                    oaAic[x]=ftab.obtInregRow(aicVD[x] ,arrKey)
                                 }
                             */
         
     }      
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
        cldAicOa(['sku' ,'nume' ,'Taraba' ,'Depozit' ,'costNetRon' ,'pret','pozeGdraiv'])
    } 
 })
 aplc.controller('mnuCtrl',function(){
     this.nApasari=0
     this.mElmActiv=0
     this.elmLista=['Filtrare rezultate' ,'Sortare rezultate' ,'Alta optiune meniu']
     this.butonApasat=false
     this.seteaza_mElmActiv=function(x){
         this.mElmActiv=x
     }
     this.esteSetat=function(idx){
         return this.mElmActiv===idx
     }
     this.apasElm=function(idx){
         this.seteaza_mElmActiv(idx)
     }
     this.apasareButon=function(){
         this.nApasari++
         this.butonApasat=!this.butonApasat
     }
     this.scurt=function(){
         return scurtatura.filtre
     }
 })
 aplc.controller('aicCtrl' ,function(){
     astaAicCtrl=this
     this.obtPoza=function(idx){
         if (astaAicCtrl.oaAic[idx].pozeGdraiv=="") return "img/128x128.gif"
                else 
                        return  astaAicCtrl.oaAic[idx].pozeGdraiv
     }
 })
})();

