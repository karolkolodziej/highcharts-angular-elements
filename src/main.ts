import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as Highcharts from 'highcharts';
import {
  translationElementAttribute,
  translationElementTag,
} from './app/constants/constants';

if (Highcharts && Highcharts.AST) {
  Highcharts.AST.allowedTags = [
    ...Highcharts.AST.allowedTags,
    translationElementTag,
  ];
  Highcharts.AST.allowedAttributes = [
    ...Highcharts.AST.allowedAttributes,
    translationElementAttribute,
  ];
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
