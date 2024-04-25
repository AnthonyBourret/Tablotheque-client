import React, { useState, useEffect } from 'react';
import { useFetch } from "../../hooks";
import { formatDate } from "../../utils";

// Import Components
import Header from '../Header/Header';
import { LoaderProfile } from "../Loaders";
import Footer from "../Footer/Footer";
import { EditProfileButton } from "../CustomComponents";
import { EditAvatarModal, EditMailModal, EditUsernameModal, DeleteAccountModal, EditPasswordModal } from "../Modals";


function Profile({ userId }: { userId: number }) {

  // Fetch user's data and user's songs data
  const { data: userData, error: userError, isLoading: userLoading } = useFetch(`/user/${userId}`, 'GET');
  const { data: userSongsData, error: userSongsDataError, isLoading: userSongsDataLoading } = useFetch(`/user/${userId}/songs`, 'GET');

  // State to set user's data and user's songs data
  const [userInfo, setUserInfo] = useState<any | undefined>();
  const [userSongsInfo, setUserSongsInfo] = useState<any | undefined>();

  // When the data is fetched, set the user's data and user's songs data
  useEffect(() => {
    if (userData && userSongsData) {
      setUserInfo(userData);
      setUserSongsInfo(userSongsData);
    }
  }, [userData, userSongsData]);

  // If there is an error, return null
  if (userError || userSongsDataError) return null;

  return (
    <div className="flex flex-col items-center w-full sm:w-[90%] bg-base-300 min-h-screen pb-8">

      <Header />

      <div className="flex flex-col gap-8 w-[90%] items-center justify-center bg-base-100 border border-primary rounded-box p-6 min-[590px]:w-1/2 min-[590px]:px-8 lg:w-2/5 shadow-xl">
        <div className="w-full">
          <h1 className="text-2xl font-semibold self-start">My profile</h1>
          <div className="divider mb-0"></div>
        </div>

        {/* Loader */}
        {userLoading || userSongsDataLoading && <LoaderProfile />}

        {/* Avatar & Username */}
        {userInfo && userSongsInfo && (
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row-reverse gap-2 items-center justify-between w-full min-[590px]:gap-8">
              <div className="avatar items-center">
                <div className="w-14 rounded-full border border-primary">

                  {/* // If the user has no avatar, the default avatar is displayed */}
                  <img src={userData.picture ? userData.picture : "/DefaultAvatar.png"} />
                  <div className="absolute top-8 left-10">
                    <EditProfileButton modalName="avatar_modal" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{userData.username}</h1>
                <EditProfileButton modalName="username_modal" />
              </div>
            </div>

            {/* User info */}
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Mail : </h2>
                <div className="flex items-center gap-2">
                  <p>{userData.mail}</p>
                  <EditProfileButton modalName="mail_modal" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Songs added : </h2>
                <p>{userSongsInfo.length}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Songs learned : </h2>
                <p>{userSongsInfo.filter((song: { status: string; }) => song.status === "Learned").length}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Songs in progress : </h2>
                <p>{userSongsInfo.filter((song: { status: string; }) => song.status === "In progress").length}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Songs to learn : </h2>
                <p>{userSongsInfo.filter((song: { status: string; }) => song.status === "To learn").length}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Member since : </h2>
                <p>{formatDate(userData.created_at)}</p>
              </div>
            </div>

            {/* Delete account */}
            <div className="flex flex-col gap-6 self-center my-4 min-[820px]:flex-row min-[820px]:gap-4">
              <button
                className="btn btn-md btn-primary border border-base-200"
                type="button"
                onClick={() => {
                  if (document) {
                    (document.getElementById("password_modal") as HTMLDialogElement).showModal();
                  }
                }}
              >
                Change password
              </button>
              <button
                className="btn btn-md btn-primary border border-base-200"
                type="button"
                onClick={() => {
                  if (document) {
                    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
                  }
                }}
              >
                Delete my account
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <EditAvatarModal />
        <EditPasswordModal userId={userId} />
        <EditMailModal userId={userId} />
        <EditUsernameModal userId={userId} />
        <DeleteAccountModal userId={userId} />
      </div>

      <Footer />
    </div>
  );
};

export default Profile;