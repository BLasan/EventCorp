import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchVenue'
})
export class SearchVenuePipe implements PipeTransform{
    transform(venue:any[],searchText:string):any[]{
        if(!venue) return [];
        if(!searchText) return venue;

        searchText = searchText.toUpperCase();
        return venue.filter(venue=>{
            if(venue.v_name.toUpperCase().includes(searchText)) return venue;
        })
    }
}