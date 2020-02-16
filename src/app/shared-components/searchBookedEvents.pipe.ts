import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchBookedEvents'
})
export class SearchBookedEventsPipe implements PipeTransform{
    transform(events:any[],searchEvents:string):any[]{
        if(!events) return [];
        if(!searchEvents) return events;

        searchEvents = searchEvents.toUpperCase();
        return events.filter(items=>{
           
            if(items.event_name.toUpperCase().includes(searchEvents)) return items;
        })
    }
}