import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useToastDisplay } from "../../hooks";
import { handleAddSong } from "../../utils/";

// Import Components
import Header from '../Header/Header';
import { TextInput, SelectInputId, SelectInputValue, TextAreaInput, Toast } from '../CustomComponents';
import Footer from "../Footer/Footer";

// Import options used in SelectInput
import {
  difficultyOptions,
  progressionOptions,
  styleOptions,
  capoOptions,
  tuningOptions
} from "../../utils/InputValues";


function AddSong({ userId }: { userId: number }) {
  const navigate = useNavigate();
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | React.JSX.Element>('');

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleAddSong({ e, userId, setIsVisible, setToastMessage, navigate });
  };

  // useEffect to display the toast
  useToastDisplay(isVisible, setIsVisible);

  return (
    <div className="flex flex-col items-center w-full sm:w-[90%] bg-base-300 min-h-screen pb-8">
      <Header />
      <div className="flex flex-col gap-6 w-full p-5 bg-base-100 border border-primary rounded-box max-[820px]:w-[75%] min-[820px]:w-[55%] shadow-xl">

        {/* Add a song Header */}
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold self-start">Add a new song</h1>
          <div className="divider px-20 mb-0 " />
          <div className="text-xs self-center">All fields with * are required</div>
        </div>

        {/* Song title & artist div */}
        <form
          className="flex flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:mb-8">
            <div className="flex flex-col gap-6 sm:w-[40%]">
              <TextInput
                label="Song Title *"
                inputName="title"
                placeholder="Type the song title here"
              />
              <TextInput
                label="Artist *"
                inputName="artist"
                placeholder="Artist/Band name"
              />
            </div>
            {/* Style div */}
            <div className="flex flex-col gap-6 sm:w-[40%]">
              <SelectInputId
                label="First style *"
                inputName="firstStyle_id"
                options={styleOptions}
              />
              <SelectInputId
                label="Second style"
                inputName="secondStyle_id"
                options={styleOptions}
              />
            </div>
          </div>

          <div className="divider px-20" />
          {/* Tuning & Capo div */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:mb-8">
            <div className="flex flex-col gap-6 sm:w-[40%] items-center">
              <SelectInputId
                label="Tuning *"
                inputName="tuning_id"
                options={tuningOptions}
              />
              <SelectInputValue
                label="Capo *"
                inputName="capo"
                disabledText="Select a fret number"
                options={capoOptions}
              />
            </div>

            {/* Difficulty & Progression div */}
            <div className="flex flex-col gap-6 sm:w-[40%]">
              <SelectInputValue
                label="Difficulty *"
                inputName="difficulty"
                disabledText="Chose a difficulty"
                options={difficultyOptions}
              />
              <SelectInputValue
                label="Progression *"
                inputName="status"
                disabledText="Pick one"
                options={progressionOptions}
              />
            </div>
          </div>

          <div className="divider px-20" />

          {/* Tab & Lyrics Link div */}
          <div className="flex flex-col gap-6">
            <TextInput
              label="Tab Link *"
              inputName="tab_link"
              placeholder="Copy/Paste the link to your tab"
            />
            <TextInput
              label="Lyrics Link"
              inputName="lyrics_link"
              placeholder="Copy/Paste the link to lyrics (optional)"
            />
            <TextAreaInput
              label="Comments"
              inputName="comments"
              placeholder="Add any comments (optional)"
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-base w-fit mt-8 m-auto btn-primary border border-base-200"
          >
            Add song to my tabs
          </button>
        </form>
      </div>

      {/* Toast */}
      {isVisible && <Toast message={toastMessage} />}
      <Footer />
    </div>
  );
};

export default AddSong;