import '../../stylesheets/main.scss';

import * as React from 'react';
import Map from '../utils/AsyncWrapper';

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);


    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="page-layout">

                <Map />

            </div>
        );
    }
}
