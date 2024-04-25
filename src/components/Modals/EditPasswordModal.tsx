import React, { useState } from 'react';
import { axiosInstance, reloadPageTimeOut } from "../../utils";
import { useToastDisplay } from "../../hooks";

// Import Components
import { Toast } from "../CustomComponents";
import { LoadingDots } from "../Loaders";

function EditPasswordModal({ userId }: { userId: number }) {

    // States
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | React.JSX.Element>('');

    // Function to handle the Enter key
    async function handleKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            await updatePassword();
        };
    };

    // Function to update the password
    async function updatePassword() {

        if (password === "") {
            setToastMessage("Please, type your new password");
            setIsVisible(true);
            return;
        }

        if (confirmPassword === "") {
            setToastMessage("Please, confirm your password");
            setIsVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setToastMessage("Passwords do not match");
            setIsVisible(true);
            return;
        }

        if (password === confirmPassword) {
            try {
                const res = await axiosInstance.patch(`/user/${userId}/password`, {
                    password: password,
                    passwordConfirm: confirmPassword,
                });
                if (res.status === 200) {
                    setIsVisible(true);
                    setToastMessage(<LoadingDots />);
                    setTimeout(() => { setToastMessage("Password updated") }, 1500);
                    reloadPageTimeOut();
                }
            } catch (error) {
                setIsVisible(true);
                setToastMessage("An error has occurred");
                reloadPageTimeOut();
            }
        }
    };

    // UseEffect to remove the Toast after 4 seconds
    useToastDisplay(isVisible, setIsVisible);

    return (
        <dialog id="password_modal" className="modal">
            <div className="modal-box flex flex-col gap-6 pb-0 border border-primary min-[440px]:w-3/5 sm:w-2/5 sm:px-10">
                <h3 className="font-semibold text-lg">Change password :</h3>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input input-sm input-bordered bg-neutral"
                    placeholder="..."
                    onKeyDown={handleKey}
                />
                <h3 className="font-semibold text-lg">Confirm new password :</h3>
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="input input-sm input-bordered bg-neutral"
                    placeholder="..."
                    onKeyDown={handleKey}
                />
                <button
                    onClick={() => { updatePassword() }}
                    type="submit"
                    className="btn btn-primary btn-md text-lg w-fit self-center border border-base-200"
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

export default EditPasswordModal;