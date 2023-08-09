
import { useApp } from '../../contexts/appContext'
import './styles.css'

export default () => {

    const { urlObj, setJsonData } = useApp()

    return (
        <div className="requestJSON-container">
            <div>
                <textarea
                    id="json-data"
                    value={urlObj.jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    placeholder={(urlObj.requestType !== 'post' && urlObj.requestType !== 'put')?'Not required':'Please enter your body here'}
                    disabled={(urlObj.requestType !== 'post' && urlObj.requestType !== 'put')}
                />
            </div>

        </div>
    )

}