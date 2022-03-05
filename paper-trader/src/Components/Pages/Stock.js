import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Stock = (props) => {
    //const location = useLocation;
    // const [pageURL, setPageURL] = useState(0);
    // useEffect(() => {
    //     setPageURL(window.location.pathname.substring(7));
    // })
    const location = useLocation();
    const ticker = location.pathname.substring(7);

    return (
        <>
            <h1>{ ticker }</h1>
        </>
    )
}

export default Stock