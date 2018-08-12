import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('hi');
    console.log('there');

    console.warn(_.intersection([1, 2, 3], [2, 3, 4]));
  }
}
