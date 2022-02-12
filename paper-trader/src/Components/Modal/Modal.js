import React, { useState } from 'react'
import './Modal.css'
import {motion, AnimatePresence} from "framer-motion"


const Modal = (props) => {
    const [open, setOpen] = useState(true)
    return( 
        <AnimatePresence>
            {open && ( 
                <>
                {/*Animations modal background opacity*/}
                <motion.div 
                    initial={{
                        opacity:0
                    }}
                    animate={{
                        opacity: 1        
                    }}
                    exit={{
                        opacity: 0
                    }}
                    onClick={() => setOpen(false)}
                    className='modal-backdrop' />
    
                {/*Animations modal modal pop up*/}
                <motion.div 
                    initial={{
                        scale: 0
                    }}
                    animate={{
                        scale: 1
                    }}
                    exit={{
                        scale: 0
                    }}
                    className='modal-content-wrapper'>
    
                    {/* Concent goes on this div*/}
                    <motion.div className='modal-content'>
                        {props.children}
                    </motion.div>    
                </motion.div>
                </>
            )}

        </AnimatePresence>
        
    )
}

export default Modal
