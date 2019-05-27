	/*

        Arthor: XX
        Last Update: 2014年5月1日21:58:13

        Thanks for this post
        http://blogs.adobe.com/webplatform/2012/01/13/html5-image-progress-events/
    */

    var request;
	var progressBarContainer 	= document.getElementById('progressBarContainer');
    var progressBar 			= document.getElementById('progressBar');

    function loadImage(imageURI)
    {
        //debugger;
        request = new XMLHttpRequest();
        request.onloadstart = showProgressBar;
        request.onprogress = updateProgressBar;
        //request.onload = showImage;
        request.onload = updateImage;
        request.onloadend = hideProgressBar;
        request.open("GET", imageURI, true);
        request.overrideMimeType('text/plain; charset=x-user-defined'); 
        request.send(null);        
    }

    function showProgressBar()
    {       
        progressBarContainer.style.display = 'block';
    }
    
    function updateProgressBar(e)
    {
        if (e.lengthComputable) {         
            progressBar.style.width = (e.loaded / e.total * 100) + '%';
        }                  
    }
    
    function showImage()
    {
        var imageElement = document.createElement("img");
        imageElement.src = "data:image/jpeg;base64," + base64Encode(request.responseText);
        document.body.appendChild(imageElement);
    }
    
    function updateImage()
    {   // 似乎不能加参数，否则会报错 2014年5月1日21:43:17
        var imageElement = document.getElementById('background');
        imageElement.src = "data:image/jpeg;base64," + base64Encode(request.responseText);
        imageElement.classList.add('show');
        document.getElementById('options').classList.add('show');      // 右下角panel
    }

    function hideProgressBar()
    {
        progressBarContainer.style.display = 'none';
        document.body.classList.remove("loading");
    }

    // This encoding function is from Philippe Tenenhaus's example at http://www.philten.com/us-xmlhttprequest-image/
    function base64Encode(inputStr) 
    {
       var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
       var outputStr = "";
       var i = 0;
       
       while (i < inputStr.length)
       {
           //all three "& 0xff" added below are there to fix a known bug 
           //with bytes returned by xhr.responseText
           var byte1 = inputStr.charCodeAt(i++) & 0xff;
           var byte2 = inputStr.charCodeAt(i++) & 0xff;
           var byte3 = inputStr.charCodeAt(i++) & 0xff;
    
           var enc1 = byte1 >> 2;
           var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
           
           var enc3, enc4;
           if (isNaN(byte2))
           {
               enc3 = enc4 = 64;
           }
           else
           {
               enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
               if (isNaN(byte3))
               {
                   enc4 = 64;
               }
               else
               {
                   enc4 = byte3 & 63;
               }
           }
    
           outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
        } 
       
        return outputStr;
    }