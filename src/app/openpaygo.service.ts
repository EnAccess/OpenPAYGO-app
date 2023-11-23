import { Injectable } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class OpenpaygoService {

  constructor(
    private http: HttpClient,
    private nfc: NFC,
    private ndef: Ndef,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private translate: TranslateService,
  ) { }

  openPaygoMetricsURL: string = '';

  lastPassData: string = '';
  lastResponseData: string = '';

  currentLoader: any;

  activeSubscription: any;

  // setupPass() // This one does everything, including setting up listener, but depends on the specific NFC library
  // processNFCPayload(payload, onerror, onsuccess) // This takes only a clean NFC payload, returns the answer to be written on success

  // --- NFC Specific functions ---
  setupPass(metricsURL:string) {
    this.openPaygoMetricsURL = metricsURL;
    this.nfc.enabled().then(
      (success:any) => {
        // NFC enabled
        this.registerTagEvent()
      },
      (error:any) => {
        if (error === 'NFC_DISABLED') {
          // NFC present but disabled
          this.alertController.create({
            header: this.translate.instant('PLEASE_ENABLE_NFC'),
            message: this.translate.instant('PLEASE_ENABLE_NFC_DETAILS'),
            buttons: [{
              text: this.translate.instant('ENABLE_NFC'),
              handler: () => {
                this.dismissCurrentAlert()
                this.nfc.showSettings() // We show the menu to have the settings
              }
            },
            {
              text: this.translate.instant('CANCEL'),
              handler: () => {
                this.dismissCurrentAlert()
              }
            }],
          }).then(a => {
            a.present()
            this.currentLoader = a
          })
        } else if (error === 'NO_NFC') {
          // NFC not present
          this.alert(this.translate.instant('NFC_NOT_SUPPORTED'))
        }
      }
    );
  }

  removePassSetup() {
    if(this.activeSubscription) {
      this.activeSubscription.unsubscribe()
    }
  }

  registerTagEvent () {
    this.removePassSetup()
    this.activeSubscription = this.nfc.addMimeTypeListener('application/openpaygo', () => {}, () => {this.alert(this.translate.instant('CANNOT_SETUP_NFC'))}).subscribe((data:any) => {this.processNFCTapped(this.nfc.bytesToString(data.tag.ndefMessage[0].payload))})
  }

  setupDataWriter(payload:any) {
    this.activeSubscription = this.nfc.addTagDiscoveredListener(() => {}, () => {this.alert(this.translate.instant('CANNOT_SETUP_NFC'))}).subscribe((data:any) => {
      this.writeNFC(payload)
      this.removePassSetup()
    })
    this.alert(this.translate.instant('TESTS_PASS_WRITE_READY'), this.translate.instant('TESTS_PASS_WRITE_READY_DETAILS'))
  }

  writeNFC(payload:any) {
    var message = [
      this.ndef.mimeMediaRecord("application/openpaygo", payload)
    ];
    this.nfc.write(message).then(() => {
        this.alert(this.translate.instant('PASS_WRITE_SUCCESS'), this.translate.instant('PASS_WRITE_SUCCESS_DETAILS'))
        this.lastPassData = ''
      }, 
      () => {this.alert(this.translate.instant('PASS_WRITE_FAIL'), this.translate.instant('PASS_WRITE_FAIL_DETAILS'))}
    )
  }

  // --- Core functions - Do not depend on NFC ---

  // Flow:
  // Get data from NFC, show the alert for the process function
  // When completed, show the success alert and tell them to tap again
  // If the function is called again, then we write and in the data and alert that its done

  processNFCTapped(payload:any) {
    console.log('Payload Read:', payload)
    // We start the loader here
    this.dismissCurrentAlert()
    this.loadingCtrl.create({
      message: this.translate.instant('PASS_PROCESSING'),
      duration: 30000
    }).then(a => {
      this.currentLoader = a
      a.present()
      this.processNFCPayload(payload, (result) => {
        this.dismissCurrentAlert()
        if(result.status == 'DATA_UPLOADED') {
          this.alertController.create({
            header: this.translate.instant('PASS_DATA_UPLOADED'),
            message: this.translate.instant('PASS_DATA_UPLOADED_DETAILS'),
            buttons: [{
              text: this.translate.instant('OK'),
              handler: () => {
                this.dismissCurrentAlert()
                this.loadingCtrl.create({
                  message: this.translate.instant('PASS_WAITING_TAP'),
                  duration: 30000
                }).then(a => {
                  this.currentLoader = a
                  a.present()
                })
              }
            },
            {
              text: this.translate.instant('CANCEL'),
              handler: () => {
                this.dismissCurrentAlert()
              }
            }],
          }).then(a => {
            this.currentLoader = a
            a.present()
          })
        }
        else if(result.status == 'READY_TO_WRITE') {
          this.writeNFC(result.reponsePayload)
        }
      }, (error) => {
        this.dismissCurrentAlert()
        this.alert(this.translate.instant('METRICS_SERVER_ERROR'), this.translate.instant('METRICS_SERVER_ERROR_DETAILS'))
      })
    })
  }

  processNFCPayload(payload:any, onsuccess:(result: any) => any, onerror:(error: any) => any) {
    if(this.lastPassData != payload || !this.lastResponseData) {
      this.lastPassData = payload
      const httpOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      this.http.post(this.openPaygoMetricsURL, payload, httpOptions).subscribe(response => {
        console.log('Response received', response)
        this.lastResponseData = JSON.stringify(response)
        onsuccess({'status': 'DATA_UPLOADED'})
      }, error => {
        console.log('Error communicating with the server', error)
        onerror({'status': 'SERVER_COMMUNICATION_ERROR'})
      });
    } else {
      onsuccess({'status': 'READY_TO_WRITE', 'reponsePayload': this.lastResponseData})
    }
  }

  // --- UI Helpers ---

  dismissCurrentAlert() {
    if(this.currentLoader) {
      this.currentLoader.dismiss()
    }
  }

  alert(title:any, msg:any = '') {
    this.dismissCurrentAlert()
    this.alertController.create({
      header: title,
      message: msg,
      buttons: [this.translate.instant('OK')],
    }).then(a => {
      a.present()
      this.currentLoader = a
    })
  }
}
