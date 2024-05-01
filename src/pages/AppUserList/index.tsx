import {getAppUserList} from '@/services/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import React, {useRef} from 'react';
import {AppUserVO, PageParamsVO} from "@/services/typings";

const AppUserList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<AppUserVO>[] = [
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
      title: '电话',
      dataIndex: 'phone',
    },
  ];

  return (
    <PageContainer>
      <ProTable<AppUserVO, PageParamsVO>
        headerTitle='App用户列表'
        actionRef={actionRef}
        rowKey="key"
        request={getAppUserList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default AppUserList;
