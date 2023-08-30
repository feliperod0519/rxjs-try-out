import { interval, of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax';
import { take, map, pluck, mergeMap, delay, switchMap } from 'rxjs/operators'

export class Examples{

    takeExample(){
        interval(1000).pipe(
                        take(10),
        ).subscribe(x=>console.log(x));
    }

    //Transformation

    mapExample(){
        interval(1000).pipe(
            map(i=>{
                let x = i*10;
                return x;
            }),
            take(5)
        ).subscribe(x=>console.log(x));
    }

    pluckExample(){
        const source$ = of({a:{key:1}},{a:{key:2}},{a:{key:3}});
        source$.pipe(
            map(x=>JSON.stringify(x))
        ).subscribe(x=>console.log(x))
        source$.pipe(
            pluck('a')
        ).subscribe(x=>console.log(x));
    }

    mergeMap1(){
        const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';
        // {
        //     userId: 1,
        //     id: 1,
        //     title: "delectus aut autem",
        //     completed: false
        // }
        const click$ = fromEvent(document, 'click');
        click$.pipe(
            mergeMap(()=>ajax.getJSON(API_URL))
        ).subscribe(x=>console.log(x));
    }

    mergeMap2(){
        const saveLocation = (loc:any) => { 
            return of(loc).pipe(delay(5000));
        }
        const click$ = fromEvent(document, 'click');
        
        click$.pipe(
            mergeMap<Event,any>(e=>
            {
                const pE = e as PointerEvent;
                console.log(Date.now())
                return saveLocation({x:pE.clientX,y:pE.clientY, tS:Date.now()})
            })
        ).subscribe(x=>console.log(x));
    }

    switchMap1(){
        fromEvent(document,'click').pipe(
            switchMap(()=>interval(1000))
        ).subscribe(x=>console.log(x));
    }
}