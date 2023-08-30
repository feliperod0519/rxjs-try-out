import { Injectable } from '@angular/core';
import { interval } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(filterStr:string){
    const timertTime = Math.floor(Math.random() * 10000);
    console.log(`SearchText: ${filterStr},Time taken by API: ${timertTime} milliseconds`);
    const obs$ = interval(timertTime).pipe(
        map(x=>{
        return [
            { id: 1, name: 'Minou' },
            { id: 2, name: 'Carolina' },
            { id: 3, name: 'Felipe' },
            { id: 4, name: 'Papa' },
            { id: 5, name: 'Juan Andres' },
            { id: 6, name: 'Gremlin' },
            { id: 7, name: 'Manchitas'},
            { id: 8, name: 'Deez Nuts'}
          ].filter(y=>y.name.includes(filterStr.toLowerCase()))
        })
    );
    return obs$;
  }
}
