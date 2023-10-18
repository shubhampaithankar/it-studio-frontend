import React, { useEffect } from 'react'

export default function Modal({ show, onClose, modalData }) {
    const styles = {
        backdropFilter: 'blur(5px)',
        background: 'rgba(0, 0, 0, 0.5)',
        minHeight: '100%',
        zIndex: 1040,
        alignItems: 'center',
        justifyContent: 'center',
    }
    
    useEffect(() => {
    if (show) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind the modal
    } else {
        document.body.style.overflow = 'auto';
    }
    }, [show])
  return (
    <div className={`modal ${show ? 'd-flex show' : 'd-none fade'}`} tabIndex="-1" style={{ ...styles }}>
        <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark text-light">
            <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
                { modalData.title }
            </h5>
            <button type="button" className="btn close text-white" onClick={onClose}>
                <span aria-hidden='true'>&times;</span>
            </button>
            </div>
            <div className="modal-body">
                { modalData.body }
            </div>
        </div>
        </div>
    </div>
  )
}
