import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import http from 'utils/http';

function NodeTestPage() {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [currRecord, setCurrRecord] = useState(null);
  const [isShowModal, setModalVisible] = useState(false);
  const [updateList, setUpdateList] = useState(0);
  const [isTableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    http.get('/home/nodetest/getlist').then(res => {
      setUserList(res.data || []);
      console.log('node test success', res);
    }).finally(() => {
      setTableLoading(false);
    });
  }, [updateList]);

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      if (currRecord) {
        // 编辑
        values.id = currRecord.id;
        http.post('/home/edituser', values).then(() => {
          setModalVisible(false);
          setUpdateList((pre) => pre + 1);
        });
      } else {
        // 添加
        http.post('/home/adduser', values).then(() => {
          setModalVisible(false);
          setUpdateList((pre) => pre + 1);
        });
      }
    });
  };

  const handleAdd = () => {
    setModalVisible(true);
    setCurrRecord(null);
    form.setFieldsValue({name: undefined, age: undefined, sex: undefined});
  };

  const handleEdit = (record) => {
    setCurrRecord(record);
    setModalVisible(true);
    const { name, age, sex } = record || {};
    form.setFieldsValue({name, age, sex});
  }; 

  const handleDelete = (record) => {
    const {id} = record;
    Modal.confirm({
      icon: null,
      title: '提示',
      content: <div>确定要删除 <b style={{color: 'red'}}>{record.name}</b> ?</div>,
      onOk: () => {
        return http.post('/home/deluser', {id}).then(() => {
          setUpdateList((pre) => pre + 1);
        });
      },
    });
  };

  return (
    <>
      <Button onClick={handleAdd} type="primary">添加</Button>
      <Table
        columns={[
          {title: '姓名', dataIndex: 'name'},
          {title: '性别', dataIndex: 'sex'},
          {title: '年龄', dataIndex: 'age'},
          {title: '操作', dataIndex: 'op', render: (text, record) => <><a onClick={() => handleEdit(record)}>编辑</a><a onClick={() => handleDelete(record)} style={{marginLeft: 30, color: 'red'}}>删除</a></>}
        ]}
        dataSource={userList}
        loading={isTableLoading}
      />
      <Modal
        visible={isShowModal}
        maskClosable={false}
        title={currRecord ? '编辑' : '添加'}
        onCancel={() => setModalVisible(false)}
        onOk={handleConfirm}
      >
        <Form form={form}>
          <Form.Item name="name" label="姓名" rules={[{required: true, message: '请输入姓名'}]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{required: true, message: '请输入年龄'}]}>
            <InputNumber min={1} max={130} placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item name="sex" label="性别" rules={[{required: true, message: '请输入性别'}]}>
            <Select placeholder="请选择性别">
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
              <Select.Option value="保密">保密</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NodeTestPage;