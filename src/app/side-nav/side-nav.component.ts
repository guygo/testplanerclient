import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(
    private sidenav: SidenavService) { }

  toggleRightSidenav() {
      this.sidenav.toggle();
   }
  ngOnInit() {
  }

}
