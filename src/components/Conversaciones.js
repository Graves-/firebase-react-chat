import React, { Component } from 'react';
import { db } from '../firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Mensajes from './Mensajes';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
        user: 'edb5m56s2c',
        userEmail: '',
        userName: '',
        convos: []
    };
  }
  componentDidMount(){
    //get user data
    db.child(`usuarios/${this.state.user}`).on('value', snap => {
        let snapValue = snap.val();
        this.setState({
            userEmail: snapValue.email,
            userName: snapValue.nombre
        });
    });

    //get user conversations
    db.child(`usuarios/${this.state.user}/convos`).on('value', snap => {
        let temp = [];
        snap.forEach(item => {
            let convo = item.val();
            db.child(`convos/${convo.convoId}/members`).once('value', snap => {
                temp.push({
                    convoId: convo.convoId,
                    recipients: Object.keys(snap.val())
                });
                this.setState({convos: temp});
            });
        });
    });
  }
  render() {
    return (
      <Router>
        <div>
            {this.state.userEmail} - {this.state.userName}

            <ul>
                {this.state.convos.map(item => {
                    return <li key={item.convoId}><Link to={`/convo/${item.convoId}/${this.state.user}`}>{item.convoId}</Link></li>
                })}
            </ul>

            <Route path="/convo/:convoId/:userId" component={Mensajes} />
        </div>
      </Router>
    );
  }
}