import React, {useEffect, ChangeEvent} from 'react'
import TextField from '@mui/material/TextField';
import {AddPostModel} from 'models/PostModel';
import Avatar from '@mui/material/Avatar';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface PostFormProps {
    setPost: React.Dispatch<React.SetStateAction<AddPostModel>>;
    post: AddPostModel;
    file: File | null;
}

export const PostForm: React.FC<PostFormProps> = ({setPost, post, file}) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const handleChange = (event:  ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        setPost({
            ...post,
            photo: file
        })
    }, [file])

    return (
        <main className='post-form'>
            <img src={URL.createObjectURL(file)} alt="editImage" className="add-post__image"/>
            <div className="post-form__user-info">
                <Avatar alt="xd" src={user?.avatar_url} />
                <p>{user!.name}</p>
            </div>
            <div className="post-form__inputs">

                <TextField
                    fullWidth
                    label="Add description"
                    multiline
                    maxRows={4}
                    value={post?.description}
                    onChange={handleChange}
                    name='description'
                    className='post-form__input'
                />
                <TextField
                    fullWidth
                    label="Tags"
                    placeholder="#Tag #Tag #Tag"
                    value={post?.tags}
                    onChange={handleChange}
                    name='tags'
                    className='post-form__input'
                />
            </div>
        </main>
    );
}