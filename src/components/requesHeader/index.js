
import { useApp } from '../../contexts/appContext'
import './styles.css'

export default()=>{
    const {urlObj, setHeaders,requestType} = useApp()

    return(
        <div className="requestHeader-container">        
          <div>           
            <textarea
              id="headers"
              value={urlObj.headers}
              onChange={(e) => setHeaders(e.target.value)}             
              placeholder={(requestType === 'get')?'Not required':'Please enter your header here'}
              disabled ={requestType === 'get'}                   
            />
          </div>
      
    </div>
    )
    
}