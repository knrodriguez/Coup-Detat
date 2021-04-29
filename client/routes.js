import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components/home';
import { Game } from './components/game';
import { CreateGame } from './components/create-game';

export const Routes = (props) => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/create-game' component={CreateGame} />
            <Route exact path='/games/:gameId' component={Game} />  
        </Switch>
    )
}