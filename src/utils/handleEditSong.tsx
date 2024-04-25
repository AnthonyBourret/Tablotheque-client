import { axiosInstance } from "../utils";
import { useParams } from "react-router-dom";
import LoadingDots from "../components/Loaders/LoadingDots";

interface Props {
    e: React.FormEvent<HTMLFormElement>;
    id: string | undefined;
    setToastMessage: React.Dispatch<React.SetStateAction<string | React.JSX.Element>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

async function handleEditSong({ e, id, setToastMessage, setIsVisible }: Props) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.firstStyle_id === data.secondStyle_id) {
        setToastMessage("Please choose two different styles");
        setIsVisible(true);
        return;
    };

    if (data.title === ""
        || data.artist === ""
        || data.tuning_id === ""
        || data.capo === ""
        || data.difficulty === ""
        || data.status === ""
        || data.firstStyle_id === ""
        || data.tab_link === ""
    ) {
        setToastMessage("Please fill all the required fields");
        setIsVisible(true);
        return;
    };

    //Request for the song update
    const resSong = await axiosInstance.patch(`/song/${id}`, {
        title: data.title,
        artist: data.artist,
        tab_link: data.tab_link,
        lyrics_link: data.lyrics_link,
        comments: data.comments,
        difficulty: data.difficulty,
        status: data.status,
        capo: data.capo,
        tuning_id: data.tuning_id
    })
    //Request for the style update
    const resStyle = await axiosInstance.put(`/song/${id}/styles`, {
        firstStyle_id: data.firstStyle_id,
        secondStyle_id: data.secondStyle_id
    });
    if (resSong.status === 200 && resStyle.status === 200) {
        setIsVisible(true);
        setToastMessage(<LoadingDots />);
        setTimeout(() => { setToastMessage("Song updated succesfully") }, 1500);
        setTimeout(() => {
            window.location.href = `/song/${id}`;
        }, 2500);
    };
    if (resSong.status !== 200 || resStyle.status !== 200) {
        setIsVisible(true);
        setToastMessage("An error occured, please try again later");
    };
};

export default handleEditSong;