import React from "react";
import { useLocation } from 'react-router-dom';
//import ReactGA from 'react-ga';

export default (props) => {
    // ReactGA.initialize('G-DFHCXY00LV', {
    //     debug: true,
    //     titleCase: false
    //   });
    //ReactGA.initialize('G-DFHCXY00LV');
    let location = useLocation();

    // React.useEffect(() => {
    //     //Google Analytics
    //     // ReactGA.set('true_pageview', location.pathname);
    //     window.gtag('event', 'react_pageview', {page_location: location.pathname, page_title: pageTitle})
    //     window.gtag('event', 'page_view', {page_location: location.pathname, page_title: pageTitle})
    // }, [location]);

    //scroll to top of page
    document.getElementById('body').scrollIntoView();

    return (
        <>
            {props.childElement}
        </>
    );
};
