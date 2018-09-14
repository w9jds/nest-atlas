import makeAsyncScriptLoader from 'react-async-script';
import Map from '../components/Map';
import {GoogleApi} from '../config/config';

const URL = `https://maps.googleapis.com/maps/api/js?key=${GoogleApi}`;

export default makeAsyncScriptLoader(URL, { globalName: 'google' })(Map);