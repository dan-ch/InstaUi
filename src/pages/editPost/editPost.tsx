import React, {ChangeEvent, useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import axios from "utils/axiosInstance";
import {PostModel} from "../../models/PostModel";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


interface EditPostProps {

}

export const EditPost: React.FC<EditPostProps> = ({}) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<PostModel | null>(null);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let unmounted = false;
        axios.get(`./posts/${state.id}`).then((response) => {
            if(!unmounted){
                setPost(response.data.data);
                setLoading(false);
            }
        })

        return () => {
            unmounted = true;
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        post && setPost({
            ...post,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        axios.put(`./posts/${state.id}`, post).then(() => {
            navigate(`/profile/${post?.author_id}`);
        }).catch((error) => console.log(error));
    }



    if(loading){
        return <CircularProgress size={40} />
    }

    return (<main className="edit-post">
        <h2>Edit post</h2>
        <img src={post?.img_url} alt={post?.img_url}/>
        <div className="edit-post__form">
            <TextField
                fullWidth
                label="Add description"
                multiline
                maxRows={4}
                value={post!.description ? post?.description : ""}
                name='description'
                className='edit-post__input'
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Tags"
                placeholder="#Tag #Tag #Tag"
                value={post!.tags ? post?.tags : ""}
                name='tags'
                className='edit-post__input'
                onChange={handleChange}
            />

            <Button onClick={handleSubmit} variant="contained">Save changes</Button>
        </div>

    </main>);
}