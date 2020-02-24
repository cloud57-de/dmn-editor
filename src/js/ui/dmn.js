import DMNModeler from 'dmn-js/lib/Modeler';
import { zoomToFit, zoomIn, zoomOut } from '../api/service';
import { saveDocument } from '../api/googleservice';

let dmnEditor = new DMNModeler({ container: '#editor', position: 'absolute' });

export function initEditorAction() {
    document.getElementById('bt_fit_to_viewport').addEventListener('click',zoomToFit);
    document.getElementById('bt_zoom_in').addEventListener('click', zoomIn);
    document.getElementById('bt_zoom_out').addEventListener('click', zoomOut);
    document.getElementById('bt_save').addEventListener('click', editorSave);
}

export function showDocument(xml) {

    dmnEditor.importXML(xml, function (err) {

        if (err) {
            console.log('error rendering', err);
        } else {
            console.log('rendered');
        }
    });
}

export function editorZoomIn() {
    console.log(dmnEditor);
    dmnEditor.zoomScroll.stepZoom(1);
}

export function editorZoomOut() {
    dmnEditor.get('zoomScroll').stepZoom(-1);    
}

export function editorZoomToFit() {
    dmnEditor.get('canvas').zoom('fit-viewport', 'auto');
}

function editorSave() {
    dmnEditor.saveXML({ format: true }, function (err, xml) {
        saveDocument(xml);
    });
}