// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {
  AdjustAssetListVO,
  AppUserListVO,
  AssetListVO,
  DepositOrderListVO,
  LoginParamsVO,
  LoginResultVO, TransferListVO, TransferVO
} from "@/services/typings";


/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: LoginParamsVO, options?: { [key: string]: any }) {
  body.tenant_id=1;
  return request<LoginResultVO>('/api/admin/login', {
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
  return request<AppUserListVO>('/api/admin/app_user/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
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
  let search_user_id=params['user_id']?params['user_id']:0;

  return request<AssetListVO>('/api/admin/asset/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
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

  return request<DepositOrderListVO>('/api/admin/deposit/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
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
    id:string
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<DepositOrderListVO>('/api/admin/deposit/received_audit', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,
      'order_id':params.id,
      'remark':'审核已到账'
    },
    ...(options || { }),
  });
}

/** 放币*/
export async function depositPuttingCoin(
  params: {
    id:string
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<DepositOrderListVO>('/api/admin/deposit/putting_coin', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,
      'order_id':params.id,
      'remark':'放币',
      from_user_id:94,
    },
    ...(options || { }),
  });
}


/** 获取列表*/
export async function getWithdrawList(
  params: {
  },
  options?: { [key: string]: any },
) {

  return request<DepositOrderListVO>('/api/admin/withdraw/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,
      ...params,
    },
    ...(options || { }),
  });
}

/** 提款审核*/
export async function withdrawAudit(
  params: {
    id:string,
    is_pass:boolean
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<DepositOrderListVO>('/api/admin/withdraw/audit', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,

      'order_id':params.id,
      'opt_user_id':0,
      'is_pass':params.is_pass,

      'remark':'审核'
    },
    ...(options || { }),
  });
}




/** 提款已付款*/
export async function withdrawAlreadPay(
  params: {
    id:string,
    bank_sn:string
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<DepositOrderListVO>('/api/admin/withdraw/already_pay', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,

      'order_id':params.id,
      'bank_sn':"123",

      'remark':'已付款'
    },
    ...(options || { }),
  });
}

/** list*/
export async function getAdjustAssetList(
  params: {
  },
  options?: { [key: string]: any },
) {

  return request<AdjustAssetListVO>('/api/admin/asset/adjust/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,
      ...params,
    },
    ...(options || { }),
  });
}


/** 审核*/
export async function adjustAssetAudit(
  params: {
    id:string,
    is_pass:boolean
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  let status=2;
  if (params.is_pass){
    status=1;
  }

  return request<AdjustAssetListVO>('/api/admin/asset/adjust/audit', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,

      'adjust_asset_id':params.id,
      'opt_user_id':0,
      'status':status,

      'remark':'审核'
    },
    ...(options || { }),
  });
}


/** 执行调账*/
export async function adjustAssetExecuted(
  params: {
    id:string,
    system_user_id:string
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<AdjustAssetListVO>('/api/admin/asset/adjust/executed', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,

      'adjust_asset_id':params.id,
      'opt_user_id':0,
      'system_user_id':params.system_user_id,

      'remark':'执行调账'
    },
    ...(options || { }),
  });
}


/** 执行调账*/
export async function adjustAssetApply(
  params: {
    to_user_id:string,
    asset_trans_type:number,
    coin_type:number,
    amount:number,
  },
  options?: { [key: string]: any },
) {

  console.log(params)

  return request<AdjustAssetListVO>('/api/admin/asset/adjust/apply', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,

      'to_user_id':params.to_user_id,
      'asset_trans_type':params.asset_trans_type,
      'coin_type':params.coin_type,
      'amount':params.amount,

      'remark':' 调账'
    },
    ...(options || { }),
  });
}



/** list*/
export async function getTransferVOList(
  params: {
  },
  options?: { [key: string]: any },
) {

  return request<TransferListVO>('/api/admin/transfer/list', {
    method: 'POST',
    data: {
      'token':localStorage.getItem("adminToken"),
      'tenant_id':0,
      'user_id':0,
      ...params,
    },
    ...(options || { }),
  });
}
