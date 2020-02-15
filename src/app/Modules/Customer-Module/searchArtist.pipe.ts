import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchArtist'
})
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