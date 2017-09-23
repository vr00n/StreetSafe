import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { EntryService } from './entry.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'entry-component',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
    constructor(
		private http: Http,
		private entryService: EntryService
    ){};
    
    entrys= [
        {title: 'Boulder Shelter for the Homeless',
        address: '1234 something'},
        {title: 'Path to Home, Monday'}
    ]
    ngOnInit(): void{
        this.entryService.getEntrys()
        .then(
            entrys => {
                this.entrys = entrys;
            }
        );
    }
}
