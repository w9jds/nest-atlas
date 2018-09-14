export type NestMarker = {
    marker: google.maps.Marker,
    overlay: google.maps.OverlayView
}

export type CurrentState = {
    readonly zoom: number;
    readonly map: google.maps.Map;
    readonly markers: Record<string, NestMarker>;
    readonly center: google.maps.LatLngLiteral;
};
