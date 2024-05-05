import {getTransferVOList} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {coin_precision, get_coin_str} from "@/coin";
import {PageParamsVO, TransferVO} from "@/services/typings";


//转账记录
const TransferList: React.FC = () => {
  const actionRef = useRef<ActionType>();


  const columns: ProColumns<TransferVO>[] = [
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
      title: '来源用户',
      dataIndex: 'from_user_id',
      valueType: "digit",
    },
    {
      title: '来源用户地址',
      dataIndex: 'from_address',
    },
    {
      title: '目标用户',
      dataIndex: 'to_user_id',
      valueType: "digit",
    },
    {
      title: '目标用户地址',
      dataIndex: 'to_address',
    },
    {
      title: '币种',
      dataIndex: 'coin_type',
      renderText: (text: any) => {
        return get_coin_str(text);
      }
    },
    {
      title: '币种金额',
      dataIndex: 'amount',
      renderText: (text: any, record: any) => {
        return coin_precision(record.coin_type, text);
      }
    }
  ];


  return (
    <div>
      <PageContainer>
        <ProTable<TransferVO, PageParamsVO>
          headerTitle='转账列表'
          actionRef={actionRef}
          rowKey="id"
          request={getTransferVOList}
          columns={columns}
        />
      </PageContainer>
    </div>
  );
};

export default TransferList;
