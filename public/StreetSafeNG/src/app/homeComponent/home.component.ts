import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  shelterClicked= false;
  clickShelter() {
    if (!this.shelterClicked) {
    this.shelterClicked = true;
    } else {
      this.shelterClicked = false;
    }
  }
}
