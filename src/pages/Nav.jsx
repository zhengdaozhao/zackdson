import React, { useState } from 'react';
import { Layout, Menu,Button } from 'antd';
const { Header, Content, Sider,Footer } = Layout;
import {AppstoreOutlined, MailOutlined  } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate,useLoaderData } from 'react-router-dom';
import UserService from '../util/userService';
import { notification } from "antd";
const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

export async function loader(){
    try {
        const restData = await UserService.getAllSubjects();
        const subjects = await restData.data;
        console.log('subjects=',subjects);
        let guoaili=subjects.filter(xg=>xg.allsub !== null);
        console.log('guoaili length:',guoaili.length);

        let items=[];
        items=guoaili.map((xxg)=>{
            return {
                key: xxg.name,
                icon: <AppstoreOutlined />,
                label: xxg.chname,
                children:JSON.parse(xxg.allsub),           
            }
        });
        console.log("items=",items);
        return items;

    }catch(ex){
        openNotificationWithIcon("error","主科目取得异常,请联系管理员",ex);
        return null;
    }
}

export default function Nav () {
    const items=useLoaderData();

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
    // console.log('items main=',items);
    const levelKeys = getLevelKeys(items);
    const navigate = useNavigate();
    const [stateOpenKeys, setStateOpenKeys] = useState([]);
    const [beforeSubject, setBeforeSubject] = useState(true);
   
  
  const handleGuoailiBeigan =({key }) => {
    //   const zpd=key.split('_');
    //   localStorage.setItem("subkey1",zpd[0]);
    //   localStorage.setItem("subkey2",zpd[1]);
      setBeforeSubject(false);
      navigate('/nav/demo');
      // navigate('/nav/branch1');
  };

  const handelSubjectManamementButton = () => {
    setBeforeSubject(false);
    navigate('/nav/manage');
  }
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
          {/* <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} /> */}
          <Button 
            style={{ width:'80%', height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px',color:'yellow',fontSize:'18px' }}
            type='text' onClick={handelSubjectManamementButton}
             >学科管理</Button>
          <Menu theme='dark'
            mode="inline"
            // defaultSelectedKeys={['231']}
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
          <Header style={{ 
                background: '#008000', 
                textAlign: 'center', 
                padding: 0,
                color:'white', 
                fontSize:'26px'
            }}
          >
            我曾经看过山和大海，也穿过人山人海
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {beforeSubject && <div>日夜脑未停留,心力用尽学丘</div>}
              {/* <main style={{fontSize:'5em'}}> */}
                <Outlet />
                
              {/* </main> */}
            </div>
            {/* <RootLayout /> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>蚂蚁设计赋能©2024 Created by zackdson</Footer>
        </Layout>
      </Layout>
  )
};
// export default Nav;