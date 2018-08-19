import template from './example.template.html';
import './example.component.scss';

import * as _ from 'lodash';

const bindings = {
  someInput: '<',
  someOutput: '&',
}
class ExampleController {
  constructor() {
    this.name = `ExampleComponent`;
  }

  getTitle() {
    this.title = 'Hello from AngularJS Example Component';

    return this.title;
  }

  getLodashIntersection(arr1, arr2) {
    console.warn(_.intersection(arr1, arr2));

    return _.intersection(arr1, arr2);
  }
}

export const exampleComponent = {
  bindings,
  template,
  controller: ExampleController,
}
