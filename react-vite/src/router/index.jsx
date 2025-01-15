import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage/LandingPage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import AllEventsPage from "../components/AllEventsPage/AllEventsPage";


export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "/home",
				element: <LandingPage />,
			},
			{
				path: "/login",
				element: <LoginFormPage />,
			},
			{
				path: "/signup",
				element: <SignupFormPage />,
			},
			{
				path: "/profile",
				element: <ProfilePage />,
			},
			{
				path: "/reservations",
				element: <>reservations page</>,
			},
			{
				path: "/photos",
				element: <>photos page</>,
			},
			{
				path: "/events",
				element: <AllEventsPage />,
			},
		],
	},
]);
