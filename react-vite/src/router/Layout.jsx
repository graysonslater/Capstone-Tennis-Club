/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */

import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";


export default function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const location = useLocation();

	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	if (user && location.pathname === "/") {
		return <Navigate to="/home" />;
	}

	return (
		<>
			<ModalProvider>
				<Outlet />
				<Modal />
			</ModalProvider>
		</>
	);
}
