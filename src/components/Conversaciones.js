import React, { Component } from 'react';
import { db } from '../firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Mensajes from './Mensajes';

import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
        //user: 'edb5m56s2c',
        user: '2hxvrnxcvo',
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
                /*
                snap.forEach(member => {
                    db.child(`usuarios/${member.key}/nombre`).once('value', snapUser => {
                        console.log(snapUser.val());
                    });
                });
                */
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
            <Layout>
              <Sider width={300} style={{ background: '#fff' }}>
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>  
                    <Menu.Item disabled>{this.state.userEmail} - {this.state.userName}</Menu.Item>  
                    {this.state.convos.map((item, i) => {
                        return <Menu.Item key={item.convoId}><Link to={`/convo/${item.convoId}/${this.state.user}`}><Icon type="message" />{item.convoId}</Link></Menu.Item>
                    })}
                </Menu>
              </Sider>

              <Layout style={{ padding: '0 24px 24px' }}>
                  <Content style={{ background: '#fff', padding: 25, margin: 0, minHeight: 280 }}>
                    <Route path="/convo/:convoId/:userId" component={Mensajes} />
                  </Content>
              </Layout>
            </Layout>  
        </div>
      </Router>
    );
  }
}