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


export type WithdrawOrderListVO = {
  status?: number;
  msg?: string;
  data?: WithdrawOrderVO[];
};


export type WithdrawOrderVO = {
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
  audit_time?: string;
  pay_time?: string;
  bank_sn?: string;
  take_freeze_time?: string;
};



export type AdjustAssetListVO = {
  status?: number;
  msg?: string;
  data?: AdjustAssetVO[];
};


export type AdjustAssetVO = {
  id?: string;
  tenant_id?: string;
  updated_at?: string;
  created_at?: string;
  user_id?: string;
  status?: number;
  coin_type?: number;
  amount?: number;
  asset_trans_type?: number;
  audit_time?: string;
  opt_user_id?: string;
  execute_time?: string;
  from_user_id?: string;
};

export type TransferListVO = {
  status?: number;
  msg?: string;
  data?: TransferVO[];
};


export type TransferVO = {
  id?: string;
  tenant_id?: string;
  updated_at?: string;
  created_at?: string;
  from_user_id?: string;
  from_address?: string;
  to_user_id?: number;
  to_address?: string;
  coin_type?: number;
  amount?: number;
};

export type LoginParamsVO = {
  tenant_id?: number;
  name?: string;
  password?: string;
};
