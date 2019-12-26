
export function disable_room_id(){
   // alert('1')
    $(document).click('#room_id',function(e){
        e.preventDefault();
    })
}

export function disable_open_chat(){
   // alert('2')
    $(document).click('#open_chat_selected',function(e){
        e.preventDefault();
    })
}

export function disable_close_chat(){
   // alert('3')
    $(document).click('#close_chat_href',function(e){
        e.preventDefault();
    })
}

export function disable_drop_down(){

    $(document).on('click','#profileDropDown',function(e){
       // e.preventDefault();
       
        $("#menuList").removeClass("hiding")
        // $('#menuList').removeAttr('class');
        // $('#menuList').attr('class','dropdown-menu');
        // $('#menuList').attr('class','dropdown-menu-right');
        // $('#menuList').attr('class','show');
        // $('#menuList').attr('style','background-color:white');
    });

   
}

export function previous_mode(){
    $('#profileDropDown').on('click',function(e){
        $("#menuList").removeClass("hiding")
    })
}

export function disable_item_image_uploader(){
    $(document).on('click','#item_image_uploader',function(e){
        e.preventDefault();
    }) 
}

export function disable_load_more(){
    $(document).on('click','#load_more',function(e){
        e.preventDefault();
    }) 
}

export function disable_visibility(){
    alert("J")
    $(document).on('click','#visibility',function(e){
        e.preventDefault();
    }) 
}


export function disable_playlist_uploader(){
    $(document).on('click','#add_playlist',function(e){
        e.preventDefault();
        $('#playlist_uploader').click();
    }) 
}


export function disable_modal_open(){
    $(document).on('click','#modal_open',function(e){
        e.preventDefault();
       
    })    
}

export function disable_remove_files(){
    $(document).on('click','#remove_files',function(e){
        e.preventDefault();
    })    
}

export function disable_logout(){
    $(document).on('click','#logout_link_href',function(e){
        e.preventDefault();
    })    
}

export function disable_calendarModal(){
    $(document).on('click','#calendarModalLink',function(e){
        e.preventDefault();
    }) 
}