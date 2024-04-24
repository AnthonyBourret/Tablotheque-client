import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

// Components
import { Toast } from "../CustomComponents";
import LoadingDots from "../Loaders/LoadingDots";

// Hookes 
import useToastDisplay from "../../hooks/useToastDisplay";

function DeleteSongModal() {
    const { id } = useParams();
    const navigate = useNavigate();

    // States
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | React.JSX.Element>("");

    // Function to handle the Enter key
    async function handleKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            await deleteSong();
        };
    };

    // Function to delete the song
    async function deleteSong() {
        try {
            const res = await axiosInstance.delete(`/song/${id}`);
            if (res.status === 200) {
                setToastMessage(<LoadingDots />);
                setTimeout(() => { setToastMessage(res.data) }, 1500);
                setIsVisible(true);
                setTimeout(() => {
                    navigate("/");
                }, 2500);
            };
        } catch (error) {
            console.error(error);
        };
    };

    // UseEffect to display the toast
    useToastDisplay(isVisible, setIsVisible);

    return (
        <dialog id="delete_modal" className="modal">
            <div className="modal-box flex flex-col gap-8 pb-0 pt-12 border border-primary min-[440px]:w-3/5 sm:w-2/5 sm:px-10">
                <p className="font-semibold text-base text-center">Are you sure you want to delete the song ?</p>
                <button
                    type="submit"
                    className="btn btn-primary btn-md text-lg w-fit self-center border border-base-200"
                    onClick={deleteSong}
                    onKeyDown={handleKey}
                >
                    Delete
                </button>

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
            </div>

            {/* Close when the outside of the modal is clicked */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

            {/* Toast */}
            {isVisible && <Toast message={toastMessage} />}
        </dialog>
    );
};

export default DeleteSongModal;