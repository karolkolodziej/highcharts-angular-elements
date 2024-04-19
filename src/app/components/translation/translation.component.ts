import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { translationElementAttribute } from 'src/app/constants/constants';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        border: 1px solid transparent;
      }
    `,
  ],
})
export class TranslationComponent {
  @Input(translationElementAttribute) translationKey: string = 'shared.empty';
}
