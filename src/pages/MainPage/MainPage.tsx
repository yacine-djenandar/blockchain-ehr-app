import "./MainPage.css"
import SignUp from "../../components/SignUp/SignUp";
import ScannerPage from "../ScannerPage/ScannerPage";

const MainPage = (): JSX.Element => {

    return <div className="main-page">
        {/* <div className="img">
            <img src="doctor_image.png" />
        </div>
        <SignUp/> */}
        <ScannerPage/>
    </div>
} 


export default MainPage;