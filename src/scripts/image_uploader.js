$(document).on("click","#image_uploader",function(){
    $('#profile_img').click();

    function readURL(input) {
      
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               $('#profile_pic').attr('src',e.target.result);
                      
            }
            
            reader.readAsDataURL(input.files[0]);
        }

        else
        alert("Upload an image")
    }

    $("#profile_img").change(function(){
        readURL(this);
    });

});


$(document).on("click","#remove",function(){
    $('#profile_img').val("");
    $('#profile_pic').attr('src','assets/img/pro_img.png')
});
