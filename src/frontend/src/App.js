import './App.css';
import {useEffect, useState} from 'react';
import {deleteStudent, getAllStudents} from './Client';
import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Menu, Popconfirm, Radio, Spin, Table, Tag} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (name.trim().length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }

    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted", `Student with ${studentId} was deleted`);
        callback();
    }).catch(err => {
        console.log("CATCH BLOCK")
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
    })
}

const columns = fetchStudents => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    }
];

function App() {
    //state for managing state in app
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    //when component load we fetch (true)
    const [fetching, setFetching] = useState(true);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

//this only invoke once, useEffect()
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }

        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return <>

            <StudentDrawerForm
                setShowDrawer={setShowDrawer}
                showDrawer={showDrawer}
                fetchStudents={fetchStudents}
            />

            <Table dataSource={students}
                   columns={columns(fetchStudents)}
                   bordered
                   title={() =>
                       <>
                           <Button onClick={() => setShowDrawer(!showDrawer)}
                                   type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                               Add New Student
                           </Button>
                           <Tag style={{marginLeft: "10px"}}>Number of students</Tag>
                           <Badge count={students.length} className="site-badge-count-4"/>
                       </>

                   }
                   pagination={{pageSize: 50}}
                   scroll={{y: 240}}
                   rowKey={(student) => student.id}
            />
        </>
    }


    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Created By Dimas Adriyanto Setyawan V.0.1 ©2022</Footer>
        </Layout>
    </Layout>


    /* return students.map((student,index) =>{
       return <p key={index} >{student.id} {student.name}</p>;
     });*/
}

export default App;
