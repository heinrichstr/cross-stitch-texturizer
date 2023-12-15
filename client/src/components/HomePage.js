import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Header from './Header'

export default (props) => {
    return (
        <main className="homePage">
            <Header />
            <section>
                <h2>Take a pixel art piece and put a cross stitch texture over top of it.</h2>
                <p>
                    Creating cross stitch designs can be difficult. Selling them can be even harder. The cross stitch
                    retexturizer helps create elegant images you can use for your shop page.
                </p>
                <p>
                    Many cross stitch programs will let you export a flat color version of your design. You can also
                    export your design from a pixel art program to see what it will look like as a cross stitch design!
                </p>
                <Link to="/app">GO TO THE APP!</Link>
            </section>
            <section>
                <h2>How to use the app.</h2>
                <ol>
                    <li>Upload your pixel art/flat color image of your design.</li>
                    <li>Tell the app how many stitches are in the design.</li>
                    <li>Select how large of a border you would like around your design. The app will create an AIDA cloth texture around the image at this size.</li>
                    <li>Select what color you want the background to be.</li>
                    <li>Click "Generate" and receive your new image!</li>
                </ol>
            </section>
        </main>
    );
};
