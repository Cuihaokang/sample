import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import { BrowserRouter as Router, Route, Link, HashRouter, Redirect, Switch } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import { Article } from './Article/Article';
import { ArticleCreate } from './Article/ArticleCreate';
import { ArticleDetail } from './Article/ArticleDetail';
import { Tag } from './Tag/Tag';
import { Comment } from './Comment/Comment';
import { Visit } from './Visit/Visit';
import { Dashboard } from './Dashboard/Dashboard';
import { User } from './User/User';
import { Setting } from './Setting/Setting';
import styles from "./Main.css";

//头像下拉菜单处理
const avatarOnClick = function({key}){
  switch (key) {
    case 'personal':
      // location.hash = '#/settings/personal';
      break;
    case 'logout':
      axios.post('logout')
      .then(function (response) {
        location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
      break;
    default: break;
  }
};
//头像下拉菜单
const menu = (
  <Menu onClick={avatarOnClick}>
    <Menu.Item key="version">
      <Icon type="crown" />
      <span>版本 1.0.10</span>
    </Menu.Item>
    <Menu.Item key="personal">
      <Icon type="user" />
      <span>博主设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
);
class SiderLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <HashRouter>
        <Layout className="sider-layout">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="dashboard" />
                  <span>后台首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/articles">
                  <Icon type="edit" />
                  <span>文章管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/comments">
                  <Icon type="message" />
                  <span>留言管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/visits">
                  <Icon type="rocket"/>
                  <span>访问管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/users">
                  <Icon type="user" />
                  <span>用户管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/settings">
                  <Icon type="setting" />
                  <span>网站管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <a href="/">
                  <Icon type="logout"/>
                  <span>退出后台</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style={{ float:'right', height:'100%', padding: '0 20px' }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Avatar icon="user" style={{ verticalAlign: 'middle' }}/>
                  </a>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                <Switch>
                  <Route path="/" exact component={Dashboard}/>
                  <Route path="/articles" exact component={Article}/>
                  <Route path="/articles/create" exact component={ArticleCreate}/>
                  <Route path="/articles/:id" component={ArticleDetail}/>
                  <Route path="/tags" component={Tag}/>
                  <Route path="/comments" exact component={Comment}/>
                  <Route path="/visits" exact component={Visit}/>
                  <Route path="/users" exact component={User}/>
                  <Route path="/settings/:module" exact component={Setting}/>
                  <Redirect to="/" />
                </Switch>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}
if (document.getElementById('root')) {
    ReactDOM.render(<SiderLayout />, document.getElementById('root'));
}
