import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { OpenpaygoService } from '../openpaygo.service';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService } from '../settings.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-pass',
  templateUrl: 'pass.page.html',
  styleUrls: ['pass.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule],
  providers: [NFC, Ndef]
})
export class PassPage {
  constructor(
    private router: Router,
    private openpaygo: OpenpaygoService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    // This sets up a background listener on NFC that will automatically handle any OpenPAYGO Pass
    // tapped on the phone and present the user with instructions
    // For now it is hardcoded to the paygops URL
    // We move the NFC listener when we leave the page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/tabs/pass') {
          console.log('Setting up NFC listener for pass')
          this.openpaygo.setupPass(this.settingsService.getCurrentMetricsURL())
        } else {
          console.log('Removing NFC listener for pass')
          this.openpaygo.removePassSetup()
        }
      }
    });
    
  }
}
