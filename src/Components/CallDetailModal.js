import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import helper from './helper';
import './callsData.css';

export default function CallDetailModal(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} centered size="lg" >
            <Modal.Header closeButton className='modalEndsColor'>
                <Modal.Title className="text-center">Call Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyColor'>
                {
                    helper.isObject(props.modalData) ?
                        <div>
                            <Row>
                                <Col>
                                    <label><b>Call type:</b></label>
                                    <label>{props.modalData.call_type}</label>
                                </Col>
                                <Col>
                                    <label><b>created_at:</b></label>
                                    <label>{helper.humanReadableDate(props.modalData.created_at)}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label><b>Direction:</b></label>
                                    <label>{props.modalData.direction}</label>
                                </Col>
                                <Col>
                                    <label><b>Duration:</b></label>
                                    <label>{props.modalData.duration}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label><b>From:</b></label>
                                    <label>{props.modalData.from}</label>
                                </Col>
                                <Col>
                                    <label><b>To:</b></label>
                                    <label>{props.modalData.to}</label>
                                </Col>
                            </Row>
                            {
                                helper.isObject(props.modalData) && helper.isArray(props.modalData.notes) && props.modalData.notes.length ?
                                    <>
                                        <label><b>Notes:</b></label>
                                        {
                                            props.modalData.notes.map((item, index) => (
                                                <div key={index}>
                                                    <label><b>{index + 1}:</b></label>
                                                    <label>{item.content}</label>
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    ""
                            }
                        </div>
                        :
                        ''
                }
            </Modal.Body>
            <Modal.Footer className='modalEndsColor'>
            </Modal.Footer>
        </Modal>
    )
}