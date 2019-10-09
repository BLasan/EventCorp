
export function disable_room_id(){
    $(document).click('#room_id',function(e){
        e.preventDefault();
    })
}

export function disable_open_chat(){
    $(document).click('#open_chat_selected',function(e){
        e.preventDefault();
    })
}

export function disable_close_chat(){
    $(document).click('#close_chat_href',function(e){
        e.preventDefault();
    })
}