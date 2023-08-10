
import { useApp } from '../../contexts/appContext'
import './styles.css'

export default()=>{
    const {urlObj, urlObjDispatch} = useApp()
   
    return(
        <div className="requestHeader-container">        
          <div>           
            <textarea
              id="headers"
              value={urlObj.headers}
              onChange={(e) =>  urlObjDispatch({ type: 'setHeaders', payload: e.target.value })}             
              placeholder={(urlObj.requestType === 'get')?'Not required':'Please enter your header here'}
              disabled ={urlObj.requestType === 'get'}                   
            />
          </div>
      
    </div>
    )
    
}