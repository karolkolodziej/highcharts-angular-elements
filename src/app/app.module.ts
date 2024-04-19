import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationComponent } from './components/translation/translation.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [AppComponent, TranslationComponent, ChartComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    HighchartsChartModule,
    TranslocoRootModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
