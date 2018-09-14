import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '..';
import { bindActionCreators, Dispatch } from 'redux';
import { setMapCenter, setGoogleMap, setMapZoom } from '../ducks/current';
import { getMapCenter, getMapMarkers, getGoogleMap, getMapZoom } from '../selectors/current';

import styles from '../../assets/styles';

type MapProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

class Map extends React.Component<MapProps> {

    private styleOverrides: google.maps.MapTypeStyle[] = styles;

    constructor(props) {
      super(props);
  
  
    }
  
    componentDidUpdate(prevProps: MapProps) {
        if (window['google'] && !this.props.map) {
            this.buildGoogleMap();
        }

        if (this.props.map && this.props.center != prevProps.center) {
            this.props.map.setCenter(this.props.center);
        }
    }

    onCurrentPosition = (position: Position) => this.props.setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    });

    buildGoogleMap = () => {
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.props.zoom,
            center:  { lat: 0, lng: 0 },
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            styles: this.styleOverrides
        });

        this.props.setGoogleMap(map);
        navigator.geolocation.getCurrentPosition(this.onCurrentPosition, this.onPositionError);

        // map.addListener('center_changed', this.onCenterChanged);
        map.addListener('zoom_changed', this.onZoomChanged);
    }

    onZoomChanged = () => this.props.setMapZoom(this.props.map.getZoom());
    onCenterChanged = () => this.props.setMapCenter({
        lat: this.props.map.getCenter().lat(),
        lng: this.props.map.getCenter().lng()
    });

    onPositionError = () => {
  
    }
  
    render() {
        return <div id="map" className="map-container" />;
    }

}

const mapStateToProps = (state: ApplicationState) => ({
    zoom: getMapZoom(state),
    map: getGoogleMap(state),
    center: getMapCenter(state),
    markers: getMapMarkers(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setMapCenter, setGoogleMap, setMapZoom
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);