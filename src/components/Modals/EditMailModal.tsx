import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { axiosInstance, reloadPageTimeOut } from "../../utils";
import { useToastDisplay } from "../../hooks";

// Import Components
import { Toast } from "../CustomComponents";
import { LoadingDots } from "../Loaders";

function EditMailModal({ userId }: { userId: number }) {

    // States
    const [mail, setMail] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | React.JSX.Element>('');

    // Function to handle the Enter key
    async function handleKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            await updateMail();
        };
    };

    // Function to update the mail
    async function updateMail() {
        if (mail === "") {
            setIsVisible(true);
            setToastMessage("Please enter a mail");
            return;
        };
        if (!EmailValidator.validate(mail)) {
            setIsVisible(true);
            setToastMessage("Invalid mail !");
            return;
        };
        if (EmailValidator.validate(mail) && mail !== "") {
            try {
                const res = await axiosInstance.patch(`/user/${userId}`, { mail: mail });
                setIsVisible(true);
                setToastMessage(<LoadingDots />);
                setTimeout(() => { setToastMessage(res.data) }, 1500);
                reloadPageTimeOut();
            } catch (error) {
                setIsVisible(true);
                setToastMessage("An error occurred");
                console.error(error);
            };
        };
    };

    // UseEffect to remove the Toast after 4 seconds
    useToastDisplay(isVisible, setIsVisible);

    return (
        <dialog id="mail_modal" className="modal">
            <div className="modal-box flex flex-col gap-6 pb-0 border border-primary min-[440px]:w-3/5 sm:w-2/5 sm:px-10">
                <h3 className="font-semibold text-xl">New mail :</h3>
                <input
                    onChange={(e) => setMail(e.target.value)}
                    type="text"
                    className="input input-sm input-bordered bg-neutral"
                    placeholder="New mail"
                    onKeyDown={handleKey}
                />
                <button
                    onClick={() => { updateMail() }}
                    type="submit"
                    className="btn btn-primary btn-md text-lg w-fit self-center"
                >
                    Save
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

export default EditMailModal;