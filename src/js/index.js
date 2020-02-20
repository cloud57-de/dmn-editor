import MarterialDesign from 'material-design-lite';
import DmnJS from 'dmn-js';
import { initGoogle, login, loadGoogleDocument } from './api/googleservice';
import { showUserImage } from './ui/userimage';
import { hideSplash } from './ui/splash';


let options = {
    "clientId": "157875625953-8r93qu5o4fl2tfjs8viefhcqrcbv76d6.apps.googleusercontent.com",
    "scope": [
        "profile",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.install"
    ]
};

let processFlowListener = () => {
    let state = store.getState();
    let actionType = state.get('actionType');
    if (actionType === GOOGLE_INIT_SUCCESS) {
      login();
    }
    else if (actionType === GOOGLE_LOGIN_SUCCESS) {
      showUserImage();
      if (window.location.search) {
        hideSplash();
        let searchString = window.location.search;
        if (searchString.startsWith("?id=")) {
          loadGoogleDocument(searchString.substr(4));
        }
        else {
          let stateURL = JSON.parse(decodeURI(searchString.substr(7)));
          if (stateURL.action === "open") {
            loadGoogleDocument(stateURL.ids[0]);
          }
          else if (stateURL.action === 'create') {
            //createNewPasswordDB("New Password DB", stateURL.folderId);
            
          }
        }
      }
    }
    else if (actionType === GOOGLE_LOADDOCUMENT_SUCCESS) {
      history.pushState("{}", "Load document", location.origin + "/?id=" + state.get("googleDocument").get("id"));
    }
    else if (actionType === GOOGLE_FILEINFO_SUCCESS) {
      setDocumentInfo(state.get('googleDocument').get('fileinfo').name);
    }
  };
  store.subscribe(processFlowListener);
  
  initGoogle(options);
