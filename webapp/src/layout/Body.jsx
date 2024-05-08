import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Material from "../pages/Material";
import Upcoming from "../pages/Upcoming";
import History from "../pages/History";
import CreateQuestion from "../pages/CreateQuestion";

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
					element={<History />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/upgrade"
					element={<Pricing />}
				/>
				<Route
					path="/material"
					element={<Material />}
				/>
				<Route
					path="/upcoming"
					element={<Upcoming />}
				/>
				<Route
					path="/create"
					element={<CreateQuestion/>}
				/>
			</Routes>
		</Box>
	);
}

export default Body;