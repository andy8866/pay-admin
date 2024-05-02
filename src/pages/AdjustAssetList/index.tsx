import {adjustAssetAudit, adjustAssetExecuted, getAdjustAssetList} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {coin_precision, get_coin_str} from "@/coin";
import {Modal} from "antd";
import {AdjustAssetVO, PageParamsVO} from "@/services/typings";
import {get_asset_trans_type_str} from "@/comm";


export function get_status_str(status: number) {
  if (status === 0) {
    return '待审核';
  }
  if (status === 1) {
    return '审核通过';
  }
  if (status === 2) {
    return '审核未通过';
  }
  if (status === 3) {
    return '已执行调账';
  }
  return "未知";
}


const AdjustAssetList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState({} as AdjustAssetVO);
  const [isPass, setIsPass] = useState(false);

  function audit(record:AdjustAssetVO,isPass:boolean=false) {
    setSelectRecord(record);
    setIsPass(isPass);

    setOpen(true);
  };

  const columns: ProColumns<AdjustAssetVO>[] = [
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
      valueType: "digit",
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderText: (text: any) => {
        return get_status_str(text);
      }
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
    },
    {
      title: '账变类型',
      dataIndex: 'asset_trans_type',
      renderText: (text: any) => {
        return get_asset_trans_type_str(text);
      }
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
    },
    {
      title: '操作人',
      dataIndex: 'opt_user_id',
    },
    {
      title: '调账执行时间',
      dataIndex: 'execute_time',
    },
    {
      title: '账变来源系统用户',
      dataIndex: 'from_user_id',
    },
    {
      title: '',
      valueType: 'option',
      render: (_, record) => [
        <a type="primary" key="primary" onClick={()=>audit(record,true)} style={{visibility:record.status===0?"visible":"hidden"}}>审核通过</a>,
        <a type="primary" key="primary" onClick={()=>audit(record,false)} style={{visibility:record.status===0?"visible":"hidden"}}>审核拒绝</a>,
        record.status===1 && <a type="primary" key="primary" onClick={()=>audit(record)}>执行调账</a>
      ]
    },
  ];

  const handleOk = () => {
    if (selectRecord.status===0){
      // @ts-ignore
      adjustAssetAudit({id:selectRecord.id,is_pass:isPass})
    }

    if (selectRecord.status===1){
      // @ts-ignore
      adjustAssetExecuted({id:selectRecord.id,system_user_id:0})
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
        <ProTable<AdjustAssetVO, PageParamsVO>
          headerTitle='调账列表'
          actionRef={actionRef}
          rowKey="id"
          request={getAdjustAssetList}
          columns={columns}
        />
      </PageContainer>
      <Modal title="确认" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>确认要通过吗？</p>
      </Modal>
    </div>


  );
};

export default AdjustAssetList;
