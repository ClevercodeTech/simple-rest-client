
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
              placeholder={'Please enter your header here'}
                              
            />
          </div>
      
    </div>
    )
    
}