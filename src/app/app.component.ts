import { Component } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'wpc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'AppComponent';

  private getLodashDifference(arr1, arr2) {
    return _.difference(arr1, arr2);
  }
}
