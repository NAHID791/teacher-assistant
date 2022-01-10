import { usePage } from '@inertiajs/inertia-react';
import { kaReducer, Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import "ka-table/style.scss";
import EyeIcn from '../../Icons/EyeIcn';
import EyeOffIcn from '../../Icons/EyeOffIcn';
import Approved from '../../Icons/Approved';
import Decline from '../../Icons/Decline';
import axios from 'axios';
import { toFormData } from '../../utils';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import ModalCommon from '../../Shared/ModalCommon';

const PendingUsers = () => {

    const { pendingUsers } = usePage().props;
    const [actionMdl, setActionMdl] = useState({})
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')
    useEffect(() => {
        console.log("i")
    }, [])
    const dataArray = pendingUsers
    const tablePropsInit = {
        columns: [
            { key: 'name', title: 'Name', dataType: DataType.String, style: { width: '20%' } },
            { key: 'email', title: 'Email', dataType: DataType.String, style: { width: '20%' } },
            { key: 'role', title: 'Role', dataType: DataType.String, style: { width: '20%' } },
            { key: 'department', title: 'Department', dataType: DataType.String, style: { width: '20%' } },
            { key: ':action', title: 'Action', width: '20%', style: { textAlign: 'center' } }
        ],
        data: dataArray,
        rowKeyField: 'id',
        searchText: '',
    };


    console.log("pendingUsers", pendingUsers)

    const [tableProps, changeTableProps] = useState(tablePropsInit);
    const dispatch = (action) => {
        changeTableProps((prevState) => kaReducer(prevState, action));
    };

    const handleAction = (rowKeyValue, status) => {
        const data = {
        }
        if (status === 'approved') {
            const formData = toFormData(data, 'PUT');
            Inertia.post(route('accept_user', rowKeyValue), formData, {
                onFinish: () => {
                    toast.success("Approved Successfully")
                }
            });
        } else {
            const formData = toFormData(data, 'PUT');
            Inertia.post(route('decline_user', rowKeyValue), formData), {
                onFinish: () => {
                    toast.success("Decline Successfully")
                }
            }
        }
    }
    const handleView = (key) => {

    }

    const closeAction = () => {
        // handleSelectInput(actionMdl.show, actionMdl.value)
        setActionMdl({ show: false })
    }

    const showModal = (name, rowKeyValue) => {
        console.log("id", rowKeyValue)
        setUserId(rowKeyValue)
        const userInfo = pendingUsers.filter(({ id }) => {
            return id === rowKeyValue
        })
        console.log(`userInfo`, userInfo[0])
        setActionMdl({ show: name, value: userInfo[0] })
    }

    const DeleteRow = ({ dispatch, rowKeyValue }) => {
        return (
            <div className='flex justify-center gap-2'>
                <span
                    className='cursor-pointer'
                    onClick={() => handleAction(rowKeyValue, "approved")}
                >
                    <Approved />
                </span>
                <span
                    className='cursor-pointer'
                    onClick={() => handleAction(rowKeyValue, "decline")}
                >
                    <Decline />
                </span>
                <span
                    className='cursor-pointer'
                    // onClick={() => handleView(rowKeyValue)}
                    onClick={() => showModal('view_user', rowKeyValue)}
                >
                    <EyeIcn
                        width="20"
                        height="20"
                        strokeColor="#000000"
                    />
                </span>
            </div>
            // <img
            //     src="https://komarovalexander.github.io/ka-table/static/icons/delete.svg"
            //     className="delete-row-column-button"
            //     onClick={() => dispatch(deleteRow(rowKeyValue))}
            //     alt=""
            // />
        );
    };

    return (
        <div className="main-div">
            <div className='font-inter-600 text-3xl mb-4 flex gap-4'>
                <span>Pending User</span>
            </div>
            <div className="main-card">
                <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
                    dispatch(search(event.currentTarget.value));
                }} className='top-element' />
                <Table
                    {...tableProps}
                    childComponents={{
                        noDataRow: {
                            content: () => 'No Data Found'
                        },
                        cellText: {
                            content: props => {
                                switch (props.column.key) {
                                    case ':action':
                                        return <DeleteRow {...props} />;
                                }
                            }
                        }
                    }}
                    dispatch={dispatch}
                />
            </div>


            <ModalCommon
                show={actionMdl.show === 'view_user'}
                size="lg"
                title="View User"
                closeAction={() => closeAction()}
            // btnTitle="Save"
            // btnAction={() => handleSubmitBtn('view_user')}
            >
                <div className="flex mt-2 mb-2 gap-2">
                    <div className='modal-left '>
                        <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Name: </span>
                            <span className='user-value'>{actionMdl?.value?.name || '------'}</span>
                        </div>
                        <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Email: </span>
                            <span className='user-value'>{actionMdl?.value?.email || '------'}</span>
                        </div>
                        <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Role: </span>
                            <span className='user-value'>{actionMdl?.value?.role || '------'} </span>
                        </div>
                        <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Department: </span>
                            <span className='user-value'>{actionMdl?.value?.department || '------'} </span>
                        </div>
                        <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Phone: </span>
                            <span className='user-value'>{actionMdl?.value?.phone || '------'}</span>
                        </div>
                        {actionMdl?.value?.role === 'teacher' && <div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Teacher ID: </span>
                            <span className='user-value'>{actionMdl?.value?.teacherId || '------'}</span>
                        </div>}
                        {actionMdl?.value?.role === 'student' && <><div className='flex mb-3'>
                            <span className='font-inter-500 user-label'>Student ID: </span>
                            <span className='user-value'>{actionMdl?.value?.studentId || '------'}</span>
                        </div><div className='flex mb-3'>
                                <span className='font-inter-500 user-label'>Batch: </span>
                                <span className='user-value'>{actionMdl?.value?.batch || '------'}</span>
                            </div></>}

                    </div>
                    <div className='modal-right'>
                        <div>
                            <span className=''>
                                <img className='image-box' src={`/${actionMdl?.value?.photo_path}`}></img>
                                {/* <img src='https://image.shutterstock.com/image-vector/student-id-card-university-school-260nw-1420220018.jpg'></img> */}
                            </span>
                        </div>

                    </div>

                </div>
            </ModalCommon>

        </div>
    )
}
PendingUsers.layout = (page) => <Layout>{page}</Layout>
export default PendingUsers
