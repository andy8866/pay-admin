// @ts-ignore
/* eslint-disable */


export type CurrentUser = {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: { key?: string; label?: string }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province?: { label?: string; key?: string };
    city?: { label?: string; key?: string };
  };
  address?: string;
  phone?: string;
};

export type LoginResultVO = {
  status: number;
  msg: string;
  data: any;
};

export type PageParamsVO = {
  current?: number;
  pageSize?: number;
};

export type AppUserVO = {
  id?: string;
  tenant_id?: string;
  updated_at?: string;
  created_at?: string;
  phone?: string;
};

export type AppUserListVO = {
  status?: number;
  msg?: string;
  data?: AppUserVO[];
};

export type AssetVO = {
  id?: string;
  tenant_id?: string;
  updated_at?: string;
  created_at?: string;
  user_id?: string;
  coin_type?: number;
  amount?: string;
  freeze?: string;
  address?: string;
};

export type AssetListVO = {
  status?: number;
  msg?: string;
  data?: AssetVO[];
};

export type DepositOrderVO = {
  id?: string;
  tenant_id?: string;
  updated_at?: string;
  created_at?: string;
  order_no?: string;
  status?: number;
  user_id?: string;
  coin_type?: number;
  coin_amount?: number;
  legal_amount?: number;
  coin_to_legal_rate?: number;
  real_name?: string;
  card_no?: string;
  depositary_bank?: string;
  bank_sn?: string;
  user_pay_time?: string;
  audit_time?: string;
  putting_time?: string;
};

export type DepositOrderListVO = {
  status?: number;
  msg?: string;
  data?: DepositOrderVO[];
};

export type FakeCaptcha = {
  code?: number;
  status?: string;
};

export type LoginParamsVO = {
  tenant_id?: number;
  name?: string;
  password?: string;
};

export type ErrorResponse = {
  /** 业务约定的错误码 */
  errorCode: string;
  /** 业务上的错误信息 */
  errorMessage?: string;
  /** 业务上的请求是否成功 */
  success?: boolean;
};

export type NoticeIconList = {
  data?: NoticeIconItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

export type NoticeIconItemType = 'notification' | 'message' | 'event';

export type NoticeIconItem = {
  id?: string;
  extra?: string;
  key?: string;
  read?: boolean;
  avatar?: string;
  title?: string;
  status?: string;
  datetime?: string;
  description?: string;
  type?: NoticeIconItemType;
};

