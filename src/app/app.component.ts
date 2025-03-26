import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: '<div class="min-h-screen"><app-header/><router-outlet/></div>',

})
export class AppComponent {

}