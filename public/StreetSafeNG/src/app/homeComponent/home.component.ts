import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  shelterClicked = false;
  foodClicked = false;
  transportClicked = false;

  clickShelter() {
    if (!this.shelterClicked) {
    this.shelterClicked = true;
    } else {
      this.shelterClicked = false;
    }
  }

  clickFood() {
    if (!this.foodClicked) {
    this.foodClicked = true;
    } else {
      this.foodClicked = false;
    }
  }

  clickTransport() {
    if (!this.transportClicked) {
    this.transportClicked = true;
    } else {
      this.transportClicked = false;
    }
  }
}
