import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entry-component',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
    entrys= [
        {title: 'Boulder Shelter for the Homeless',
        address: '1234 something'},
        {title: 'Path to Home, Monday'}
    ]
  ngOnInit(): void{

  }
}
