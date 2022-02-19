import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {PostModel} from "../../models/PostModel";
import {User} from '../../models/UserModel'
import axios from "utils/axiosInstance";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import ProfilePost from "../../components/ProfilePost";
import {useDebouncedCallback} from 'use-debounce';
import InputAdornment from '@mui/material/InputAdornment';

interface SearchProps {

}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
export const Search: React.FC<SearchProps> = () => {
    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState<PostModel[] | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(false);

    const debounced = useDebouncedCallback(
        (searchValue) => {
            if(searchValue.length >= 4){
                setLoading(true);
                console.log(searchValue);
                axios.get('/search', {
                    params: {
                        'user': searchValue,
                        'post': searchValue,
                    },
                    headers: {
                        Accept: 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    const foundUsers = response.data.data.users;
                    const foundPosts = response.data.data.posts;

                    setUsers(foundUsers);
                    setPosts(foundPosts);
                    setLoading(false);
                }).catch(error => console.log(error));
            }
        },
        // delay in ms
        1000
    );

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
   <div className="search">
       <div className="search__input">
           <TextField
               fullWidth
               placeholder="Search"
               onChange={(e) => debounced(e.target.value)}
               variant="standard"
               InputProps={{
                   startAdornment: (
                       <InputAdornment position="start">
                           <i className="fas fa-search" />
                       </InputAdornment>
                   ),
               }}
           />
       </div>
       <div className="search__content">

           <Box sx={{ width: '100%' }}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                   <Tabs value={value} onChange={handleChangeTab}>
                       <Tab label="Users" />
                       <Tab label="Posts" />
                   </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
                   {loading ? <div className="search__loading"><CircularProgress size={40} /></div> : users && users.map((user) => (
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
                   ))}
               </TabPanel>
               <TabPanel value={value} index={1}>
                   {loading ? <div className="search__loading"><CircularProgress size={40} /></div> : posts && <div className="profile-posts">{posts.map((post) => (
                       <ProfilePost post={post} key={post.id} searchActive={true}/>
                   ))}</div>}
               </TabPanel>
           </Box>
       </div>

   </div>
  );
 }