// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
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

  type LoginResult = {
    status: number;
    msg: string;
    data: any;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type AppUser = {
    id?: string;
    tenant_id?: string;
    updated_at?: string;
    created_at?: string;
    phone?: string;
  };

  type AppUserList = {
    status?: number;
    msg?: string;
    data?: AppUser[];
  };

  type Asset = {
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

  type AssetList = {
    status?: number;
    msg?: string;
    data?: AppUser[];
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    tenant_id?:number;
    name?: string;
    password?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
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
}
