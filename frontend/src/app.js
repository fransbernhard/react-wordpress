/*global $:true*/

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    HashRouter
} from 'react-router-dom';

import './assets/scss/App.scss';
import Home from './containers/Home';
import Archive from './containers/Archive';

class App extends PureComponent {

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad() {
        $(".loaderSmall").delay(100).fadeOut("slow");
    }

    render() {
        return (
            <div>
                <div className="loaderSmall" id="loaderSmall">
                    <svg id='loader-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 283.5 283.5'>
                        <path className='st0' style={{fill: 'none', stroke: '#7e7e7e', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'miter', strokeMiterlimit: 4, strokeOpacity: 1, strokeDasharray: 'none'}} d='M134,133c0,29.7-24,53.7-53.7,53.7s-53.7-24-53.7-53.7'/>
                        <path className='st0' style={{fill: 'none', stroke: '#7e7e7e', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'miter', strokeMiterlimit: 4, strokeOpacity: 1, strokeDasharray: 'none'}} d='M245.8,133c0,29.7-24,53.7-53.7,53.7s-53.7-24-53.7-53.7'/>
                        <circle className='st1' style={{fill: '#7e7e7e', stroke: 'none', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'miter', strokeMiterlimit: 4, strokeOpacity: 1, strokeDasharray: 'none'}} cx='80.3' cy='141.7' r='7.7' >
                            <animateTransform attributeType='xml' fill='freeze' attributeName='transform' type='translate' from='0 0' to='0 27' begin="1s" dur='3s' fill="freeze" repeatCount='1' />
                        </circle>
                        <circle className='st1' style={{fill: '#7e7e7e', stroke: 'none', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'miter', strokeMiterlimit: 4, strokeOpacity: 1, strokeDasharray: 'none'}} cx='192.1' cy='141.7' r='7.7' >
                            <animateTransform attributeType='xml' fill='freeze' attributeName='transform' type='translate' from='0 0' to='0 27' begin="1s" dur='3s' fill="freeze" repeatCount='1' />
                        </circle>
                    </svg>
                </div>

                <Router>
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <Route path={'/archive'} component={Archive} />
                        <Route render={() => { return <Redirect to="/" />}} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDOM.render (
    <App/>,
    document.getElementById('app')
)

if (module.hot) {
	module.hot.accept();
}

export default App;
