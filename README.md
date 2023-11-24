# OpenPAYGO App

This repository is for the OpenPAYGO App. It is a mobile app that allows users to connect their OpenPAYGO-compatible device using OpenPAYGO Pass, Bridge or AirBridge to any PAYGO software provider supporting OpenPAYGO Metrics. 


## Libraries
The app is based on Ionic: https://ionicframework.com/docs/

And uses the following plugins: 
- NFC: https://github.com/chariotsolutions/phonegap-nfc


## Important Information
- When testing, you might need to use an external app to set the type of the tag to "application/openpaygo" with an empty payload before you can use the "write test data" so that the OS does not take offer the NFC event (this depends on the model of your phone)

## Known Issues
- On some phones with Android version 13, the app does not seem to be able to start. If you encounter this issue please share the details of your phone model and make. 