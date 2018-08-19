import angular from 'angular';

import { exampleComponent } from './components/example/example.component';

export const appModule = angular.module('app', [
]);

appModule
  .component('wpcExample', exampleComponent)
;
