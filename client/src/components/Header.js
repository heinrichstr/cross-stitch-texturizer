import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default (props) => {
    return (
        <header className="header">
            <h1>Cross stitch retexturizer</h1>
            <div>
                <Link to="/app">App</Link>
                <Link to="/">About</Link>
            </div>
        </header>
    );
};
