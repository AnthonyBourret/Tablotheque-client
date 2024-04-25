import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { capitalizeFirstLetter } from "../../utils";

// Import Components
import Header from '../Header/Header';
import { EditProgressionModal, DeleteSongModal } from "../Modals";
import { LoaderSongPage } from "../Loaders";
import Footer from "../Footer/Footer";
import { BadgeStyle } from '../CustomComponents';

// Import SVG
import { IconLink } from "../../svg";

// Import Types
import { SongProps } from "../../types/types";


function SongPage() {

    // The user's id is set with useParams
    const { id } = useParams();
    // Fetch the song
    const { data, error, isLoading } = useFetch(`song/${id}`, 'GET');
    // State to set the song
    const [song, setSong] = useState<SongProps | undefined>();

    // When the data is fetched, set the song
    useEffect(() => {
        if (data) {
            setSong(data);
        }
    }, [data]);

    // If there is an error, return null
    if (error) return null;


    return (
        <div className="flex flex-col items-center w-full sm:w-[90%] bg-base-300 min-h-screen pb-8 px-6 sm:px-12">
            <Header />
            <div className="flex flex-col w-full bg-base-100 border border-primary rounded-box p-4 gap-10 lg:w-3/5">

                {isLoading && <LoaderSongPage />}

                {/* Header of the displayed song informations */}
                {song && (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col justify-between sm:px-2 sm:flex-row">
                            <div className="flex flex-col items-center sm:w-1/2 sm:pl-2">
                                <h1 className="text-2xl font-semibold lg:text-3xl sm:self-start text-center sm:text-left">{capitalizeFirstLetter(song.title)}</h1>
                                <h2 className="text-lg pt-2 lg:text-xl sm:self-start">by {song.artist}</h2>
                                <div className="flex gap-6 py-4 w-fit mt-4 sm:self-start">

                                    {/* Display the styles of the song */}
                                    {song.Styles.map((style: { name: string; }, index: React.Key | null | undefined) => (
                                        <BadgeStyle key={index} style={style.name} />))
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-fit sm:w-1/3 p-4 self-center lg:self-start items-center justify-center gap-4 bg-neutral rounded-box border border-primary">
                                <p className="text-lg font-semibold lg:text-xl">{song.status}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (document) {
                                            (document.getElementById("progression_modal") as HTMLDialogElement).showModal();
                                        }
                                    }}
                                    className="btn btn-sm w-fit btn-primary border border-base-200"
                                >
                                    Edit status
                                </button>
                            </div>
                        </div>

                        {/* Song informations */}
                        <div className="flex flex-col px-4 w-full gap-4">
                            <div className="flex flex-col gap-1 min-[820px]:flex-row min-[820px]:gap-2 items-baseline">
                                <h3 className="font-semibold sm:text-lg">Difficulty : </h3>
                                <p>{song.difficulty}</p>
                            </div>
                            <div className="flex flex-col gap-1 min-[820px]:flex-row min-[820px]:gap-2 items-baseline">
                                <h3 className="font-semibold sm:text-lg">Tuning : </h3>
                                <div className="flex flex-col min-[820px]:flex-row min-[820px]:gap-4">
                                    <p>{song.Tuning.name}</p>
                                    <span className="hidden min-[820px]:flex"> / </span>
                                    <p>{song.Tuning.strings}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <h3 className="font-semibold sm:text-lg">Capo : </h3>
                                <p>{song.capo}</p>
                            </div>
                        </div>

                        {/* Link and Comments sections */}
                        <div className="flex flex-col gap-2 px-4 w-full">
                            <div className="mt-2">
                                <p className="font-semibold sm:text-lg">Tab :</p>
                                <div className="flex gap-2 items-center mt-1">
                                    <IconLink />
                                    <Link to="/tabsLink" className="truncate" target="_blank" rel="noreferrer">{song.tab_link}</Link>
                                </div>

                            </div>
                            {song.lyrics_link &&
                                <div className="mt-2">
                                    <p className="font-semibold sm:text-lg">Lyrics :</p>
                                    <div className="flex gap-2 items-center mt-1">
                                        <IconLink />
                                        <Link to="/lyricsLink" className="truncate" target="_blank" rel="noreferrer">{song.lyrics_link}</Link>
                                    </div>
                                </div>
                            }
                        </div>
                        {song.comments &&
                            <div className="flex flex-col gap-2 px-4 w-full">
                                <h3 className="font-semibold sm:text-lg">Comments :</h3>
                                <p>{song.comments}</p>
                            </div>}

                        {/* Edit and Delete buttons */}
                        <div className="flex w-full justify-center gap-4">
                            < Link to={`/edit-song/${id}`} className="btn btn-md btn-primary border border-base-200">Edit song</Link>
                            <button
                                type="button"
                                className="btn btn-md btn-primary border border-base-200"
                                onClick={() => {
                                    if (document) {
                                        (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
                                    }
                                }}
                            >
                                Delete song
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <EditProgressionModal />
            <DeleteSongModal />

            <Footer />
        </div>
    );
};

export default SongPage;