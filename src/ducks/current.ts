import { createAction, handleActions } from 'redux-actions';
import { Reducer } from 'redux';
import { CurrentState, NestMarker } from '../models/States';

export enum CurrentTypes {
    SET_MAP = 'SET_MAP',
    SET_MAP_MARKERS = 'SET_MAP_MARKERS',
    SET_MAP_CENTER = 'SET_MAP_CENTER',
    SET_MAP_ZOOM = 'SET_MAP_ZOOM'
}

const initialState: CurrentState = {
    zoom: 12,
    markers: {},
    map: undefined,
    center: undefined
};

const current: Reducer<CurrentState> = handleActions<any>({
    [CurrentTypes.SET_MAP]: (state: CurrentState, action: ReturnType<typeof setGoogleMap>) => ({
        ...state,
        map: action.payload,
        markers: {},
    }),
    [CurrentTypes.SET_MAP_MARKERS]: (state: CurrentState, action: ReturnType<typeof setMapMarkers>) => ({
        ...state,
        markers: action.payload,
    }),
    [CurrentTypes.SET_MAP_CENTER]: (state: CurrentState, action: ReturnType<typeof setMapCenter>) => ({
        ...state,
        center: action.payload,
    }),
    [CurrentTypes.SET_MAP_ZOOM]: (state: CurrentState, action: ReturnType<typeof setMapZoom>) => ({
        ...state,
        zoom: action.payload,
    })
}, initialState);

export const setMapMarkers = createAction<Record<string, NestMarker>>(CurrentTypes.SET_MAP_MARKERS);
export const setMapCenter = createAction<google.maps.LatLngLiteral>(CurrentTypes.SET_MAP_CENTER);
export const setGoogleMap = createAction<google.maps.Map>(CurrentTypes.SET_MAP);
export const setMapZoom = createAction<number>(CurrentTypes.SET_MAP_ZOOM);

export default current;
