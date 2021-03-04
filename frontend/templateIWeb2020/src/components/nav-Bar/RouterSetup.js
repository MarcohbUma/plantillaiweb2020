import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBarMain from "./index";
import Home from "../home";
import TemplateEntities from "../templateEntity";
import TemplateEntityForm from "../templateEntity/templateEntityForm";
import TemplateEntityInfo from "../templateEntity/templateEntityInfo";
import MapEntities from "../mapEntities";

const RouterSetup = () => {
    return (
        <Router>
            <NavBarMain/>
            <Switch>
                <Route exact path = '/'>
                    <Home/>
                </Route>
                <Route exact path = '/templateEntities'>
                    <TemplateEntities/>
                </Route>
                <Route exact path = '/templateEntities/user/:user'>
                    <TemplateEntities/>
                </Route>
                <Route exact path = '/templateEntities/:idAttr'>
                    <TemplateEntityInfo/>
                </Route>
                <Route path = '/templateEntities/edit/:idAttr'>
                    <TemplateEntityForm/>
                </Route>
                <Route exact path = '/newTemplateEntity'>
                    <TemplateEntityForm/>
                </Route>
                <Route exact path = '/mapEntities'>
                    <MapEntities/>
                </Route>
                <Route exact path = '/mapEntities/:user'>
                    <MapEntities/>
                </Route>
            </Switch>
        </Router>
    );
};

export default RouterSetup;