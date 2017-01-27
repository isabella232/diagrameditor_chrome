chrome.runtime.onInstalled.addListener(function (){
    chrome.contextMenus.create({
        title: "Diagram Editor online",
        id: "diagrameditorUpload",
        contexts: ["link"]
    });
});


chrome.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "diagrameditorUpload") {
    	//alert(JSON.stringify(info, null, 40));
        var imgUrl = info.linkUrl;
        diagrameditorUpload(imgUrl);
    }
});


chrome.webRequest.onBeforeRequest.addListener(
        interceptRequest,
        { urls: ["*://*/*.dia" 
                ]},
        ['blocking']
);

function diagrameditorUpload(urlxx) {      
     
  	 var filenamex = Math.floor(Math.random() * 2000000) + "";
  	
  	if ( (urlxx.indexOf("http://") !=-1) || (urlxx.indexOf("https://") !=-1)) {
  		//alert("vamos directos con url de imagen");
  		finalurl =  "http://www.offidocs.com/edit-diaeditor.php?fileurl="+ encodeURIComponent(urlxx)+"&filename="+ filenamex ;
    	//alert(finalurl);
    	window.open(finalurl,'_blank');
  	}		
}

function interceptRequest(request)
{
    if (request && request.url) {
        if (request.type == "main_frame") {
            if (
                 ( request.url.indexOf("docs.google.com") == -1 )
                   && (request.url.indexOf("offidocs.com") == -1)
                ) 
            {
                var filenamex = Math.floor(Math.random() * 2000000) + "";
  				var finalurl = "http://www.offidocs.com/edit-diaeditor.php?fileurl="+ encodeURIComponent(request.url)+"&filename="+ filenamex;
                //window.open(finalurl,'_blank');
                return {
                    redirectUrl: finalurl
                };
            }
        }
    }
}



