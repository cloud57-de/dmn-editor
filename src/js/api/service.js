import { store } from "../redux/store";
import { createZoomInAction, createZoomOutAction, createZoomToFitAction } from "../redux/editoractions";

export function zoomIn() {
    store.dispatch(createZoomInAction());
}

export function zoomOut() {
    store.dispatch(createZoomOutAction());
}

export function zoomToFit() {
    store.dispatch(createZoomToFitAction());
}
