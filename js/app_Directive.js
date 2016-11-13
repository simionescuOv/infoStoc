
(function() {
  var aplc = angular.module('aCtg', ['drctve']);
    
      var rdg={}   //rdg='D'ate din 'R'esursa(json via http) disponibile 'G'lobal
      var cdg={}    //cdg=Date Controller disponibile Global

    var ftab ,rezultat 
    var obMfiltre={} ,blocat={}
    var oaAic ,astaAicCtrl
    var numePrimaOara , contuar=0
    var xElemente=7
       
            
  
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
        numePrimaOara(0,'nume')
    })
 }]);
 aplc.controller('elmKeyCtrl' , function() { 
   
      var tipKey={nume:"text"
                  ,sku:'number'
                  ,data:'number'
                  ,pret:'number'
                  ,Taraba:'number'
                  ,Depozit:'number'}
     
      this.obtTipul=function(ek){
        if (tipKey[ek]!=undefined) return tipKey[ek]
        contuar++
     }  
    
      
      
      var setatKey={} ,aista=this
      aista.arata={}
      
    this.apasElm=function(idx ,ek){
           if (!setatKey[ek]) {
                    setezCdg_AVDkeyX(ek)
                                        
                    setatKey[ek]=true
                    aista.arata[ek]=false
         }
      
        if (obMfiltre[ek]!=undefined){ 
                    if (obMfiltre[ek].length==0)  aista.arata[ek]=!aista.arata[ek]
            }else {
                aista.arata[ek]=!aista.arata[ek]
                
            }
     
        
    } 
        
       numePrimaOara=this.apasElm
  
   
 })
 aplc.controller('elmAvCtrl' ,function(){ //Av - AraiValori
     
      var aista=this
      var tipuriKey=[{cheie:'nume' ,tip:'text'}
                    ,{cheie:'sku', tip:'number'}
                    ,{}]
      
      
          aista.selectare={icb:true ,icbinactiv:true ,icbactiv:false}
      var bifat=false
     function setezMfiltreK_avdX(keyX,vdX){
                                obMfiltre[keyX]=[]
                                obMfiltre[keyX][0]=vdX
                                
     } 
   
   this.apasElm=function(idx ,ek ,eAv){   //AV
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
        cldAicOa(['sku' ,'nume' ,'Taraba' ,'Depozit' ,'costNetRon' ,'pret','img_http'])
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
  /*   this.scurt=function(){
         return scurtatura.filtre
     }*/
 })
 aplc.controller('aicCtrl' ,function(){
     astaAicCtrl=this
     this.obtPoza=function(idx){
         if (astaAicCtrl.oaAic[idx].img_http=="") return "img/128x128.gif"
                else 
                        return  astaAicCtrl.oaAic[idx].img_http
     }
 })

 
 aplc.filter('limitareXelemente', function(){
    
     return function(elementele){
         var eee=elementele
         return elementele
     }
 })
 

})();

