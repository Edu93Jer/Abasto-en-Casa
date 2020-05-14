import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { ShoppingTwoTone , UserOutlined, ShopTwoTone, QuestionCircleTwoTone, LogoutOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'

import AUTH_SERVICE from '../services/auth'

import '../index.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class NavMenu extends Component {

  logOut = async () => {
      await AUTH_SERVICE.LOGOUT();
      this.props.history.push("/");
    };

render(){
  return(
    <Layout >
    <Sider className="Navbar"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu className="Navbar" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to='/profile'> Profile </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingTwoTone twoToneColor="#fa8c16" />}>
        <Link to='/orders'> Pedidos </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<ShopTwoTone twoToneColor="#fa8c16" />} title="Departamentos">
            <Menu.Item key="3">Abarrotes</Menu.Item>
            <Menu.Item key="4">Carnes y Salchichonería</Menu.Item>
            <Menu.Item key="5">Frutas</Menu.Item>
            <Menu.Item key="6">Verduras</Menu.Item>
          </SubMenu>
        <SubMenu key="sub2" icon={<QuestionCircleTwoTone twoToneColor="#fa8c16" />} title="Ayuda">
            <Menu.Item key="7">Preguntas Frecuentes</Menu.Item>
            <Menu.Item key="8">Términos y Condiciones</Menu.Item>
            <Menu.Item key="9">Contáctanos</Menu.Item>
          </SubMenu>
        <Menu.Item key="11" icon={<LogoutOutlined />}  onClick={this.logOut}>
          Log Out
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to='/login'>Iniciar Sesión</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/signup'>Crear Cuenta</Link></Menu.Item>
        <Menu.Item key="3"><Link to='/cart'>Carrito</Link></Menu.Item>
      </Menu>
    </Header>
      <Content  style={{ margin: '24px 16px 0' }}>
        <div  className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {this.props.children}
        </div>
      </Content>
      <Footer className="Navbar" style={{ textAlign: 'center' }}>Abasto en Casa® ©2020 Created with <span role="img" aria-label="heart">❤️</span> by Edu.ZJ</Footer>
    </Layout>
    </Layout>
   )
  }
}

export default withRouter(NavMenu)