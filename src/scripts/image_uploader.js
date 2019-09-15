
export function image_uploader(){

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

    }


export function remove_uploader(){
    $('#profile_img').val("");
    $('#profile_pic').attr('src','assets/img/pro_img.png')
}


// export function upload_images(){

//     $(document).on("click","#event_image_uploader",function(e){
//         e.preventDefault();
//         $('#imgInp').unbind().click();
//         $('#container').attr('class','container1');
//         function readURL(input) {
//             // for(var i=0;i<input.files.length;i++){

//             //     let img_col="#img_col";
//             //     let img_col_div="img_col";
//             //     let image_id="#image";
//             //     let image_id_div="image";
//             //     let checked=i;
//             //     let del="#del";
//             //     let del_div="del";
//             //     if(i>0){
//             //         image_id="#image"+i;
//             //         img_col="#img_col"+i;
//             //         image_id_div="image"+i;
//             //         img_col_div="img_col"+i;
//             //         del="#del"+i;
//             //         del_div="del"+i;
//             //     } 

//             //     if (input.files && input.files[i]) {
//             //         var reader = new FileReader();
//             //         reader.onload = function (e) {
//             //             // alert(e.target.result)
//             //             console.log(img_col);

//             //             if(checked!=0)
//             //             $("#img_row").append("<div class='col-3' id="+img_col_div+"><div style='width:60px;height:60px' name='imageUploaded' id='imageUploaded'><div id='containers' class='container1'><img src='' name='image' id="+image_id_div+"><button mat-raised-button class='btn1' id="+del_div+" style='display: none'><i class='material-icons'>delete_forever</i></button></div></div></div>")
//             //             $(image_id).attr('src',e.target.result);
//             //             $(image_id).attr('style','width:60px;height:60px');
//             //             $(del).removeAttr('style');
//             //         }
//             //         reader.readAsDataURL(input.files[i]);
//             //     }
        
//             //     else
//             //     alert("Upload an image")
//             // }


//                 if (input.files && input.files[0]) {
//                     var reader = new FileReader();
                    
//                     reader.onload = function (e) {
//                         // alert(e.target.result)
//                         $('#image').attr('src',e.target.result);
//                         $('#image').attr('style','width:60px;height:60px');
//                         $('#del').removeAttr('style');
//                     }
                    
//                     reader.readAsDataURL(input.files[0]);
//                 }
        
//                 else
//                 alert("Upload an image")
//         }
    
//         $("#imgInp").change(function(){
//             readURL(this);
//         });
//     });
// }

