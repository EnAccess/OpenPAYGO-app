import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { supportedLanguagesList } from './constants'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private translate: TranslateService) {
    // We initialize the language
    translate.setDefaultLang('en');
    translate.use('en');
    var language = localStorage.getItem('language')
    if(language) {
      translate.use(language);
    } else {
      // We get the system language
      const userLanguage = navigator.language;
      const primaryLanguageCode = userLanguage.split('-')[0];
      if (supportedLanguagesList.includes(primaryLanguageCode)) {
        translate.use(primaryLanguageCode);
        localStorage.setItem('language', primaryLanguageCode);
      }
    }
  }
}
