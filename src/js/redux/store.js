import { createStore } from 'redux';
import { DMNEditorApp, initialState } from './reducer'; 
 
export const store = createStore(DMNEditorApp, initialState);
