import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
import {AppstoreOutlined, MailOutlined  } from '@ant-design/icons';
// Introduce submenu components
// const SubMenu = Menu.SubMenu;
const items = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: 'Helloworld',
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: 'Dashboard',
      children: [
        {
          key: '21',
          label: 'Option 1',
        },
        {
          key: '22',
          label: 'Option 2',
        },
        {
          key: '23',
          label: 'Submenu',
          children: [
            {
              key: '231',
              label: 'Option 1',
            },
            {
              key: '232',
              label: 'Option 2',
            },
            {
              key: '233',
              label: 'Option 3',
            },
          ],
        },
        {
          key: '24',
          label: 'Submenu 2',
          children: [
            {
              key: '241',
              label: 'Option 1',
            },
            {
              key: '242',
              label: 'Option 2',
            },
            {
              key: '243',
              label: 'Option 3',
            },
          ],
        },
      ],
    },
];
const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
};
  
const levelKeys = getLevelKeys(items);

const Nav = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const handleGuoailiBeigan =({item, key, keyPath, domEvent }) => {
        console.log('item=',item);
        console.log('key=',key);
        console.log('keypath=',keyPath);
        console.log('domevent=',domEvent);
    };
    const onOpenChange = (openKeys) => {
      const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
      // open
      if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
          .filter((key) => key !== currentOpenKey)
          .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
        setStateOpenKeys(
          openKeys
            // remove repeat key
            .filter((_, index) => index !== repeatIndex)
            // remove current level all child
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
      } else {
        // close
        setStateOpenKeys(openKeys);
      }
    };    
    return (
        <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
          <Menu theme='dark'
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            onClick={handleGuoailiBeigan}
            style={{
                width: 256,
                }}
            items={items} >
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              主展示区
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
};
export default Nav;