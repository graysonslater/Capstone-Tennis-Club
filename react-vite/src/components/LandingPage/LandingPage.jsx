/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { allEvents } from "../../redux/events";
import "./LandingPage.css"
import SlideShow from "./SlideShow";
import Instagram from './LandingPagePhotos/insta.png';
import FaceBook from './LandingPagePhotos/faceBook.png';
import X from './LandingPagePhotos/x.png';

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function LandingPage(){
    const dispatch = useDispatch();

    // const events = useSelector((state) => {
    //     return state.events.allEvents;
    // });
    // console.log("LANDING PAGE= ", events)
    useEffect(()=> {
        dispatch(allEvents())
    },[dispatch]);

    const handleRegistration = (e) => {
        e.preventDefault();
        e.stopPropagation();
        alert("Feature Coming Soon!")
    }

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/


    return (
        <div className="landingPageLayout">
            <h2 className="landingHeader">Welcome to Capstone Tennis Club</h2>
            <div className="landingSlideShow">
                <SlideShow />
            </div>
            <div className="landingText">
                    Experience the thrill of tennis at Capstone Tennis Club, where passion meets excellence.
                    Join our vibrant community of players and elevate your game with top-notch facilities 
                    and challenging events!
            </div>
            <div className="InfoBoxes">
            <div className="hoursBox">
                <h2 className="hoursHeader">Hours</h2>
                <div className="hoursTimes">
                    <p className="time1">Monday: 9am - 8pm</p>
                    <p className="time2">Tuesday: 9am - 8pm</p>
                    <p className="time3">Wednesday: 9am - 8pm</p>
                    <p className="time4">Thursday: 9am - 8pm</p>
                    <p className="time5">Friday: 9am - 8pm</p>
                    <p className="time6">Saturday: 9am - 8pm</p>
                    <p className="time7">Sunday: 9am - 8pm</p>
                </div>
            </div>
            <div className="ratesBox">
                <h2>Rates</h2>
                <div className="ratesPrices">
                    <p>1 player: $40</p>
                    <p>2 players: $20 per person</p>
                    <p>3 players: $17 per person</p>
                    <p>4 players: $10 per person</p>
                </div>
            </div>
            </div>
            <div className="landingSocials">
                <img src={FaceBook} alt="Facebook" className="FaceBook" onClick={(e) => handleRegistration(e)} />
                <div className="instaDiv">
                    <img src={Instagram} alt="Instagram" className="Insta"  onClick={(e) => handleRegistration(e)}/>
                </div>
                <img src={X} alt="X" className="X"  onClick={(e) => handleRegistration(e)}/>
            </div>
        
        </div>
    )
}

export default LandingPage;