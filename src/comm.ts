export function is_null(v:any){
    return v==null || v==undefined || v=="";
}

export function get_asset_trans_type_str(type: number) {
  if (type === 0) {
    return '创建资产';
  }
  if (type === 1) {
    return '充值后，从系统账号放币';
  }
  if (type === 2) {
    return '调账 给系统账号增加资金';
  }
  if (type === 3) {
    return '冻结';
  }
  if (type === 4) {
    return '还原冻结';
  }
  if (type === 5) {
    return '冻结扣除';
  }
  if (type === 6) {
    return '转账';
  }
  return "未知";
}
