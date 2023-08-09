
import { useApp } from '../../contexts/appContext'
import './styles.css'

export default () => {

    const { jsonData, setJsonData, requestType } = useApp()

    return (
        <div className="requestJSON-container">
            <div>
                <textarea
                    id="json-data"
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    placeholder={(requestType !== 'post' && requestType !== 'put')?'Not required':'Please enter your body here'}
                    disabled={(requestType !== 'post' && requestType !== 'put')}
                />
            </div>

        </div>
    )

}