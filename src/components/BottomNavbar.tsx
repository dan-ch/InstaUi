import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import 'App.scss';
import {Link} from 'react-router-dom';
import {SvgIconProps} from '@mui/material/SvgIcon';
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface ListOfButtonTypes {
    value: string;
    icon: React.ReactElement<SvgIconProps>;
}

interface BottomNavbarProps {

}

export const BottomNavbar: React.FC<BottomNavbarProps> = () => {
    const [value, setValue] = React.useState("home");
    const { user } = useSelector((state: RootState) => state.auth)
    const ListOfButtons: ListOfButtonTypes[] = [
        {
            value: "home",
            icon: <HomeIcon />,
        },
        {
            value: "search",
            icon: <SearchIcon />,
        },
        {
            value: `profile/${user!.id}`,
            icon:<Avatar
                alt={user!.name}
                src={user!.avatar_url}
                sx={{ width: 24, height: 24 }}
            />
        }
    ];

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

  return (
          <BottomNavigation value={value} onChange={handleChange} className="bottom-navbar">
              {ListOfButtons.map((button) => {
                  return (
                      <BottomNavigationAction
                          key={button.value}
                          component={Link}
                          to={`/${button.value}`}
                          value={button.value}
                          icon={button.icon}
                      />
                  );
              })}
          </BottomNavigation>

  );
 }