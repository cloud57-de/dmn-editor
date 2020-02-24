import MarterialDesign from 'material-design-lite';
import { initGoogle, login, loadGoogleDocument } from './api/googleservice';
import { showUserImage } from './ui/userimage';
import { setDocumentInfo } from './ui/fileinfo';
import { hideSplash } from './ui/splash';
import { store } from './redux/store';
import { GOOGLE_INIT_SUCCESS, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOADDOCUMENT_SUCCESS, GOOGLE_FILEINFO_SUCCESS, GOOGLE_SAVEDOCUMENT_SUCCESS } from './redux/googleaction';
import { showDocument, editorZoomIn, editorZoomOut, editorZoomToFit, initEditorAction } from './ui/dmn';
import { ZOOM_IN, ZOOM_OUT, ZOOM_TO_FIT } from './redux/editoractions';
import { showInfoMessage } from './ui/notification';


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
      showDocument(state.get('googleDocument').get('text'));
    }
    else if (actionType === GOOGLE_FILEINFO_SUCCESS) {
      setDocumentInfo(state.get('googleDocument').get('fileinfo').name);
    }
    else if (actionType === ZOOM_IN) {
      editorZoomIn();
    }
    else if (actionType === ZOOM_OUT) {
      editorZoomOut();
    }
    else if (actionType === ZOOM_TO_FIT) {
      editorZoomToFit();
    }
  };
  store.subscribe(processFlowListener);

  let notificationListener = () => {
    let state = store.getState();
    let actionType = state.get('actionType');
    if (actionType === GOOGLE_INIT_SUCCESS) {
      showInfoMessage("Google API loaded")
    }
    else if (actionType === GOOGLE_LOGIN_SUCCESS) {
      showInfoMessage("Google login succeded");
    }
    else if (actionType === GOOGLE_LOADDOCUMENT_SUCCESS) {
      showInfoMessage('Document loaded');
    }
    else if (actionType === GOOGLE_SAVEDOCUMENT_SUCCESS) {
      showInfoMessage('Document saved');      
    }

  };
  store.subscribe(notificationListener);
  
  initEditorAction();
  initGoogle(options);
  

