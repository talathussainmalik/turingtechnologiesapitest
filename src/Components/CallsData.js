import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import helper from './helper';
import Switch from "react-switch";
import Pagination from "react-js-pagination";
import CallDetailModal from './CallDetailModal';
import AddNotes from './AddNotes';
import './callsData.css';

const CallsData = () => {
  const history = useNavigate();
  const [data, setdata] = useState([]);
  const [pages, setpages] = useState({ currentpage: 1, totalpages: 1, countPerPage: 10, offset: 0 });
  const [modalData, setmodalData] = useState({ show: false, data: '' })
  const [addModalData, setaddModalData] = useState({ show: false, data: '', index: '' })

  useEffect(() => {
    if (localStorage.getItem('logincallsdata') === 'null') {
      history("/");
    }
    else {
      getCallData(1);
    }

    setInterval(() => {
      refreshToken()
    }, 540000);
  }, [])

  const getCallData = (e) => {
    axios.get(`https://frontend-test-api.aircall.io/calls?offset=${(e - 1) * 10}&limit=${pages.countPerPage}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("logincallsdata")}`
      },
    }
    ).then(async (res) => {
      if (res.status == 200) {
        sortAscending(res.data.nodes)
        setpages({ currentpage: e, totalpages: res.data.totalCount, countPerPage: 10, offset: (e - 1) * 10 })
        helper.toastNotification('Data Receive.', "SUCCESS_MESSAGE");
      }
      else {
        helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
      }
    })
      .catch((error) => {
        helper.toastNotification('Login Again.', "FAILED_MESSAGE");
        localStorage.setItem('logincallsdata', 'null')
        history('/')
        console.log(error, 'error')
      });
  }

  const refreshToken = () => {
    axios.post(`https://frontend-test-api.aircall.io/auth/refresh-token`,
      { username: localStorage.getItem('usernamecallsdata'), password: localStorage.getItem('passCallsdata') },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("logincallsdata")}`
        },
      }
    ).then(async (res) => {
      if (res.status == 201) {
        localStorage.setItem('logincallsdata', res.data.access_token)
        helper.toastNotification('Token Updated Successfully.', "SUCCESS_MESSAGE");
      }
      else {
        helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
      }
    })
      .catch((error) => {
        helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
        history('/')
        console.log(error, 'error')
      });
  }

  const CloseModal = () => {
    setmodalData({ show: false, data: '' });
  }

  const CloseAddModal = () => {
    setaddModalData({ show: false, data: '', index: '' })
  }

  const updateNotes = (Indexdata) => {
    let array = [...data]
    array[addModalData.index] = Indexdata
    setdata(array)
  }

  const sortAscending = (data) => {
    setdata(data.sort(
      (a, b) =>
        (a.created_at) > (b.created_at) ? -1 : 1))
  }

  const archived = (e, index, item) => {
    let array = [...data]
    array[index].is_archived = e
    setdata(array)

    axios.put(`https://frontend-test-api.aircall.io/calls/${item.id}/archive`, { item }, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("logincallsdata")}`
      },
    }
    ).then(async (res) => {
      if (res.status == 200) {
        helper.toastNotification('Updated Successfully.', "SUCCESS_MESSAGE");
      }
      else {
        let array = [...data]
        array[index].is_archived = !array[index].is_archived
        setdata(array)
        helper.toastNotification('Call Doesnot Exist.', "FAILED_MESSAGE");
      }
    })
      .catch((error) => {
        let array = [...data]
        array[index].is_archived = !array[index].is_archived
        setdata(array)
        helper.toastNotification('Call Doesnot Exist.', "FAILED_MESSAGE");
        console.log(error, 'error')
      });
  }

  return (
    <div>
      <h4 className='heading'>Calls Record</h4>
      <table className="table">
        <thead className='tableHead'>
          <tr>
            <th>#</th>
            <th>Call Type</th>
            <th>Number</th>
            <th>Direction</th>
            <th>Date/Time</th>
            <th>Archived</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length &&
            data.map((item, index) => (
              <tr key={index} className={(index + 1) % 2 == 0 ? 'tableRow' : ''}>
                <td>{index + 1}</td>
                <td>{item.call_type}</td>
                <td>{item.from}</td>
                <td>{item.direction}</td>
                <td>
                  {helper.humanReadableDate(item.created_at)}
                </td>
                <td>
                  <Switch width={30} height={17} checked={item.is_archived} onChange={e => archived(e, index, item)} />
                </td>
                <td>
                  <i className="fas fa-eye icon" onClick={e => setmodalData({ show: true, data: item })}></i>
                  <i className="fas fa-plus icon" onClick={e => setaddModalData({ show: true, data: item, index: index })}></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='CallPaginator'><Pagination
        prevPageText="<"
        nextPageText=">"
        activePage={pages.currentpage}
        itemsCountPerPage={pages.countPerPage}
        totalItemsCount={pages.totalpages}
        pageRangeDisplayed={2}
        onChange={e => getCallData(e)}
        itemClassFirst={`itemClassFirst`}
        itemClassPrev={`itemClassPrev`}
        itemClassLast={`itemClassLast`}
        disabledClass={`disabledClass`}
        linkClass={`linkClass`}
      /></div>
      <CallDetailModal show={modalData.show} onHide={CloseModal} modalData={modalData.data} />
      <AddNotes show={addModalData.show} onHide={CloseAddModal} data={addModalData.data} update={updateNotes} />
    </div>
  );
}

export default CallsData;