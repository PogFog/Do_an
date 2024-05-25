import { Divider, Dropdown, Radio, Space, Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { DownOutlined } from '@ant-design/icons';
const TableComponent = (props) =>{
    const {selectionType = 'checkbox',data=[],isLoading= false, columns=[],handleDeleteMany} = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`,);
          setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
      }
    return (
        <div>
        <Loading isLoading={isLoading}>
        {!!rowSelectedKeys.length && (
        <div style={{
          background: '#1d1ddd',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          {...props}
        />
        </Loading>
      </div>
    )
}
export default TableComponent