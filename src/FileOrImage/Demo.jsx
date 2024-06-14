
import { Form, Button, Upload ,Input,notification,Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserService from '../util/userService';
import { useState } from 'react';

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};

const DemoLayout = () => {
  const [img,setImg]=useState();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      if (!values.Upload){
        openNotificationWithIcon("error","没有指定上传文件(最少一个)")
      }
      if (!values.zpd){
        openNotificationWithIcon("error","没写文字描述")
      }

      const { upload } = values;
      const formData = new FormData();
      upload.forEach((item, index) => {
        formData.append('file', item.originFileObj);    	
        })
      async function sendfile(data){
        try {
          const resData=await UserService.saveNotebookToDatabaseWithPhoto(data);
          openNotificationWithIcon("success","上传资料成功",resData.data);

        }catch(ex){
          openNotificationWithIcon("error","上传图片资料失败",ex);
        }
      }
      sendfile(formData);

    };

    const wangwanqing = ({file,fileList}) =>{
      // console.log("before upload hook,filelist array is:",fileList)
      console.log("before upload hook,file status is:",file.status)
      return false;
    }

    const handleImgGetClick = () => {
      async function getImgfile() {
        try {
          const resData=await UserService.getNotebookImageFromDatabase();
          console.log('resData:',resData);
          console.log('photo before tranform:',resData.data[0].photo);
          const imgData=getBase64Img(resData.data[0].photo);
          console.log('imgData:',imgData)
          setImg(imgData);
          openNotificationWithIcon("success","获取图片成功");

          }catch(ex){
          openNotificationWithIcon("error","获取图片资料失败",ex);
          }
        }
      getImgfile();
    
    }
 // 二进制流图片转化为base64位图片展示
 const getBase64Img = (res) => {
  const bufferUrl = btoa(
      new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''),
  );
  const base64Url = `data:image/png;base64,${bufferUrl}`;
  return base64Url;
};


    return (
      <>

      <Form
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
          'zpd':'zpddyz',
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
      >
        <Form.Item label='随便写点什么' name='zpd' >
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo"
            beforeUpload={wangwanqing}
            onChange={wangwanqing}
            // action="/upload.do" 
            listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' danger >submit</Button>
        </Form.Item>
      </Form>
      <hr />
      <Image width={400} src={img} />
      <Button onClick={handleImgGetClick} >后端求取图片</Button>
      </>

    );
}

export default DemoLayout;