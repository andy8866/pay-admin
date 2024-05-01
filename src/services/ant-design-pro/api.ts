// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  body.tenant_id=1;
  return request<API.LoginResult>('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取App用户列表*/
export async function getAppUserList(
  params: {
  },
  options?: { [key: string]: any },
) {
  return request<API.AppUserList>('/api/admin/app_user/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("token"),
      'tenant_id':0,
      'user_id':0,
      ...params,
    },
    ...(options || { }),
  });
}



/** 获取资产列表*/
export async function getAssetList(
  params: {
  },
  options?: { [key: string]: any },
) {

  console.log(params)
  // @ts-ignore
  params['search_user_id']=params['user_id']

  return request<API.AppUserList>('/api/admin/asset/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("token"),
      'tenant_id':0,
      'user_id':0,
      'search_user_id':0,
      ...params,
    },
    ...(options || { }),
  });
}
