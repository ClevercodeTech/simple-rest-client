import { useApp } from "../../contexts/appContext";
import parse from 'html-react-parser';
import { Box, TextareaAutosize } from '@mui/material'
import './styles.css'
export default ({ viewType }) => {
    const { urlObj } = useApp()
    let responseText = urlObj.response
    switch (viewType) {
        case "JSON":
            try {
                const parsedData = JSON.parse(urlObj.response);
                responseText = JSON.stringify(parsedData, null, 2); // Format with 2 spaces
            } catch (error) {
            }
            break;
        case "Html":

            break;

        default:
            break;
    }

   


    return (
        <Box id="response" >
            
            {viewType=="Html"?

                 <Box  id="response-body" >
                    {parse(responseText.replace('<html','<div').replace('</html','</div'))} </Box>
                 :
                 <textarea 
                 id="response-body" value={responseText} readOnly minRows={5} maxRows={10}/>
            }
            
           
        </Box>
    )
}