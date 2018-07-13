import React, { Component } from 'react';
import { db } from './firebase';
//import Mensajes from './components/Mensajes';
import Conversaciones from './components/Conversaciones';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount(){
    db.child('usuarios').on('value', snap => {
      let temp = [];
      snap.forEach(item => {
        temp.push(item.val());
      });
      this.setState({users: temp});
    })
  }
  render() {
    return (
      <div style={estilos.mainDiv}>
        <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">CHAT UG</Menu.Item>
              </Menu>
            </Header>
            <Layout>
                <Content style={{ background: '#fff', margin: 0, minHeight: 280 }}>
                  <Conversaciones />
                </Content>
            </Layout>
          </Layout>
      </div>
    );
  }
}

const estilos = {
  li: {
    listStyleType: 'none',
    backgroundColor: '#1975ff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    color: '#fff',
  },
  ul: {
    paddingBottom: 25,
    position: 'absolute',
    bottom: 0
  },
  form: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  input: {
    width: '100%'
  },
  msgTime: {
    marginLeft: 15,
    fontSize: 8
  },
  mainDiv: {
    //padding: 50
  }
}

export default App;
