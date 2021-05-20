import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Game, Rooms } from './components';

export const Routes = (props) => {
    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rooms" component={Rooms} />
                <Route exact path="/games/:gameId" component={Game} /> 
            </Switch>
    )
}