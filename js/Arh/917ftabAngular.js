function idxSort(arr){
    var h=arr.map(function(e,i){
                    return {idx:i,vlr:e} // return {idx:i,vlr:e.toLowerCase()}            
                    })
     h.sort(function(a,b){
        return a.vlr>b.vlr ? 1:-1;
    })
    return h.map(function(e){
        return e.idx ;
    })
  
}
function filtruTab(tab){
	this.obTab=tab
							
	this.aTcol=Object.keys(tab)
	this.asTcol=this.aTcol
	this.ovd={}
							
		this.aRecLung=tab[this.asTcol[0]].length
	this.aim=[]  //arai index maxim
	 for (var i=0; i < this.aRecLung; i++) { this.aim[i]=i  }
    this.aic=this.aim	 //arai index curent
 								  
        //this.start_altu()
	
}
filtruTab.prototype={

    start_altu:function(){
    	this.cldOVDaic(this.aim)
    }
  ,xcAicAvd:function(xc,avd,aic){
   		
    	var ae=this.obtArrElem(xc,aic)
    	var ixs=idxSort(ae);
    					
        var ixTs=[]	
    			 for (var j=0; j<ixs.length;j++){
    					 ixTs[j]=aic[ixs[j]]   }
    					
       	var rez=this.obtAICxcAvd(xc,avd,ixTs)
    	return  rez
    	
    }

    ,mFiltre:function(ob){
    	var aic=this.aim
    	                               //var ak=this.asTcol;
        var ak=Object.keys(ob)
    	
    	for (var i=0; i < ak.length; i++) {
    				if (ob[ak[i]].length>0)  aic=this.xcAicAvd(ak[i],ob[ak[i]],aic)    						
		};
		this.aic=aic
		
		this.ovd={}
    	if (ak.length>0) this.ovd['AIC_'+ak[0]+'_'+ob[ak[0]][0]]=aic.length 
    			else this.ovd['AIC_MAX']=aic.length
		
		this.cldOVDaic(aic)	
    }
    ,cld__VdAic:function(xcol){
        var ae  ,ixs ,ixt
        ae=this.obtArrElem(xcol,this.aic)
             ixs=idxSort(ae);
             ixt=idxSort(ixs)
    	
    	this.ovd[xcol]={}
    	this.ovd[xcol].ixs=ixs
    	this.ovd[xcol].ixt=ixt
    	this.ovd[xcol].vd=this.cladescVDprop(ae,ixs)
    }
    ,cldOVDaic:function(aic){
    	var ae ,xcol ,ixs ,ixt
    	                                               
    	for (var i=0; i < this.asTcol.length; i++) {
    			    xcol=this.asTcol[i]
    				ae=this.obtArrElem(xcol,aic)
    				ixs=idxSort(ae);
                                            ixt=idxSort(ixs)
    	
    	this.ovd[xcol]={}
    	this.ovd[xcol].ixs=ixs
    	                                     this.ovd[xcol].ixt=ixt
    	this.ovd[xcol].vd=this.cladescVDprop(ae,ixs)
    	
    	};
    	
    }
    

,cladescVDprop:function(ae,ixs){      // valori distincte - intra un araiSortat(ae-araiul ; ixs-araiul cu index-urile lui ae sortat) cu elem oarecare
    				                   //       iese un arr de obecte unde elem evd: este unic in cadrul multimii
    		var ecrt ,iavd,ile                //ecrt-elementu curent ,iavd-iterator arai indexi valori distincte , iterator lungime ecrt
    		var avd=[] ,ab=[] ,alung=[]	      //avd-arai indexi valori distincte ; ab-arai indexi begin(inceputul ecrt)    	
 				ecrt=ae[ixs[0]]
    			iavd=0
    			ile=0
    			avd[iavd]=ecrt
    			ab[iavd]=iavd
    			
    		for (var i=1; i < ixs.length+1; i++) {
      				if (ecrt!=ae[ixs[i]]){
      						ecrt=ae[ixs[i]]
      						
      						alung[iavd]=ile
      						iavd++
      						if (ecrt!=undefined) {avd[iavd]=ecrt}
      						ab[iavd]=i
      						
      					ile=-1
      				}	
      				ile++
      				
    		};
    	return {avd:avd ,ab:ab ,alung:alung}	
    }
 
    ,obtAICxcAvd:function(xc,avd,ixTs){ //obtine aic pentru un arai de vd de pe o xCol
    	var eflt ,ecrt ,evch ,ixsL=ixTs.length
    	var iixs=-1 ,irez=0
    	var arez=[] ,gasit=false
    	var aElm=this.obtArrElem(xc,ixTs)
    	var aLuatoRazna1=false ,aLuatoRazna2=false
    										
    	while (iixs<ixsL) {					
    				if (!gasit) {
    					evch=ecrt
    					iixs++
    					ecrt=this.obtElem(xc,ixTs[iixs])
    				}
    				for (var j=0; j < avd.length; j++) {
					  if (ecrt==avd[j]) {
					  	eflt=ecrt
					  	gasit=true
					  	break
					  }
					  if (gasit) gasit=false
					};
					while (eflt==ecrt){
						arez[irez]=ixTs[iixs]
						irez++; iixs++
						ecrt=this.obtElem(xc,ixTs[iixs])
															if (iixs>ixsL) {
																aLuatoRazna1=true
																 break
															}
					}
    				if (!gasit) {
    					evch=ecrt
    					iixs++
    					ecrt=this.obtElem(xc,ixTs[iixs])
    					while (evch==ecrt){
							iixs++
							ecrt=this.obtElem(xc,ixTs[iixs])
															if (iixs>ixsL){
																aLuatoRazna2=true
																 break
															}
						}
					gasit=true
    				}
    	}
    	return arez
    }
    
    ,obtInregRow:function(idx,arrKey){
    	var orez={}  ,k            //orez-obect rezultat
    					
    	for (var i=0; i < arrKey.length; i++) {
    				k=arrKey[i]
		  			orez[k]=this.obTab[k][idx]
		};
		return orez
    }
    ,obtArrElem:function(xCol,idxArai){//extrage din araiul xCol elementele cu indexurile din idxArai si face un nou arai cu acestea
 				var arez=[]
 					for (var i=0; i < idxArai.length; i++) {
	  					 arez[i]=this.obTab[xCol][idxArai[i]]
					 }
	return arez
 	}
 	,obtElem:function(xc,idx){
 		return this.obTab[xc][idx]
 	}
 	
  ,keyConvertStoN_newKey:function(objSD,objKsVd){//objKsKd-obectul care descrie denumirile key-lor cu avs(araiulCuValori de tip String) sursa -SI- noile denumiri ale key-lor cu avn(araiCuValori de tip Number)  ex:{cant:'Ncant',pretV:'NpretV',costF:'NcostF',idxCul:'NidxCul'}
    								//objSD -  obect sursa-destinatie 
    	var avs ,avn ,nk				//avs - arai valori String ; avn - arai valori Number
    	for (var k in objKsVd) {
    		avs=objSD[k]
    		avn=[]
    		for (var j=0; j < avs.length; j++) {
    			if (avs[j]=='') 
    					avn[j]=0
			  		else
			  			avn[j]=parseInt(avs[j],10)
			};
			nk=objKsVd[k]
			objSD[nk]=avn
    	}
    }
    
}//sf.filtruTab.prototype
