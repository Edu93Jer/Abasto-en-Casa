import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { ShoppingTwoTone , UserOutlined, ShopTwoTone, QuestionCircleTwoTone, LogoutOutlined, HomeTwoTone, ApiTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import { MyContext } from '../context/context'
import AUTH_SERVICE from '../services/auth'

import '../index.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class NavMenu extends Component {

  logOut = async () => {
      await AUTH_SERVICE.LOGOUT();
      this.context.logUser( null )
      this.props.history.push("/");
    };

render(){
  return(
    <Layout >
    <Sider className="Navbar"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
      }}
      onCollapse={(collapsed, type) => {
      }}
    >
      <div className="logo" />
      <Menu className="Navbar" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined style={{fontSize: 'large'}} />}>
          <Link to='/profile'> Profile </Link>
        </Menu.Item>
        <Menu.Item key="100" icon={<ApiTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16" />}>
          <Link to='/product/create'> Agregar Productos al API </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16" />}>
        <Link to='/orders'> Pedidos </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<ShopTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16" />} title="Departamentos">
            <Menu.Item key="3"><Link to='/product/department?department=market'>Abarrotes</Link></Menu.Item>
            <Menu.Item key="4"><Link to='/product/department?department=meats'>Carnes y Salchichonería</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/product/department?department=fruits'>Frutas</Link></Menu.Item>
            <Menu.Item key="6"><Link to='/product/department?department=vegetables'>Verduras</Link></Menu.Item>
          </SubMenu>
        <SubMenu key="sub2" icon={<QuestionCircleTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16" />} title="Ayuda">
            <Menu.Item key="7"><Link to="/faq">Preguntas Frecuentes</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/terms">Términos y Condiciones</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/contact">Contáctanos</Link></Menu.Item>
          </SubMenu>
        <Menu.Item key="11" icon={<LogoutOutlined style={{fontSize: 'large'}} />}  onClick={this.logOut}>
          Log Out
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Link to='/'>
          <HomeTwoTone twoToneColor="#fa8c16" style={{fontSize: 'x-large'}} />
        </Link>

        <Menu.Item key="1"><Link to='/login'>Iniciar Sesión</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/signup'>Crear Cuenta</Link></Menu.Item>
        <Menu.Item key="3"><Link to='/cart'><ShoppingCartOutlined twoToneColor="#fa8c16" style={{fontSize: 'x-large'}} />Carrito</Link></Menu.Item>

      </Menu>
    </Header>
      <Content  style={{ margin: '24px 16px 0' }}>
        <div  className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {this.props.children}
        </div>
      </Content>
      <Footer className="Navbar" style={{ textAlign: 'center' }}>Abasto en Casa® ©2020 </Footer>
      {/* <Footer className="Navbar" style={{ textAlign: 'center' }}>Abasto en Casa® ©2020 Created with <span role="img" aria-label="created">🧠, 🥚🥚's & ❤️</span> by Edu.ZJ</Footer> */}
    </Layout>
    </Layout>
   )
  }
}

NavMenu.contextType = MyContext

export default withRouter(NavMenu)