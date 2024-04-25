import axiosInstance from './axiosInstance';
import LoadingDots from "../components/Loaders/LoadingDots";

interface Props {
  e: React.FormEvent<HTMLFormElement>;
  userId: number;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string | React.JSX.Element>>;
  navigate: (path: string) => void;
};

async function handleAddSong({ e, userId, setIsVisible, setToastMessage, navigate }: Props) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  // Check if all the required fields are filled
  if (
    data.title === ''
    || data.artist === ''
    || data.firstStyle_id === ''
    || data.tuning_id === ''
    || data.capo === ''
    || data.difficulty === ''
    || data.status === ''
    || data.tab_link === ''
  ) {
    setIsVisible(true);
    setToastMessage('Please fill all the required fields');
    return;
  };
  // Check if the two styles are different
  if (data.firstStyle_id === data.secondStyle_id) {
    setIsVisible(true);
    setToastMessage('Please choose two different styles');
    return;
  };

  const res = await axiosInstance.post(`/user/${userId}/add`, data);
  if (res.status === 200) {
    setIsVisible(true);
    setToastMessage(<LoadingDots />);
    setTimeout(() => { setToastMessage(res.data) }, 1500);
    setTimeout(() => {
      navigate(`/`);
    }, 2500);
  } else {
    setIsVisible(true);
    setToastMessage('An error occured, please try again');
    return;
  };
};

export default handleAddSong;