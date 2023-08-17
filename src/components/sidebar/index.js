import React, { useState } from 'react';
import './styles.css'
import { useApp } from '../../contexts/appContext';

import { Box, List, ListItem, Divider, ListItemButton, Button, Drawer } from '@mui/material'
import ListIcon from '@mui/icons-material/List';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

export default () => {

    const { urlHistory, historyDispatch, urlObjDispatch } = useApp()
    const [showSideBar, setShowSidebar] = useState(true)
    const list = () => (
        <Box
            sx={{}}
            role="presentation"
            onClick={() => setShowSidebar(false)}
            onKeyDown={() => setShowSidebar(false)}

        >
            <List>
                <ListItem key={'NewUrl'} disablePadding >
                    <ListItemButton key={'newUrlListButton'}
                        style={{ justifyContent: "space-between" }}
                        onClick={() => urlObjDispatch({ type: 'addNewurl' })}>
                        {'Add New'}
                    </ListItemButton>
                    <IconButton onClick={() => urlObjDispatch({ type: 'addNewurl' })}>
                        <AddIcon fontSize='small' color='grey' />
                    </IconButton>

                </ListItem>
                <Divider key={'NewUrl' + 'divider'} />

                {urlHistory ? urlHistory.map((entry, index) => (
                    <div key={entry.url + 'div'} >
                        <ListItem key={entry.url} disablePadding >
                            <ListItemButton key={index}
                                style={{ justifyContent: "space-between" }}
                                onClick={() => historyDispatch({ type: 'onSelectHistory', payload: entry })}>
                                {entry.url}
                            </ListItemButton>
                            <IconButton onClick={() => historyDispatch({ type: 'removeurlHistory', payload: entry })}>
                                <RemoveCircleOutlineIcon fontSize='small' color='grey' />

                            </IconButton>

                        </ListItem>
                        <Divider key={entry.url + 'divider'} />
                    </div>


                )) : <ListItem>Add</ListItem>}
            </List>

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

