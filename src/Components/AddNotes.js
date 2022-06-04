import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import helper from './helper';
import './callsData.css';

export default function AddNotes(props) {
    const [note, setnote] = useState('')
    const [noteList,setnoteList] = useState([])

    useEffect(() => {
     if (helper.isObject(props.data) && helper.isArray(props.data.notes) && props.data.notes.length){
         setnoteList(props.data.notes)
     }
    }, [])
    

    const submit = () => {
        if (helper.isEmptyString(note)) {
            helper.toastNotification('Input is required.', 'FAILED_MESSAGE')
        }
        else {
            axios.post(`https://frontend-test-api.aircall.io/calls/${props.data.id}/note`,
                { 
                    content:note
                },
                {
                    headers: {
                        Authorization: `bearer ${localStorage.getItem("logincallsdata")}`
                    },
                }
            ).then(async (res) => {
                console.log(res,'res')
                if (res.status == 201) {
                    setnoteList(res.data.notes)
                    props.update(res.data)
                    helper.toastNotification('Notes added Successfully.', "SUCCESS_MESSAGE");
                }
                else {
                    helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
                }
            })
                .catch((error) => {
                    helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
                    console.log(error, 'error')
                });
        }
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered size="lg" >
            <Modal.Header closeButton className='modalEndsColor'>
                <Modal.Title className="text-center">Add Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyColor'>
                <div>
                    {
                        noteList.length ?
                            <>
                                <label><b>Notes:</b></label>
                                {
                                    noteList.map((item, index) => (
                                        <div key={index}>
                                            <label><b>{index + 1}:</b></label>
                                            <label>{item.content}</label>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <div className='tableRow'><label>No Notes Exist For this call</label></div>
                    }
                    <div className='addNotes'>
                        <label style={{ marginRight: '5px' }}><b>Add Notes:</b></label>
                        <input type='text' placeholder='Add Notes here...' onChange={e => setnote(e.target.value)} required />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <input type='submit' onClick={e => submit()} />
            </Modal.Footer>
        </Modal>
    )
}