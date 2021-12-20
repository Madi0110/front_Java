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

}

export default App;