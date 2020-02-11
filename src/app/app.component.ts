import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { AuthService } from './auth/auth.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
