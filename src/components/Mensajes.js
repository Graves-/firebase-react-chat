import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import { db } from '../firebase';
import uid from 'uid';
import ItemMensaje from './ItemMensaje';

export default class Mensajes extends Component {
    constructor(){
        super();
        this.state = {
            //user: 'edb5m56s2c',
            user: '2hxvrnxcvo',
            convo: 'p2jphcbid1',
            msgText: '',
            mensajes: [],
            convos: []
        };
    }
    componentDidMount(){
        this.routeChange = this.props.history.listen((location, action) => {
            //for(let i = 0; i < 10; i++) { console.log(uid(10)); }
            db.child(`convos/${this.props.match.params.convoId}/messages`).on('value', snapConvos => {
                let msgArray = [];
                snapConvos.forEach(convo => {
                    let convoItem = convo.val();
                    msgArray.push({
                        key: convoItem.key,
                        msgId: convoItem.msgId,
                        senderId: convoItem.senderId,
                        text: convoItem.text,
                        time: convoItem.time,
                        fecha: convo.fecha
                    });
                });
                msgArray = msgArray.sort((a,b) => {
                    return new Date(a.time) - new Date(b.time);
                })
                this.setState({mensajes: msgArray});
            });
        });
    }

    componentWillUnmount() {
        this.routeChange();
    }

    render() {
        return (
            <div>
                {this.state.mensajes.map((item) => {
                    return <ItemMensaje key={item.key} text={item.text} time={item.time} senderId={item.senderId} user={this.state.user}  />;
                })}
                <Input.TextArea onChange={(e) => this.setState({msgText: e.target.value})} onKeyPress={this.handleKeyboardSend} value={this.state.msgText} />
                <Button type="primary" style={{float: 'right', marginTop: 15}} onClick={this.handleSend}><Icon type="mail"/> Mandar</Button>
            </div>
        );
    }

    handleKeyboardSend = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            this.handleSend();
        }
    }

    handleSend = () => {
        let date = new Date();
        let genKey = uid(10);
        db.child(`convos/${this.props.match.params.convoId}/messages`).push({
            key: genKey,
            senderId: this.state.user,
            text: this.state.msgText,
            time: date.toLocaleString(),
        });
        this.setState({msgText: ''});
    }
}
