exports.createList=function(){
    $(document).on("click","#album_video",function(){

        $("#albumVideo").unbind().click();
      
            function readURL(input,name,i) {
        //  document.getElementById('divVideo').setAttribute("id",name);
              
                if (input.files && input.files[i]) {
                    var reader = new FileReader();
                    reader.onload=fileSelector;
      
                    function fileSelector(evt){
   
                 /*    if(videoCount-videoDelete-1===0){
                       var scroll=document.getElementById('scroll');
                       scroll.style.display='none';
                     }
      */           
                    $("#"+name).attr('src',evt.target.result);
                    
                    if(parseInt(localStorage.getItem("videoCount"))==1){
      
                      $("#video1").attr('src',evt.target.result);
      
                    }
      
                    else if(parseInt(localStorage.getItem("videoCount"))==2){
      
                      $("#video2").attr('src',evt.target.result);
      
                    }
      
                    else if(parseInt(localStorage.getItem("videoCount"))==3){
      
                       $("#video3").attr('src',evt.target.result);
      
                    }
                 // var video=$('#divVideo video')[0];
                   // video.src=evt.target.result; 
                  //  video.load(); 
                    
                    }
               
                    }
                    reader.readAsDataURL(input.files[i]);
                }
      
        
               var input=document.getElementById('albumVideo');
               var filelist = new Array();
        
                    $("#albumVideo").change(function(){
                
                      var element = document.getElementById('listItem');
                      console.log(element);
                      if(element==null){
                      var videoCount = 0;
                      var videoDelete=0;
                      localStorage.setItem("videoDelete",videoDelete);
                      localStorage.setItem("videoCount", videoCount);
                      }
                  
                      if(input.files.length==1){
                       
                      document.getElementById('albumVideo').removeAttribute('multiple');
                      var videoCount=parseInt(localStorage.getItem("videoCount",videoCount));
      
                      var table=document.createElement('table');
                      var row=document.createElement('tr');
                      table.appendChild(row);
                      var data1=document.createElement('td');
                      row.appendChild(data1);
                      var data2=document.createElement('td');
                      row.appendChild(data2);
                      var data3=document.createElement('td');
                      row.appendChild(data3);
      
                      var imgBtn=document.createElement('button');
                      imgBtn.setAttribute('id','deleteBtn');
                      imgBtn.setAttribute('width',2);
                      imgBtn.setAttribute('height',2);
                      imgBtn.setAttribute('class','buttont');
      
                      var image=document.createElement('i');
                      image.setAttribute('id','image');
                      image.setAttribute('class','fa fa-trash');
                      image.setAttribute('style','color:#000000');
                      image.setAttribute('width',20);
                      image.setAttribute('height',20);
      
                      imgBtn.appendChild(image);
      
                      var myVideo=document.createElement('video');
                      var videoN="video"+videoCount.toString();
                      
                      myVideo.setAttribute('id',videoN);
                      myVideo.setAttribute('width',100);
                      myVideo.setAttribute('height',70);
                      myVideo.setAttribute('controls','');
                     
                      readURL(this,videoN,0);
                      var scroll=document.getElementById('scroll');
                      scroll.style.display='';
                      var ulist=document.getElementById('list');
                      var videoName=document.createElement('div');
                      videoName.setAttribute('id','videoName');
                      videoName.innerHTML="<b>"+input.files.item(0).name+"</b>";
                      var list=document.createElement('li');
                      list.setAttribute('id','listItem');
                      list.setAttribute('class','list-group-item');
                      list.appendChild(table);
                      ulist.appendChild(list);
                      data1.appendChild(myVideo);
                      data2.appendChild(videoName);
                      data3.appendChild(imgBtn);
                      
                      videoCount+=1;
                      localStorage.setItem("videoCount",videoCount);
                      
                      }
      
                      else if(input.files.length>1){
                        
                        var videoCount=parseInt(localStorage.getItem("videoCount"));
                        
                        console.log("videCountMul"+videoCount);
                      for (var i = 0; i < input.files.length; ++i) {
                      filelist[i] = input.files.item(i).name;
                      console.log("ko "+i);
                      var table=document.createElement('table');
                      var row=document.createElement('tr');
                      table.appendChild(row);
                      var data1=document.createElement('td');
                      row.appendChild(data1);
                      var data2=document.createElement('td');
                      row.appendChild(data2);
                      var data3=document.createElement('td');
                      row.appendChild(data3);
      
                      var imgBtn=document.createElement('button');
                      imgBtn.setAttribute('id','deleteBtn');
                      imgBtn.setAttribute('width',2);
                      imgBtn.setAttribute('height',2);
                      imgBtn.setAttribute('class','buttont');
      
                      var image=document.createElement('i');
                      image.setAttribute('id','image');
                      image.setAttribute('class','fa fa-trash');
                      image.setAttribute('style','color:#000000');
                      image.setAttribute('width',20);
                      image.setAttribute('height',20);
      
                      imgBtn.appendChild(image);
      
                      var myVideo=document.createElement('video');
                      var videoN="video"+videoCount.toString();
               
                      myVideo.setAttribute('id',videoN);
                      myVideo.setAttribute('width',100);
                      myVideo.setAttribute('height',70);
                      myVideo.setAttribute('controls','');
      
                      readURL(this,videoN,i);
      
                      var scroll=document.getElementById('scroll');
                      scroll.style.display='';
                      var ulist=document.getElementById('list');
                      var videoName=document.createElement('div');
                      videoName.setAttribute('id','videoName');
                      videoName.innerHTML="<b>"+filelist[i]+"</b>";
                      var list=document.createElement('li');
                      list.setAttribute('id','listItem');
                      list.setAttribute('class','list-group-item');
                      ulist.appendChild(list);
                      data1.appendChild(myVideo);
                      data2.appendChild(videoName);
                      data3.appendChild(imgBtn);
                      list.appendChild(table);
                      videoCount+=1;
                      console.log(videoCount+":count");
                     // list.appendChild(videoName);
                      }
      
                      localStorage.setItem("videoCount",videoCount);
                     
                      }
                      
                    //  $("#fileUploader").val('null');
                      document.getElementById('albumVideo').setAttribute('multiple','multiple');
                      console.log('Done');
                      });
        
          });
}
