import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  OnInit,
  inject,
} from '@angular/core';
import * as Highcharts from 'highcharts';

import {
  NgElement,
  WithProperties,
  createCustomElement,
} from '@angular/elements';
import * as dayjs from 'dayjs';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, noop, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import Accessibility from 'highcharts/modules/accessibility';
import Exporting from 'highcharts/modules/exporting';

import { TranslationComponent } from '../translation/translation.component';
import {
  translationElementAttribute,
  translationElementTag,
} from 'src/app/constants/constants';
import { isNil } from 'src/app/utils/utils';
Accessibility(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private translocoService = inject(TranslocoService);

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions$ = new BehaviorSubject<Highcharts.Options>({});
  updateFlag: boolean = false;
  callbackFunction = () => {};
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  languageControl = new FormControl('en');

  constructor() {
    this.defineTranslationElement();
    this.listenToLanguageChanges();
  }

  ngOnInit(): void {
    this.createChart();
  }

  private defineTranslationElement() {
    if (isNil(customElements.get(translationElementTag))) {
      const translationElement = createCustomElement(TranslationComponent, {
        injector: this.injector,
      });
      customElements.define(translationElementTag, translationElement);
    }
  }

  private createTranslationElement() {
    const translationEl: NgElement & WithProperties<TranslationComponent> =
      document.createElement(translationElementTag) as any;
    return translationEl;
  }

  private createChartData() {
    const initDate = dayjs();
    const data = new Array(400).fill(null).map((el, index) => {
      return {
        x: initDate.clone().add(index, 'days').toDate().getTime(),
        y: Math.floor(Math.random() * 100),
      };
    });
    return data;
  }

  private createChart() {
    const data = this.createChartData();

    const titleTranslationElement = this.createTranslationElement();
    titleTranslationElement.setAttribute(
      translationElementAttribute,
      'shared.title'
    );

    const xAxisTitleTranslationElement = this.createTranslationElement();
    xAxisTitleTranslationElement.setAttribute(
      translationElementAttribute,
      'shared.x_axis_title'
    );

    const yAxisTitleTranslationElement = this.createTranslationElement();
    yAxisTitleTranslationElement.setAttribute(
      translationElementAttribute,
      'shared.y_axis_title'
    );

    const downloadPNGTranslationElement = this.createTranslationElement();
    downloadPNGTranslationElement.setAttribute(
      translationElementAttribute,
      'shared.download_png'
    );

    const serieNameTranslationElement = this.createTranslationElement();
    serieNameTranslationElement.setAttribute(
      translationElementAttribute,
      'shared.serie_name'
    );

    const chartOptions: Highcharts.Options = {
      title: {
        text: titleTranslationElement.outerHTML,
        useHTML: true,
        align: 'center',
      },
      xAxis: [
        {
          type: 'datetime',
          labels: {
            format: '{value:%a %H} Uhr',
          },
          crosshair: true,
          title: {
            text: xAxisTitleTranslationElement.outerHTML,
            useHTML: true,
          },
        },
      ],
      yAxis: [
        {
          labels: {
            format: '{value}',
          },
          title: {
            text: yAxisTitleTranslationElement.outerHTML,
            useHTML: true,
          },
        },
      ],
      legend: {
        useHTML: true,
      },
      tooltip: {
        useHTML: true,
      },
      exporting: {
        enabled: true,
      },
      lang: {
        downloadPNG: downloadPNGTranslationElement.outerHTML,
      },
      series: [
        {
          name: serieNameTranslationElement.outerHTML,
          type: 'spline',
          data: data,
          marker: {
            enabled: false,
          },
        },
      ],
    };

    this.chartOptions$.next(chartOptions);
  }

  private listenToLanguageChanges() {
    this.languageControl.valueChanges
      .pipe(
        startWith(this.languageControl.value),
        tap((lang) => {
          this.translocoService.setActiveLang(lang!);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(noop);
  }
}
