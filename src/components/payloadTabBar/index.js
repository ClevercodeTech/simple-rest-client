import { Box, Tabs, Tab, TableRow, } from "@mui/material"
import { useState, SyntheticEvent } from "react"
import RequesHeader from "../requesHeader";
import RequestJSON from "../requestJSON";

export default () => {
    const [tabIndex, setTabindex] = useState(0)
    const handleChange = (SyntheticEvent, newValue) => {
        setTabindex(newValue);
    };
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Header" {...a11yProps(0)} />
                    <Tab label="body" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {tabIndex == 0 ? <div value={tabIndex} index={0}>
               <RequesHeader />
            </div> :
                <div value={tabIndex} index={1}>
                    <RequestJSON />
                </div>
            }

        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}