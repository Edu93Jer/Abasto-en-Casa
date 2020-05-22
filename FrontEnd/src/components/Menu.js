import React, { Component } from 'react'
import { Layout, Menu, Badge, Typography } from 'antd';
import { ShoppingTwoTone, UserOutlined, ShopTwoTone, QuestionCircleTwoTone, LogoutOutlined, ApiTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import { MyContext } from '../context/context'
import AUTH_SERVICE from '../services/auth'
import '../index.css'

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class NavMenu extends Component {
  state = {
    counterCart: 0
  }

  logOut = async () => {
    await AUTH_SERVICE.LOGOUT();
    this.context.logUser(null)
    this.props.history.push("/");
  };

  componentDidUpdate() {
    const counter = this.context.cart.length
    if (counter !== this.state.counterCart) {
      this.setState({ counterCart: counter })
    }
  }


  render() {
    return (
      <Layout >
        <Header className="header" style={{ position: 'fixed', zIndex: 100, width: '100%' }}>
          <Menu className='MenuHeader' theme="dark" mode="horizontal">
            <>
              <Link to='/'>
                <img
                  src='https://res.cloudinary.com/abasto-en-casa/image/upload/v1589906088/AbastoProducts/Logo_01.png.png'
                  alt='logo'
                  className='LogoMenu'
                />
              </Link>
            </>

            {this.context.loggedUser ?
              <>
                <Menu.Item key="8888" style={{ alignSelf: "center" }}><Link to='/profile' className='Link'><Text className='Link' strong>Bienvenido {this.context.loggedUser.name}</Text></Link></Menu.Item>
              </>
              :
              <>
                <Menu.Item key="1" style={{ alignSelf: "center" }}><Text><Link to='/login' className='Link'>Iniciar Sesión</Link></Text></Menu.Item>
                <Menu.Item key="2" style={{ alignSelf: "center" }}><Link to='/signup'><Text className='Link'>Crear Cuenta</Text></Link></Menu.Item>
              </>}

            <Menu.Item key="3">
              <Link to='/cart'>
                <Badge count={this.state.counterCart} style={{ backgroundColor: '#fa8c16' }}>
                  <ShoppingCartOutlined twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} className="head-example" />
                </Badge>
                <Text className='Link'>
                  Carrito
                </Text>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Sider className="Navbar"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
          }}
        >
          <Menu className="Navbar" mode="inline">
            {this.context.loggedUser?.rol &&
              <Menu.Item key="1" icon={<UserOutlined style={{ fontSize: 'large' }} />}>
                <Link to='/profile' className='Link'><Text className='Link'> Profile </Text></Link>
              </Menu.Item>}
            {this.context.loggedUser?.rol === 'admin' &&
              <Menu.Item key="100" icon={<ApiTwoTone style={{ fontSize: 'large' }} twoToneColor="#fa8c16" />}>
                <Link to='/product/create' className='Link'><Text className='Link'> Agregar Productos al API </Text></Link>
              </Menu.Item>}
            {this.context.loggedUser?.rol &&
              <Menu.Item key="2" icon={<ShoppingTwoTone style={{ fontSize: 'large' }} twoToneColor="#fa8c16" />}>
                <Link to='/orders'><Text className='Link'> Pedidos </Text></Link>
              </Menu.Item>}
            <SubMenu key="sub1" icon={<ShopTwoTone style={{ fontSize: 'large' }} twoToneColor="#fa8c16" />} title="Departamentos" className='Link'>
              <Menu.Item key="3"><Link to='/product/department?department=market'>Abarrotes</Link></Menu.Item>
              <Menu.Item key="4"><Link to='/product/department?department=meats'>Carnes y Salchichonería</Link></Menu.Item>
              <Menu.Item key="5"><Link to='/product/department?department=fruits'>Frutas</Link></Menu.Item>
              <Menu.Item key="6"><Link to='/product/department?department=vegetables'>Verduras</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<QuestionCircleTwoTone style={{ fontSize: 'large' }} twoToneColor="#fa8c16" />} title="Ayuda" className='Link'>
              <Menu.Item key="7"><Link to="/faq">Preguntas Frecuentes</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/terms">Términos y Condiciones</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/contact">Contáctanos</Link></Menu.Item>
            </SubMenu>
            {this.context.loggedUser?.rol &&
              <Menu.Item key="11" icon={<LogoutOutlined style={{ fontSize: 'large' }} />} onClick={this.logOut}>
                <Text className='Link'> Cerrar Sesión </Text>
              </Menu.Item>}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer className="Navbar" style={{ textAlign: 'center' }}>Abasto en Casa® ©2020 Created with <span role="img" aria-label="created">🧠, 🥚🥚's & ❤️</span> by Edu.ZJ</Footer>
        </Layout>
      </Layout >
    )
  }
}

NavMenu.contextType = MyContext

export default withRouter(NavMenu)