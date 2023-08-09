import logo from '../../images/logo.png'
import './styles.css'
export default () => {

    return (
        <header>
            <img src={logo} alt="logo" />
            <h1>Simple REST client</h1>
        </header>
    )
}