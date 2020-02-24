import { store } from '../redux/store';
import {
    createGoogleInitAction,
    createGoogleInitSuccessAction,
    createGoogleInitErrorAction,
    createGoogleLoginAction,
    createGoogleLoginSuccessAction,
    createGoogleLoginErrorAction,
    createGoogleLoadDocumentAction,
    createGoogleLoadNewDocumentAction,
    createGoogleLoadDocumentSuccessAction,
    createGoogleLoadDocumentErrorAction,
    createGoogleFileInfoAction,
    createGoogleFileInfoSuccessAction,
    createGoogleFileInfoErrorAction,
    createGoogleSaveDocumentAction,
    createGoogleSaveDocumentSuccessAction,
    createGoogleSaveDocumentErrorAction
} from '../redux/googleaction';
import DriveAppsUtil from 'drive-apps-util';

let driveAppsUtil;

export function initGoogle(options) {
    store.dispatch(createGoogleInitAction(options));
    driveAppsUtil = new DriveAppsUtil(options);
    driveAppsUtil.init().then(() => {
        store.dispatch(createGoogleInitSuccessAction());
    }, (error) => {
        store.dispatch(createGoogleInitErrorAction(error));
    });
}

export function login() {
    if (driveAppsUtil != undefined) {
        store.dispatch(createGoogleLoginAction());
        driveAppsUtil.login().then((user) => {
            store.dispatch(createGoogleLoginSuccessAction(user));
        },
            (error) => {
                store.dispatch(createGoogleLoginErrorAction(error));
            });
    }
}

export function loadGoogleDocument(id, isNew) {
    if (driveAppsUtil != undefined) {
        if (isNew) {
            store.dispatch(createGoogleLoadNewDocumentAction(id));
        }
        else {
            store.dispatch(createGoogleLoadDocumentAction(id));
        }
        driveAppsUtil.getDocumentContent(id).then((text) => {
            store.dispatch(createGoogleLoadDocumentSuccessAction(text));
            store.dispatch(createGoogleFileInfoAction());
            driveAppsUtil.getDocumentMeta(id).then((fileinfo) => {
                store.dispatch(createGoogleFileInfoSuccessAction(fileinfo));
            },
                (error) => {
                    store.dispatch(createGoogleFileInfoErrorAction(error));
                });
        },
            (error) => {
                store.dispatch(createGoogleLoadDocumentErrorAction(error));
            });
    }
}


export function saveDocument(content) {
    let googleDocument = store.getState().get('googleDocument');
    store.dispatch(createGoogleSaveDocumentAction());
    let metadata = JSON.stringify({
        name: googleDocument.get('fileinfo').name,
        mimeType: "application/dmn+xml",
    });

    driveAppsUtil.updateDocument(googleDocument.get('id'), metadata, content).then((fileinfo) => {
        store.dispatch(createGoogleSaveDocumentSuccessAction(fileinfo));
    }, (error) => {
        store.dispatch(createGoogleSaveDocumentErrorAction(error));
    });
}
