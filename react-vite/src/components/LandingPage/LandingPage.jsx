/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { allEvents } from "../../redux/events";
import SlideShow from "./SlideShow";


/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function LandingPage(){
    const dispatch = useDispatch();

    const events = useSelector((state)=> {
        return state.events.allEvents;
    });
    console.log("LANDING PAGE= ",events)
    useEffect(()=> {
        dispatch(allEvents())
    },[dispatch]);

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
                    Experiance the thrill of tennis at capstone tennis club, where passion meets excellence.
                    Join our vibrant community of players and elevate your game with top-notch facilities 
                    and challanging events!
            </div>
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
            <div className="landingPageEvents">
                <h2 className="landingPageEventsHeader">Upcoming Events</h2>
                <ul className="landingPageEventsList">
                    {events.map((event) => (
                        <li key={event.id} className={`LPE${event.id}`}>
                            <p>{event.event_name}</p>
                            <p>Registration Price: {event.registration_price}, Date: {event.event_date}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="landingSocials">
                <p>fake X</p>
                <p>fake facebook</p>
                <p>fake instagram</p>
            </div>
        </div>
    )
}

export default LandingPage;