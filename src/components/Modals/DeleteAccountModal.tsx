import React from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../utils";
import { useToastDisplay } from "../../hooks";

// Components
import { Toast } from "../CustomComponents";
import { LoadingDots } from "../Loaders";

function DeleteAccountModal({ userId }: { userId: number }) {

    const [cookie, setCookie, removeCookie] = useCookies(['userInfo']);
    const navigate = useNavigate();

    // States
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [toastMessage, setToastMessage] = React.useState<string | React.JSX.Element>("");

    // Function to delete the account
    async function deleteAccount(id: number) {
        try {
            const res = await axiosInstance.delete(`/user/${id}`);
            if (res.status === 200) {
                setToastMessage(<LoadingDots />);
                setTimeout(() => { setToastMessage(res.data) }, 1500);
                setIsVisible(true);
                setTimeout(() => {
                    removeCookie('userInfo', { path: '/' });
                    navigate("/");
                }, 2500);
            };
        } catch (error) {
            console.error(error);
        };
    };

    // useEffect to display the toast
    useToastDisplay(isVisible, setIsVisible);

    return (
        <dialog id="delete_modal" className="modal">
            <div className="modal-box flex flex-col gap-8 pb-0 pt-12 border border-primary min-[440px]:w-3/5 sm:w-2/5 sm:px-10">
                <p className="font-semibold text-base text-center">Are you sure you want to delete your account ?</p>
                <button
                    className="btn btn-primary btn-md text-lg w-fit self-center border border-base-200"
                    type="button"
                    onClick={() => deleteAccount(userId)}
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
            {isVisible && <Toast message={toastMessage} />}
        </dialog>
    );
};

export default DeleteAccountModal;