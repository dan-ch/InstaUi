import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {changeUsername, setAvatar} from "../../store/actions/authActions";
import {TextField} from "@mui/material";
import imageCompression from 'browser-image-compression';

interface EditProfileProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfile: React.FC<EditProfileProps> = ({setOpen}) => {
    const action = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);
    const [username, setUsername] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        action(changeUsername(username));
        setOpen(false);
        event.preventDefault();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const options = {
            maxWidthOrHeight: 100,
            useWebWorker: true
        }
        event.target.files && imageCompression(event.target.files[0], options).then((compressedFile) => {
            event.target.files && (action(setAvatar(compressedFile)));
        }).catch((error) => console.log(error))

    }
  return (
   <div className="edit-profile">
    <h1>Edit profile</h1>
       <div className="edit-profile__header">
           <Avatar alt={user!.name} src={user?.avatar_url} sx={{ width: 56, height: 56 }}/>
           <div className="edit-profile__user-info">
               <p className="edit-profile__username">{user?.name}</p>
               <label className="edit-profile__clickable-text">
                   <input type="file" accept="image/png, image/jpeg" onChange={changeAvatar}/>
                   Change avatar
               </label>
           </div>
       </div>
       <section>
               <form
                   onSubmit={handleSubmit}
                   className="reset__form reset__form--edit-profile"
               >
                   <TextField label="Username" name="username" placeholder={user!.name} type="text" variant="outlined" onChange={handleChange}/>
                   <Button type="submit" variant="contained">
                       Edit username
                   </Button>
               </form>
       </section>
   </div>
  );
 }