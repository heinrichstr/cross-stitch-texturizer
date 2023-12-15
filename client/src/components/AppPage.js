import React, { useState, useEffect } from "react";
import RetexturizerApp from "./app/RetexturizerApp"

export default (props) => {
    return (
        <main className="homePage">
            <Header />
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
            <section>
                <RetexturizerApp></RetexturizerApp>
            </section>
        </main>
    );
};
