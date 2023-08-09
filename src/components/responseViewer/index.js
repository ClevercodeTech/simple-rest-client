import { useApp } from "../../contexts/appContext";
import parse from 'html-react-parser';

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
        <div id="response">
            {viewType=="Html"?

                 <div  id="response-body" >{parse(responseText.replace('<html','<div').replace('</html','</div'))} </div>
                 :
                 <textarea id="response-body" value={responseText} readOnly />
            }
            
           
        </div>
    )
}