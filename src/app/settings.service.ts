import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { supportedLanguages } from './constants'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { 
    this.initBackendServers()
  }

  version:string = '0.0.0001';

  // --- Language Settings

  getAvailableLanguages() {
    return supportedLanguages
  }

  getCurrentLanguage() {
    var language = localStorage.getItem('language')
    if(language) {
      return language
    }
    return 'en'
  }

  setLanguage(language:string) {
    this.translate.use(language)
    localStorage.setItem('language', language);
  }

  // --- Backend Server Setting

  backendServers:any = [];

  initBackendServers() {
    this.http.get('assets/server_registry.json').subscribe((data:any) => {
      console.log('Loaded the server registry file', data)
      this.backendServers = data;
    })
  }

  getAvailableBackendServers() {
    return this.backendServers
  }
  
  getCurrentMetricsURL() {
    var loadedMetricsURL = localStorage.getItem('openpaygo_metrics_url')
    if(loadedMetricsURL) {
      return loadedMetricsURL
    }
    return this.getAvailableBackendServers()[0].url
  }

  setMetricsURL(metricsURL:string) {
    localStorage.setItem('openpaygo_metrics_url', metricsURL);
  }
}
