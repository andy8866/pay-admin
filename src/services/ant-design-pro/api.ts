// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


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

  let search_user_id=params['user_id']?params['user_id']:0;

  return request<API.AssetList>('/api/admin/asset/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("token"),
      'tenant_id':0,
      'user_id':0,
      'search_user_id':search_user_id
    },
    ...(options || { }),
  });
}



/** 获取充值列表*/
export async function getDepositList(
  params: {
  },
  options?: { [key: string]: any },
) {

  console.log(params)
  // @ts-ignore
  params['search_user_id']=params['user_id']

  return request<API.DepositOrderList>('/api/admin/deposit/list', {
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

/** 充值审核*/
export async function depositReceivedAudit(
  params: {
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<API.DepositOrderList>('/api/admin/deposit/received_audit', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("token"),
      'tenant_id':0,
      'user_id':0,
      'order_id':params['id'],
      'remark':'审核已到账'
    },
    ...(options || { }),
  });
}

/** 放币*/
export async function depositPuttingCoin(
  params: {
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<API.DepositOrderList>('/api/admin/deposit/putting_coin', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("token"),
      'tenant_id':0,
      'user_id':0,
      'order_id':params['id'],
      'remark':'放币',
      from_user_id:94,
    },
    ...(options || { }),
  });
}
