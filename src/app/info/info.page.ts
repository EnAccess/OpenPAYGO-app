import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, TranslateModule],
})
export class InfoPage {
  constructor(
    private settingsService: SettingsService
  ) {}

  selectedMetricsURL:string = '';
  selectedLanguage:string = '';
  version:string = '';

  ngOnInit() {
    this.selectedMetricsURL = this.settingsService.getCurrentMetricsURL();
    this.selectedLanguage = this.settingsService.getCurrentLanguage();
    this.version = this.settingsService.version;
    console.log('Loaded metrics URL', this.selectedMetricsURL)
  }

  getAvailableLanguages() {
    return this.settingsService.getAvailableLanguages()
  }

  updateLanguage(event: any) {
    this.selectedLanguage = event.detail.value;
    console.log('Selected language:', this.selectedLanguage);
    this.settingsService.setLanguage(this.selectedLanguage)
  }

  getAvailableBackendServers() {
    return this.settingsService.getAvailableBackendServers()
  }

  updateMetricsURL(event: any) {
    this.selectedMetricsURL = event.detail.value;
    console.log('Selected metrics URL:', this.selectedMetricsURL);
    this.settingsService.setMetricsURL(this.selectedMetricsURL)
  }
}
