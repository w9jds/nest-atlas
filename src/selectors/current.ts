import { ApplicationState } from '..';

export const getMapZoom = (state: ApplicationState) => state.current.zoom;
export const getGoogleMap = (state: ApplicationState) => state.current.map;
export const getMapCenter = (state: ApplicationState) => state.current.center;
export const getMapMarkers = (state: ApplicationState) => state.current.markers;
