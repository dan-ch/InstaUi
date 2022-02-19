import React, {useEffect, useState} from 'react';
import axios from "../../utils/axiosInstance";
import {User} from "../../models/UserModel";
import Avatar from "@mui/material/Avatar";
import {Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


interface FollowListDialogProps{
    id: number
    path: 'followed' | 'followers';
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowListDialog: React.FC<FollowListDialogProps> = ({id, path, setOpen}) => {

    const [users, setUsers] = useState<null | User[]>(null);

    async function fetchData() {
        await axios.get(`./users/${id}/${path}`, {
            headers: {
            Accept: "application/json",
        }}).then((response) => {
            const users = response.data.data as User[];
            setUsers(users);
            }
        ).catch(error => console.log(error));
    }

    useEffect(() => {
        fetchData();

        return () => {
            setOpen(false);
        }
    }, []);

    return (
        <section className="follow-dialog">
            <h1>{path.charAt(0).toUpperCase() + path.slice(1)}</h1>
            <article className="follow-dialog__users">
                {users ? users.map(user => (
                    <section key={user.id} className="follow-dialog__user">

                        <div className="follow-dialog__avatar">
                            <Link to={`/profile/${user.id}`}><Avatar
                                alt={user.name}
                                src={user.avatar_url}
                                sx={{ width: 30, height: 30 }}

                            /></Link>
                        </div>
                        <Link to={`/profile/${user.id}`}>{user.name}</Link>
                    </section>
                )) : <section className="follow-dialog__loading">
                    <CircularProgress />
                </section>}
            </article>
        </section>
    );
};

export default FollowListDialog;
