import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';

window.LOG_LEVEL = 'DEBUG';
Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});
// I was getting this error. On the portatil PC, this PC has the hour slightly moved forward
// The auth apis on each aws service seems to be really anoying :(
// Issue explanation: https://stackoverflow.com/questions/44017410/signature-expired-is-now-earlier-than-error-invalidsignatureexception
// 
// maybe that is the reason of the problem
// {
//     "message": "Signature expired: 20200106T011601Z is now earlier than 20200106T021102Z (20200106T021602Z - 5 min.)"
// }
// when making requests
// This is the main issue:
// https://github.com/aws-amplify/amplify-js/issues/2014
// https://github.com/aws-amplify/amplify-js/pull/4251
// Solution: https://github.com/aws-amplify/amplify-js/issues/3719
// https://github.com/aws/aws-sdk-js/issues/1632

// About the reactjs entry point
// https://stackoverflow.com/questions/44225567/react-main-entry-point
ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
