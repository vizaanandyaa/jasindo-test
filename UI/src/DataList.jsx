import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, Modal, Form, Input, InputNumber } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
const DataList = () => {
  const [datas, setDatas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    const result = await axios.get("http://localhost:4000/items");
    setDatas(result.data);
  };
 
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/delete/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditData(item);
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleAdd = async (values) => {
    await axios.post("http://localhost:4000/create", values);
    fetchItems();
    setModalVisible(false);
  };

  const handleUpdate = async (values) => {
    await axios.put(`http://localhost:4000/update/${editData.id}`, values);
    fetchItems();
    setModalVisible(false);
  };

  const showConfirm = (data) => {
    confirm({
      title: "Do you want to delete these data?",
      icon: <ExclamationCircleFilled />,
      content:`${data.name} data will be remove`,
      onOk() {
        handleDelete(data.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const openAdd = () => {
    setEditData(null);
    form.resetFields();
    setModalVisible(true);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => showConfirm(record)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{maxWidth:'30%',margin:'50px auto'}}>
      <Button type="primary" onClick={openAdd}>
        Add Item
      </Button>

      <Table columns={columns} dataSource={datas} />
      <Modal
        title={editData ? "Edit Item" : "Add Item"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={editData ? handleUpdate : handleAdd}>
          {console.log(editData === "")}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal></Modal>
    </div>
  );
};
export default DataList;
