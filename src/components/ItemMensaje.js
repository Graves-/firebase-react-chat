import React, { Component } from 'react';

export default class ItemMensaje extends Component {
  render() {
    return (
      <div style={this.props.senderId !== this.props.user ? estilos.otherMsgCont : estilos.msgCont}>
        <span style={this.props.senderId !== this.props.user ? estilos.otherMsg : estilos.userMsg}>{this.props.text}</span>
        <span style={estilos.timestamp}>{new Date(this.props.time).toLocaleTimeString()}</span>
      </div>
    );
  }
}

const estilos = {
    msgCont: {
        marginTop: 10,
        marginBottom: 10,
        //position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    otherMsgCont: {
        marginTop: 10,
        marginBottom: 10,
        //position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    timestamp: {
        fontSize: '8pt',
        //position: 'absolute',
        //bottom: 0
    },
    userMsg: {
        fontSize: '14pt',
        backgroundColor: '#d9dce0',
        padding: 5,
        borderRadius: 10
    },
    otherMsg: {
        fontSize: '14pt',
        backgroundColor: '#c2f4b2',
        padding: 5,
        borderRadius: 10
    }
}