import { Box, Tabs, Tab, TableRow, } from "@mui/material"
import { useState, SyntheticEvent } from "react"
import ResponseViewer from "../responseViewer";


export default () => {
    const [tabIndex, setTabindex] = useState(0)
    const handleChange = (SyntheticEvent, newValue) => {
        setTabindex(newValue);
    };
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="JSON" {...a11yProps(0)} />
                    <Tab label="Html" {...a11yProps(0)} />
                    <Tab label="Raw" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {tabIndex == 0 ? <div value={tabIndex} index={0}>
                <ResponseViewer viewType={"JSON"} />
            </div> :tabIndex == 1 ?
                <div value={tabIndex} index={1}>
                    <ResponseViewer viewType={"Html"} />
                </div> :<div value={tabIndex} index={1}>
                    <ResponseViewer viewType={"Raw"} />
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