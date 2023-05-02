import "./MainPage.css"
import SignUp from "../../components/SignUp/SignUp";

const MainPage = (): JSX.Element => {

    return <div className="main-page">
        <div className="img">
            <img src="doctor_image.png" />
        </div>
        <SignUp/>
    </div>
} 


export default MainPage;