import React, { useState } from 'react';
import './styles.css'
import { useApp } from '../../contexts/appContext';

import { Box, List, ListItem, Divider, ListItemButton, Button, Drawer } from '@mui/material'
import ListIcon from '@mui/icons-material/List';

export default () => {

    const { urlHistory, historyDispatch } = useApp()
    const [showSideBar, setShowSidebar] = useState(true)
    const list = () => (
        <Box
            sx={{}}
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
        </Box>
    )


    return (
        <div className='history-sidebar'>
            <ListIcon onClick={() => setShowSidebar(true)} sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', },
            }} />

            <Box
                component="nav"
                aria-label="mailbox folders"
            >

                <Drawer
                    variant="temporary"
                    open={showSideBar}
                    onClose={() => setShowSidebar(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', },
                    }}
                >
                    {list()}
                </Drawer>
                <Drawer
                    anchor='left'
                    variant="permanent"
                    sx={{
                        '& .MuiDrawer-root': {
                            position: 'relative'
                        },
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { position: 'relative', boxSizing: 'border-box', },

                    }}

                    open

                >
                    {list()}
                </Drawer>
            </Box>

        </div>

    )
}

