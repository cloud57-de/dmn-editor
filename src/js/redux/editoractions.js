export const ZOOM_TO_FIT = 'ZOOM_TO_FIT';
export const ZOOM_IN = 'ZOOM_IN';
export const ZOOM_OUT = 'ZOOM_OUT';

export function createZoomToFitAction() {
    return { type: ZOOM_TO_FIT };
}

export function createZoomInAction(error) {
    return { type: ZOOM_IN };
}

export function createZoomOutAction() {
    return { type: ZOOM_OUT };
}

