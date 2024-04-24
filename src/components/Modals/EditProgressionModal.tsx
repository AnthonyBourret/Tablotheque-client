import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

// Import Components
import { Toast } from "../CustomComponents";
import LoadingDots from "../Loaders/LoadingDots";

// Import utils
import useToastDisplay from "../../hooks/useToastDisplay";
import reloadPageTimeOut from "../../utils/reloadPageTimeOut";


function EditProgressionModal() {
    const { id } = useParams();
    // States
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | React.JSX.Element>('');
    const [status, setStatus] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");

    // Function to edit the progression
    async function editProgression(status: string, id: string | undefined) {
        try {
            const res = await axiosInstance.patch(`song/${id}`, { status: status });
            if (res.status === 200) {
                setIsVisible(true);
                setToastMessage(<LoadingDots />);
                setTimeout(() => { setToastMessage(res.data) }, 1500);
                reloadPageTimeOut();
            }
        } catch (error) {
            setIsVisible(true);
            setToastMessage("An error occurred");
            console.error(error);
        };
    };

    // UseEffect to get the current status of the song
    useEffect(() => {
        async function getCurrentStatus() {
            try {
                const res = await axiosInstance.get(`song/${id}`);
                setCurrentStatus(res.data.status);
            } catch (error) {
                console.error(error);
            };
        };
        getCurrentStatus();
    }, [status]);

    // UseEffect to remove the Toast after 4 seconds
    useToastDisplay(isVisible, setIsVisible);


    return (
        <dialog id="progression_modal" className="modal">
            <div className="modal-box flex flex-col gap-6 pb-0 border border-primary min-[440px]:w-3/5 sm:w-2/5 sm:px-10">
                <h3 className="font-semibold text-2xl">New status :</h3>
                <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="select select-bordered bg-neutral select-sm"
                >
                    <option value={"To learn"} disabled={currentStatus === "To learn"}>To Learn</option>
                    <option value={"In progress"} disabled={currentStatus === "In progress"}>In progress</option>
                    <option value={"Learned"} disabled={currentStatus === "Learned"}>Learned</option>
                </select>
                <button
                    onClick={() => editProgression(status, id)}
                    type="submit"
                    disabled={status === "" || status === currentStatus}
                    className="btn btn-primary btn-md text-lg w-fit self-center border border-base-200"
                >Save</button>

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

export default EditProgressionModal;