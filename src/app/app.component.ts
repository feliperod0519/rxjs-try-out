import { Component,OnInit,ViewChild, ElementRef } from '@angular/core';
import { Examples } from './examples'
import { DataService } from './data.service';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'rxjs-examples';
  @ViewChild('search', { static: true }) search: ElementRef = {} as ElementRef;
  users: { id: number; name: string }[] = [];

  constructor(private dataService: DataService){
  }

  ngOnInit():void{
    const ex = new Examples();
    //ex.takeExample();
    //ex.mapExample();
    //ex.pluckExample();
    //ex.mergeMap1();
    //ex.mergeMap2();
    //ex.switchMap1();

    fromEvent(this.search.nativeElement,'input').pipe(
      map((event: any)=>{
        return event.target.value;
      }),
      switchMap<string,Observable<{ id: number; name: string }[]>>
      (searchVal=>{
        return this.dataService.getData(searchVal as string);
      })
    ).subscribe(arr=>this.users=arr);
  }



  
}
