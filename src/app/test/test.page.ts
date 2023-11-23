import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Internal services
import { OpenpaygoService } from '../openpaygo.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, TranslateModule]
})
export class TestPage implements OnInit {

  constructor(
    private openpaygo: OpenpaygoService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  getExamplePayload() {
    // This payload uses the testing-only "simple auth" method on a test device which allows us 
    // to easily change it on the fly with the current timestamp without implementing the auth
    var timestamp_string:string = Math.floor(Date.now() / 1000).toString();
    return '{"sn":"123456789","df":30,"ts":'+timestamp_string+',"d":[13,false,"1.14.2"],"hd":[[17.5,12.5,2.2,3.2,0.7],[15.7,12.6,2.2,3.2,0.7],[16.5,12.7,2.2,3.2],[16.5,12.7,2.2,3.2,0.9,0.8,true],[16.5,12.7,2.2,3.2,0.7]],"a":"safc3b3b17654c3e17"}'
  }

  testPassFlow() {
    // This simulates a pass being tapped on the phone but does not call the NFC library
    // It can be used for local testing in development
    this.openpaygo.setupPass(this.settingsService.getCurrentMetricsURL())
    this.openpaygo.processNFCTapped(this.getExamplePayload())
    this.openpaygo.removePassSetup()
  }

  writePassTestData() {
    // This will write test data to a physical pass to allow for testing the flow without a device
    this.openpaygo.setupDataWriter(this.getExamplePayload())
  }

}
