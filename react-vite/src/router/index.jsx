import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";


export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/home",
				element: <>Hello world</>,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
		],
	},
]);
