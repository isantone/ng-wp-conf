import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = 'HeaderComponent';

  constructor() { }

  ngOnInit() {
  }
}
