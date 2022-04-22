import React from 'react';
import './FourOFour.css';
import './Pages.css';
import image1 from '../../images/404-error.png'

function FourOFour() {
    return (
        <>
            <div className='container'>

                <div className='page'>
                    <div className='section-1'>
                        <h1 className='title'>WRONG TURN?</h1>
                        <p className='text'>Wow look at you getting to the 404 page. Yeah, that means you're lost, forehead... Sometimes I get lost too. Especially with the growing number of stocks.
                            They can really be hard to keep track of for a beta-male like you. Just sit down, enjoy the view. I don't really have anything else to offer you.
                            When you're ready to start going again just click the dashboard button.</p>
                    </div>
                    <div>
                        <img className='image404' src={image1} />
                    </div>
                </div>
            </div>

            <div className='spacer layer1' />
        </>
    )
}

export default FourOFour;