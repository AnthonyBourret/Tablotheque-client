import React, { useEffect, useState } from 'react';
import { useFetch } from "../../hooks";

// Import Components
import Header from '../Header/Header';
import FilterDesktop from '../Filters/FilterDesktop';
import FilterMobile from "../Filters/FilterMobile";
import NewUserMessage from "./NewUserMessage";
import Footer from "../Footer/Footer";
import { LoaderCardSong } from "../Loaders";
import { SongCard } from "../CustomComponents";

// Import Types
import { SongProps, SongCardProps } from "../../types/types";

function HomePage({ userId }: { userId: number }) {

  // Fetch user's songs
  const { data, error, isLoading } = useFetch(`user/${userId}/songs`, 'GET');
  // State to set songs
  const [songs, setSongs] = useState([]);

  // States to filter the songs
  const [filteredArray, setFilteredArray] = useState([] || undefined);

  const [filters, setFilters] = useState({
    difficulty: "",
    status: "",
    Styles: "",
    Tuning: "",
    capo: "",
  });

  // When the data is fetched, set the songs
  useEffect(() => {
    if (data && userId) {
      setSongs(data);
    }
  }, [songs, data, isLoading]);


  // Filter the songs
  useEffect(() => {
    if (songs.length > 0) {
      setFilteredArray(songs.filter((song: SongProps) => {
        return (
          (filters.difficulty === '' || song.difficulty.includes(filters.difficulty)) &&
          (filters.status === '' || song.status.includes(filters.status)) &&
          (filters.Styles === '' || song.Styles.some((style) => style.name.includes(filters.Styles))) &&
          (filters.Tuning === '' || song.Tuning.strings.includes(filters.Tuning)) &&
          (filters.capo === '' || song.capo.includes(filters.capo))
        );
      }));
    };
  }, [filters, songs]);

  // If there is an error, return null
  if (error) return null;

  return (

    <div className="flex flex-col items-center w-full sm:w-[90%] bg-base-300 min-h-screen pb-8">
      <Header />
      <div className="flex flex-col w-full min-[770px]:flex-row min-[770px]:justify-center gap-8 px-6 min-[720px]:gap-12">
        <FilterDesktop setFilters={setFilters as React.Dispatch<React.SetStateAction<{
          difficulty: string;
          status: string;
          Styles: string;
          Tuning: string;
          capo: string;
        }>>} />
        <FilterMobile setFilters={setFilters as React.Dispatch<React.SetStateAction<{
          difficulty: string;
          status: string;
          Styles: string;
          Tuning: string;
          capo: string;
        }>>} />
        <div className="w-full min-[820px]:w-1/2 flex flex-col gap-6">

          {/* Loader */}
          {isLoading && <LoaderCardSong />}

          {/* If the user has at least one song, display the songs list */}
          {songs.length != 0
            && filteredArray.map((song: SongCardProps) => (
              <SongCard
                key={song.id}
                id={song.id}
                title={song.title}
                artist={song.artist}
                Styles={song.Styles}
                status={song.status} />
            ))}
          {/* If the user has no song, display a message */}
          {songs.length === 0 && <NewUserMessage />}

          {/* If the filters selected has no matching songs, display a message */}
          {filteredArray.length === 0 && songs.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold">No song found</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;