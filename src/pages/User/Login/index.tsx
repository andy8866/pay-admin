import {Footer} from '@/components';
import {login} from '@/services/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {FormattedMessage, Helmet, history} from '@umijs/max';
import {Alert, message} from 'antd';
import React, {useState} from 'react';
import {createStyles} from 'antd-style';
import {LoginParamsVO, LoginResultVO} from "@/services/typings";

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<LoginResultVO>({} as LoginResultVO);
  const {styles} = useStyles();

  const handleSubmit = async (values:LoginParamsVO) => {
    try {
      // 登录
      const r = await login(values);
      setUserLoginState(r);
      if (r.status === 0) {
        message.success("登录成功");

        localStorage.setItem("token", r.data);

        history.push('/');
        return;
      }
      console.log(r);
    } catch (error) {
      console.log(error);
      message.error("登录失败，请重试！");
    }
  };
  const {status, msg} = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          登录页
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="后台"
          subTitle={""}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit(values as LoginParamsVO);
          }}
        >
          {status > 0 && <LoginMessage content={msg}/>}
          <>
            <ProFormText
              name="name"
              initialValue={'admin'}
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined/>,
              }}
              placeholder='用户名: admin'
              rules={[
                {
                  required: true,
                  message: ('请输入用户名!'),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              initialValue={'123456'}
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined/>,
              }}
              placeholder='密码: 123456'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
