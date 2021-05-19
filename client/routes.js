import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/home';
import Game from './components/game';
import { Lobby } from './components/lobby'
import { CreateRoom } from './components/create-room';

export const Routes = (props) => {
    return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/create-room" component={CreateRoom} />
                <Route exact path="/games/:gameId" component={Game} /> 
            </Switch>
    )
}