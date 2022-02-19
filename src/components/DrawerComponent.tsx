import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

interface DrawerProps {
    list?: JSX.Element;
    drawerTitle: string;
}

export const DrawerComponent: React.FC<DrawerProps> = ({drawerTitle, list}) => {
    const [visible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!visible);
    };

    const drawerContent = () => (
        <Box
            role="presentation"
            onClick={toggle}
            onKeyDown={toggle}
        >
            {list}
        </Box>
    );

    return (
        <div>
            <Button onClick={toggle} variant="outlined" color="primary">
                {drawerTitle}
            </Button>
            <Drawer open={visible} onClose={toggle} anchor="bottom">
                {drawerContent()}
            </Drawer>
        </div>
  );
 }