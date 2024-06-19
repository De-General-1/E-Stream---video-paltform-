import React from 'react';

function Modal({ message, closeModal }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <p className="text-lg">{message}</p>
                <button onClick={closeModal} className="mt-4 bg-[#1f2937] hover:bg-[#162432e7] text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;