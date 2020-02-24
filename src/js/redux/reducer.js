import {
    GOOGLE_INIT,
    GOOGLE_INIT_SUCCESS,
    GOOGLE_INIT_ERROR,
    GOOGLE_LOGIN,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_ERROR,
    GOOGLE_LOADDOCUMENT,
    GOOGLE_LOADNEWDOCUMENT,
    GOOGLE_LOADDOCUMENT_SUCCESS,
    GOOGLE_LOADDOCUMENT_ERROR,
    GOOGLE_FILEINFO_SUCCESS,
    GOOGLE_SAVEDOCUMENT_SUCCESS
} from './googleaction';

import { Map, List } from 'immutable';
import { ZOOM_IN } from './editoractions';


export const initialState = Map({
    status: "uninitialized",
    googleDocument: Map({
        id: "",
        fileinfo: "",
        text: "",
        isLoaded: false
    }),
    actionType: ''
});



function DMNEditorApp(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case GOOGLE_INIT:
            newState = state.set('status', 'google-init-pending');
            break;
        case GOOGLE_INIT_SUCCESS:
            newState = state.set('status', 'google-init').set('infomsg', "Google API initialized");
            break;
        case GOOGLE_INIT_ERROR:
            newState = state.set('status', 'google-init-error').set('errormsg', action.error);
            break;
        case GOOGLE_LOGIN:
            newState = state.set('status', 'google-login-pending');
            break;
        case GOOGLE_LOGIN_SUCCESS:
            newState = state.set('status', 'google-login')
                .set('user', action.user)
                .set('infomsg', "Google Login successful");
            break;
        case GOOGLE_LOGIN_ERROR:
            newState = state.set('status', 'google-login-error').set('errormsg', action.error);
            break;
        case GOOGLE_LOADNEWDOCUMENT:
            newState = state.set('status', 'google-loaddocument-pending')
                .set('googleDocument', state.get('googleDocument')
                    .set('id', action.id)
                    .set('isLoaded', false)
                    .set('isnew', true)
                );
            break;
        case GOOGLE_LOADDOCUMENT:
            newState = state.set('status', 'google-loaddocument-pending')
                .set('googleDocument', state.get('googleDocument')
                    .set('id', action.id)
                    .set('isLoaded', false)
                );
            break;
        case GOOGLE_LOADDOCUMENT_SUCCESS:
            newState = state.set('status', 'google-loaddocument')
                .set('infomsg', "DMN Document loaded")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                    .set('text', action.text)
                    .set('isLoaded', true)
                );
            break;
        case GOOGLE_LOADDOCUMENT_ERROR:
            newState = state.set('status', 'google-loaddocument-error').set('errormsg', action.error);
            break;
        case GOOGLE_FILEINFO_SUCCESS:
            newState = state.set('status', 'google-fileinfo')
                .set('infomsg', "FileInfo loaded")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                );
            break;
        case GOOGLE_SAVEDOCUMENT_SUCCESS:
            newState = state.set('status', 'google-filesaved')
                .set('infomsg', "DMN Document saved")
                .set('googleDocument', state.get('googleDocument')
                    .set('fileinfo', action.fileinfo)
                );
            break;
        default:
            break;
    }
    return newState.set('actionType', action.type);
}

export { DMNEditorApp };