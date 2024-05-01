import {getAssetList} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {coin_precision, get_coin_str} from "@/coin";
import {AssetVO, PageParamsVO} from "@/services/typings";

const AssetList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<AssetVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '租户ID',
      dataIndex: 'tenant_id',
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      valueType:"digit",
    },
    {
      title: '币种',
      dataIndex: 'coin_type',
      renderText:(text: any) => {
        return get_coin_str(text);
      }
    },
    {
      title: '可用金额',
      dataIndex: 'amount',
      renderText:(text: any,record: any) => {
        return coin_precision(record.coin_type,text);
      }
    },
    {
      title: '冻结金额',
      dataIndex: 'freeze',
      renderText:(text: any,record: any) => {
        return coin_precision(record.coin_type,text);
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ];

  return (
    <PageContainer>
      <ProTable<AssetVO, PageParamsVO>
        headerTitle='用户资产列表'
        actionRef={actionRef}
        rowKey="id"
        request={getAssetList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default AssetList;
