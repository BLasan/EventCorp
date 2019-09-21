export function upload_images(){
    
    $(document).on("click","#event_image_uploader",function(e){
        e.preventDefault();
        $('#imgInput').click();
        $('#container').attr('class','container1');
        function readURL(input) { 
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    // alert(e.target.result)
                    $('#image').attr('src',e.target.result);
                    $('#image').attr('style','width:60px;height:60px');
                    $('#del').removeAttr('style');
                } 
                reader.readAsDataURL(input.files[0]);
            }
            else
            alert("Upload an image")
        }
        $("#imgInput").change(function(){
    
            readURL(this);
        });
    });
}



export function upload_video(){

    $(document).on("click","#video_uploader",function(e){
    e.preventDefault();
    $('#videoInp').click();
    $('#videoUploaded').attr('class','container1');
    function readURL(input) {
      
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               // alert(e.target.result)
                 $('#myVideo').removeAttr('style')
                 $('#myVideo').attr('src',e.target.result);
                 $('#myVideo').attr('width','100px');
                 $('#myVideo').attr('height','200px');
                 $('#del_video').removeAttr('style');
            }
            
            reader.readAsDataURL(input.files[0]);
        }

        else
        alert("Upload a video")
    }

    $("#videoInp").change(function(){
        readURL(this);
    });

});
}

export function delete_image(){
    $(document).on("click","#del",function(){
        $('#imgInput').val("");
        $('#image').removeAttr('src')
        $('#del').attr('style','display:none');
        $('#container').removeAttr('class');
        $('#image').removeAttr('style');
    });
}

export function delete_video(){
    $(document).on("click","#del_video",function(){
        $('#videoInp').val("");
        $('#myVideo').removeAttr('src')
        $('#myVideo').attr('style','display:none');
        $('#del_video').attr('style','display:none');
        $('#videoUploaded').removeAttr('class');
    
    });
}
    
    

