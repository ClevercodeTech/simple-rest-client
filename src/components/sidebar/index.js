import React, { useState } from 'react';
import './styles.css'
import { useApp } from '../../contexts/appContext';

import { Box, List, ListItem, Divider, ListItemButton,Button,Drawer} from '@mui/material'
import {ListIcon} from '@mui/icons-material'

export default () => {

    const { urlHistory, historyDispatch } = useApp()
    const [showSideBar, setShowSidebar] = useState(true)
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setShowSidebar(false)}
            onKeyDown={() => setShowSidebar(false)}
        >
            <List>
                {urlHistory ? urlHistory.map((entry, index) => (
                    <ListItem key={entry.url} disablePadding>
                        <ListItemButton key={index} onClick={() => historyDispatch({ type: 'onSelectHistory', payload: entry })}>
                            {entry.url}
                        </ListItemButton>
                    </ListItem>
                )) : <ListItem>Add</ListItem>}
            </List>
            <Divider />
            <List>
                {urlHistory ? urlHistory.map((entry, index) => (
                    <ListItem key={entry.url} disablePadding>
                        <ListItemButton key={index} onClick={() => historyDispatch({ type: 'onSelectHistory', payload: entry })}>
                            {entry.url}
                        </ListItemButton>
                    </ListItem>
                )) : <ListItem>Add</ListItem>}
            </List>
        </Box>
    )


    return (<div>
        <ListIcon onClick={() => setShowSidebar(true)}/>
        <Drawer
            open={showSideBar}
            onClose={() => setShowSidebar(false)}
        >
            {list()}
        </Drawer>

    </div>

    )
}

