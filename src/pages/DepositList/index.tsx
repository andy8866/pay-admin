import {depositPuttingCoin, depositReceivedAudit, getDepositList} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {COIN_CNY, coin_precision, get_coin_str, rate_precision} from "@/coin";
import {Modal} from "antd";
import {DepositOrderVO, PageParamsVO} from "@/services/typings";


export function get_deposit_status_str(status: number) {
  if (status === 0) {
    return '发起订单';
  }
  if (status === 1) {
    return '用户完成充值';
  }
  if (status === 2) {
    return '审核已到账';
  }
  if (status === 3) {
    return '已放币';
  }
  return "未知";
}



const DepositList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState({} as DepositOrderVO);

  function audit(record:DepositOrderVO) {
    setSelectRecord(record);

    setOpen(true);
  };

  const columns: ProColumns<DepositOrderVO>[] = [
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
      title: '订单号',
      dataIndex: 'order_no',
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderText: (text: any) => {
        return get_deposit_status_str(text);
      }
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      valueType: "digit",
    },
    {
      title: '币种',
      dataIndex: 'coin_type',
      renderText: (text: any) => {
        return get_coin_str(text);
      }
    },
    {
      title: '充值币种金额',
      dataIndex: 'coin_amount',
      renderText: (text: any, record: any) => {
        return coin_precision(record.coin_type, text);
      }
    },
    {
      title: '需充值法币',
      dataIndex: 'legal_amount',
      renderText: (text: any) => {
        return coin_precision(COIN_CNY, text);
      }
    },
    {
      title: '币种对法币汇率',
      dataIndex: 'coin_to_legal_rate',
      renderText: (text: any) => {
        return rate_precision(text);
      }
    },
    {
      title: '充值银行流水号',
      dataIndex: 'bank_sn',
    },
    {
      title: '充值时间',
      dataIndex: 'user_pay_time',
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
    },
    {
      title: '已放币时间',
      dataIndex: 'putting_time',
    },
    {
      title: '',
      valueType: 'option',
      render: (_, record) => [
        record.status===1 && <a type="primary" key="primary" onClick={()=>audit(record)}>充值审核</a>,
        record.status===2 && <a type="primary" key="primary" onClick={()=>audit(record)}>放币</a>
      ]
    },
  ];

  const handleOk = () => {
    if (selectRecord.status===1){
      // @ts-ignore
      depositReceivedAudit({id:selectRecord.id})
    }

    if (selectRecord.status===2){
      // @ts-ignore
      depositPuttingCoin({id:selectRecord.id})
    }

    setTimeout(()=>{
      // @ts-ignore
      actionRef.current.reload();
    },1000)

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <div>
      <PageContainer>
        <ProTable<DepositOrderVO, PageParamsVO>
          headerTitle='充值列表'
          actionRef={actionRef}
          rowKey="id"
          request={getDepositList}
          columns={columns}
        />
      </PageContainer>
      <Modal title="确认" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>确认要通过吗？</p>
      </Modal>
    </div>


  );
};

export default DepositList;
