import React from 'react';
import './FourOFour.css';
import './Pages.css';
import image1 from '../../images/404-error.png'

function FourOFour() {
    return (
        <>
            <div className='page'>
                <div className='section-1'>
                    <h1 className='title'>WRONG TURN?</h1>
                    <body className='text'>You look lost. Sometimes I get lost too. Especially with the growing number of stocks.
                        They can really be hard to keep track of. Just sit down, enjoy the view. I don't really have anything else to offer you.
                        When you're ready to start going again just click the dashboard button.</body>
                </div>
                <img className='image' src={image1} />
            </div>
            <div className='extraspace'></div>
            <div className='spacer layer1' />
        </>
    )
}

export default FourOFour;