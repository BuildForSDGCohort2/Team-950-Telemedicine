import React from "react";
import { Route, Link, Switch } from 'react-router-dom';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

export default function DashboardComponent() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bubblegum">Bubblegum</Link>
            </li>
            <li>
              <Link to="/shoelaces">Shoelaces</Link>
            </li>
          </ul>

          <Switch>
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </>
  );
}

// import { Layout, Menu } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';

// const { Header, Sider, Content } = Layout;

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {
//     return (
//       <Layout>
//         <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
//           <div className="logo" />
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//             <Menu.Item key="1" icon={<UserOutlined />}>
//               nav 1
//             </Menu.Item>
//             <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//               nav 2
//             </Menu.Item>
//             <Menu.Item key="3" icon={<UploadOutlined />}>
//               nav 3
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout className="site-layout">
//           <Header className="site-layout-background" style={{ padding: 0 }}>
//             {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//               className: 'trigger',
//               onClick: this.toggle,
//             })}
//           </Header>
//           <Content
//             className="site-layout-background"
//             style={{
//               margin: '24px 16px',
//               padding: 24,
//               minHeight: 280,
//             }}
//           >
//             Content
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }

// ReactDOM.render(<SiderDemo />, mountNode);
