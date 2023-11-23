import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bridge',
  templateUrl: 'bridge.page.html',
  styleUrls: ['bridge.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule]
})
export class BridgePage {

  constructor() {}

}
