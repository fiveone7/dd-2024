import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";

function Body() {
	return (
		<Box
			className="App-body"
			minH={700}
			px={20}
			py={8}
		>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/settings"
					element={<Settings />}
				/>
				<Route
					path="/history"
					element={<Settings />}
				/>
			</Routes>
		</Box>
	);
}

export default Body;
