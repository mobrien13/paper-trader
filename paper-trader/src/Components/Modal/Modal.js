import React, { forwardRef, useState, useImperativeHandle } from 'react'
import './Modal.css'
import {motion, AnimatePresence} from "framer-motion"
import { getAuth } from 'firebase/auth';

//creates modal with ref for open and closed properties
const Modal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false); 
    const currentUser = getAuth();

    //creates callable functions to set open or closed
    useImperativeHandle(ref, () => {
        return{
            open: () => setOpen(true),
            close: () => setOpen(false)
        }
    })

    return( 

        //animatees the modal
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
                    //creates modal with props passed into it
                    <motion.div className='modal-content'>
                        {props.children}
                    </motion.div>    
                </motion.div>
                </>
            )}

        </AnimatePresence>
        
    )
})

export default Modal
