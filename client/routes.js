import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/home';
import Game from './components/game';
import { Lobby } from './components/rooms'

export const Routes = (props) => {
    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rooms" component={Lobby} />
                <Route exact path="/games/:gameId" component={Game} /> 
            </Switch>
    )
}