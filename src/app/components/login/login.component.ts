import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  festivalGoerTabIsActive: boolean = true;

  enableFestivalGoerTab() {
    this.festivalGoerTabIsActive = true;
  }

  disableFestivalGoerTab() {
    this.festivalGoerTabIsActive = false;
  }
}
