import { fork, takeEvery, all, select } from 'redux-saga/effects';
import { CurrentTypes } from '../ducks/current';
import { getGoogleMap } from '../selectors/current';

type LocalNestsRequestForm = {
    lat1: number;
    lng1: number;
    lat2: number;
    lng2: number;
    center_lat: number;
    center_lng: number;
    zoom: number;
}

function* populateMarkers() {
    const map: google.maps.Map = yield select(getGoogleMap);
    const bounds = map.getBounds();

    if (bounds) {
        let data: LocalNestsRequestForm = {
            lat1: bounds.getNorthEast().lat(),
            lng1: bounds.getNorthEast().lng(),
            lat2: bounds.getSouthWest().lat(),
            lng2: bounds.getSouthWest().lng(),
            center_lat: map.getCenter().lat(),
            center_lng: map.getCenter().lng(),
            zoom: map.getZoom()
        }
    
        yield fork(getLocalNests, data);
    }
}

const getLocalNests = async (data: LocalNestsRequestForm) => {
    let response = await fetch('https://thesilphroad.com/atlas/getLocalNests.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.keys(data).reduce((previous, current) =>
            previous + `data[${current}]=${data[current]}&`, ''
        )
    });

    let content = await response.json();

}

export function* sagas() {
    yield all([
        takeEvery(CurrentTypes.SET_MAP_CENTER, populateMarkers),
        takeEvery(CurrentTypes.SET_MAP_ZOOM, populateMarkers)
    ]);
}
