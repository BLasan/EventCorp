import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchArtist'
})
// check whether input text(search text) includes in atrists' names
export class SearchArtistPipe implements PipeTransform{
    transform(artist:any[],searchText:string):any[]{
        if(!artist) return [];
        if(!searchText) return artist;

        searchText = searchText.toUpperCase();
        return artist.filter(artist=>{
            if(artist.user_name.toUpperCase().includes(searchText)) return artist;
        })
    }
}