import React, { useEffect, FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Style/App.css';
import 'notyf/notyf.min.css'

//Components
import BarreDeNavigation from "./Components/Navbar"

//Nos routes
import Connexion from "./Routes/Connexion"
import Inscription from "./Routes/Inscription"
import Lorem from "./Routes/LoremIpsum"

const App : FunctionComponent<{}> = () => {
	return (
		<Router>
			<BarreDeNavigation />
			<Switch>
				<Route exact path="/" component={Inscription} />
				<Route exact path="/connexion" component={Connexion} />
				<Route exact path="/lorem" component={Lorem} /> 
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
