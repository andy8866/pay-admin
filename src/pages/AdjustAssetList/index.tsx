import {adjustAssetApply, adjustAssetAudit, adjustAssetExecuted, getAdjustAssetList, login} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {COIN_B, COIN_B_STR, coin_precision, get_coin_str} from "@/coin";
import {Button, Checkbox, Form, Input, InputNumber, message, Modal, Select} from "antd";
import {AdjustAssetVO, PageParamsVO} from "@/services/typings";
import {get_asset_trans_type_str} from "@/comm";
import {FormProps} from "antd/lib";


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

type FieldType = {
  to_user_id?: number;
  asset_trans_type?: number;
  coin_type?: number;
  amount?: number;
};


const AdjustAssetList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState({} as AdjustAssetVO);
  const [isPass, setIsPass] = useState(false);

  const [applyOpen, setApplyOpen] = useState(false);
  const [assetTransType, setAssetTransType] = useState(2);
  const [coinType, setCoinType] = useState(COIN_B);

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


  function showApply() {
    setApplyOpen(true);
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    values.to_user_id=Number(values.to_user_id);
    values.asset_trans_type=assetTransType;
    values.coin_type=coinType;

    const r = await adjustAssetApply(values);
    if (r.status === 0) {
      message.success("已发起调账");
      setApplyOpen(false)
      
      setTimeout(()=>{
        // @ts-ignore
        actionRef.current.reload();
      },1000)
    }else{
      message.success(r.msg);
    }
  };

  const handleChange = (value: number) => {
    setAssetTransType(value);
  };

  const coinHandleChange = (value: number) => {
    setCoinType(value);
  };

  return (
    <div>
      <PageContainer>
        <Button type="primary" onClick={()=>showApply()}>发起调账</Button>
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
      <Modal title="发起调账" open={applyOpen} footer="" onCancel={() => setApplyOpen(false)}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="要调账用户ID"
            name="to_user_id"
          >
            <Input/>
          </Form.Item>

          <Form.Item<FieldType>
            label="账变类型"
            name="asset_trans_type"
          >
            <Select
              defaultValue={2}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 2, label: '给系统账号增加资金' },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="币种类型"
            name="coin_type"
          >
            <Select
              defaultValue={2}
              style={{ width: 120 }}
              onChange={coinHandleChange}
              options={[
                { value: COIN_B, label: COIN_B_STR },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="账变金额"
            name="amount"
          >
            <InputNumber defaultValue={0} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>


  );
};

export default AdjustAssetList;
