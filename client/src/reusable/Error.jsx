import React, { useEffect } from "react";
import './Error.css';

const Error = ({ error, onError }) => {

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                onError(null); // auto hide error in 3 secs
            }, 3000);
        }
    }, [error, onError]);

    // console.log('Error');
    return (<div className={`error-container ${error ? "" : "hidden"}`} >
        <div className="error-message" data-testid="error-message">
            <p>{error}</p>
        </div>
    </div>);
}

export default React.memo(Error);