import {getWithdrawList, withdrawAlreadPay, withdrawAudit} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {COIN_CNY, coin_precision, get_coin_str, rate_precision} from "@/coin";
import {Modal} from "antd";
import {DepositOrderVO, PageParamsVO, WithdrawOrderVO} from "@/services/typings";


export function get_status_str(status: number) {
  if (status === 0) {
    return '发起订单';
  }
  if (status === 1) {
    return '审核通过';
  }
  if (status === 2) {
    return '审核未通过';
  }
  if (status === 3) {
    return '已付款';
  }
  return "未知";
}



const WithdrawList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState({} as WithdrawOrderVO);
  const [isPass, setIsPass] = useState(false);

  function audit(record:WithdrawOrderVO,isPass:boolean=false) {
    setSelectRecord(record);
    setIsPass(isPass);

    setOpen(true);
  };

  const columns: ProColumns<WithdrawOrderVO>[] = [
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
        return get_status_str(text);
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
      title: '提款币种金额',
      dataIndex: 'coin_amount',
      renderText: (text: any, record: any) => {
        return coin_precision(record.coin_type, text);
      }
    },
    {
      title: '提款法币',
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
      title: '收款人姓名',
      dataIndex: 'real_name',
    },
    {
      title: '收款人卡号',
      dataIndex: 'card_no',
    },
    {
      title: '收款人银行',
      dataIndex: 'depositary_bank',
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
    },
    {
      title: '付款时间',
      dataIndex: 'pay_time',
    },
    {
      title: '充值银行流水号',
      dataIndex: 'bank_sn',
    },
    {
      title: '扣除冻结金额时间',
      dataIndex: 'take_freeze_time',
    },
    {
      title: '',
      valueType: 'option',
      render: (_, record) => [
        <a type="primary" key="primary" onClick={()=>audit(record,true)} style={{visibility:record.status===0?"visible":"hidden"}}>审核通过</a>,
        <a type="primary" key="primary" onClick={()=>audit(record,false)} style={{visibility:record.status===0?"visible":"hidden"}}>审核拒绝</a>,
        record.status===1 && <a type="primary" key="primary" onClick={()=>audit(record)}>已付款</a>
      ]
    },
  ];

  const handleOk = () => {
    if (selectRecord.status===0){
      // @ts-ignore
      withdrawAudit({id:selectRecord.id,is_pass:isPass})
    }

    if (selectRecord.status===1){
      // @ts-ignore
      withdrawAlreadPay({id:selectRecord.id,bank_sn:''})
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
          headerTitle='提款列表'
          actionRef={actionRef}
          rowKey="id"
          request={getWithdrawList}
          columns={columns}
        />
      </PageContainer>
      <Modal title="确认" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>确认要通过吗？</p>
      </Modal>
    </div>


  );
};

export default WithdrawList;
