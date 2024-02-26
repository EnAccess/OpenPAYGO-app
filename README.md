# OpenPAYGO App

This repository is for the OpenPAYGO App. It is a mobile app that allows users to connect their OpenPAYGO-compatible device using OpenPAYGO Pass, Bridge or AirBridge to any PAYGO software provider supporting OpenPAYGO Metrics. 

<p align="center">
  <img
    alt="Project Status"
    src="https://img.shields.io/badge/Project%20Status-stable-green"
  >
  <a href="https://github.com/EnAccess/OpenPAYGO-app/blob/main/LICENSE" target="_blank">
    <img
      alt="License"
      src="https://img.shields.io/github/license/EnAccess/openpaygo-app"
    >
  </a>
</p>

## Credits

This open-source project was developped by Solaris Offgrid. Funding for this project for was provided by EnAccess. 


## Libraries
The app is based on Ionic: https://ionicframework.com/docs/

And uses the following plugins: 
- NFC: https://github.com/chariotsolutions/phonegap-nfc


## Important Information
- When testing, you might need to use an external app to set the type of the tag to "application/openpaygo" with an empty payload before you can use the "write test data" so that the OS does not take offer the NFC event (this depends on the model of your phone)
