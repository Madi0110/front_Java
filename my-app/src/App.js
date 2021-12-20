import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, Input, Button, Space } from "antd";
import { Row, Col } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, InputNumber, Popconfirm, Modal } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const apiUser = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiBooks = axios.create({
  baseURL: `http://localhost:8762`,
});
const apiCourse = axios.create({
  baseURL: `http://localhost:8762`,
});





class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      courses: [],
      fullCourses: [],
      visible: false,
      books: [],
      currentUser:[],
      bookModalIsVisible: false,
    };
    this.updateComponent();
  }

  updateComponent = () => {
    apiUser.get("/user-app/users/getAllUsers").then((res) => {
      this.setState({ users: res.data });
      console.log(this.state.users);
    });
    apiCourse.get("/course-app/course/getCourses").then((res) => {
      this.setState({ fullCourses: res.data });
      console.log(this.state.fullCourses);
    });
  }
  handleSubmitUser = (e) => {
    axios
      .post("http://localhost:8762/user-app/users/createUser", e)
      .then((res) => this.updateComponent())
      .catch((err) => console.log(err));
  };

  getByUsername = (e) => {

    apiUser.get(`/user-app/users/getUserCourses?username=${e}`).then((res) => {
      this.setState({ courses: res.data });
      apiUser.get(`/user-app/users/getUserByUsername?username=${e}`).then((res) => {
        this.setState({ currentUser:res.data});
      });
    });
  };


  setBooks = (e) => {
    apiBooks.get(`/books-app/books/getCourseBooks?courseId=${e.id}`).then((res) => {
      console.log(res.data);
      this.setState({ books: res.data });

      // console.log(this.state.locations)
    });
    this.showModal();
  }


  setUserCourse = (e) => {
    axios
      .post("http://localhost:8762/user-app/users/createUserCourse", e)
      .then((res) => this.updateComponent())
      .catch((err) => console.log(err));
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  deleteUser = (e) => {
    apiUser.delete(`/user-app/users/deleteUser?id=${e}`).then((res) => {
      this.updateComponent();
      // console.log(this.state.locations)
    });
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleDelete = (e) => {
    console.log(e);
  }

  setBookModal = () => {

  }

  deleteCourseFromUser = (e) => {
    apiUser.delete(`/user-app/users/deleteCourseFromUser?courseId=${e}&userId=${this.state.currentUser.id}`).then((res) => {
    });
  }

  render() {
    const { history, schedule } = this.state;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const columnUsers = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Username",
        dataIndex: "username",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.users.length >= 1 ? (
            <div>

              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUser(record.id)}>
                <a>Delete</a>
              </Popconfirm>
            </div>

          ) : null,
      },
    ];
    const columnBooks = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: 'CourseId',
        dataIndex: 'courseId',
      },
    ];
    const columnsCoursesFull = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Rating",
        dataIndex: "rating",
      },
    ];
    const columnsCourses = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Rating",
        dataIndex: "rating",
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.courses.length >= 1 ? (
            <div>
              <Popconfirm title="Sure to show?" onConfirm={() => this.setBooks(record)}>
                <a>Show</a>
              </Popconfirm>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteCourseFromUser(record.id)}>
                <a>Delete</a>
              </Popconfirm>
            </div>

          ) : null,
      },
    ];

    const textStyle = {
      textAlignVertical: "center",
      textAlign: "center",
    };

    return (
      <div className="App">

        <Row>

          <Col>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => { }, // click row
                  onDoubleClick: (event) => { }, // double click row
                  onContextMenu: (event) => { }, // right button click row
                  onMouseEnter: (event) => { }, // mouse enter row
                  onMouseLeave: (event) => { }, // mouse leave row
                };
              }}
              style={{ marginLeft: 10 }}
              columns={columnUsers}
              dataSource={this.state.users}
              bordered
              title={() => "Users"}
            />
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Search
              // style = {{ width : 150, height : 150, marginLeft : 370 }}
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => this.getByUsername(value)}
            />
            <Table
              columns={columnsCourses}
              dataSource={this.state.courses}
              bordered
              title={() => "Courses"}
            />
          </Col>
          <Col>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => { }, // click row
                  onDoubleClick: (event) => { }, // double click row
                  onContextMenu: (event) => { }, // right button click row
                  onMouseEnter: (event) => { }, // mouse enter row
                  onMouseLeave: (event) => { }, // mouse leave row
                };
              }}
              style={{ marginLeft: 10 }}
              columns={columnsCoursesFull}
              dataSource={this.state.fullCourses}
              bordered
              title={() => "All Courses"}
            />
          </Col>
        </Row>
        <hr></hr>



        <Row>
          <Col>
            <h2>Add User</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.handleSubmitUser}
            >

              <Form.Item label="Username" name={"username"}>
                <Input />
              </Form.Item>
              <Form.Item label="Name" name={"name"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <h2>Add UserCourse</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.setUserCourse}
            >

              <Form.Item label="Course Id" name={"courseId"}>
                <Input />
              </Form.Item>
              <Form.Item label="User ID" name={"userId"}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>

        </Row>
        <Modal

          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
          <Table
            columns={columnBooks}
            dataSource={this.state.books}
            bordered
            title={() => "Books"}
          />

        </Modal>
      </div>
    );
  }
}

export default App;