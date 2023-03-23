import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap'
import axios from 'axios';

const CommentUpdate = ({show, setShow, com, getComments}) => {
    const [form, setForm] = useState(com);
    const onChange=(e)=>{
        setForm({
            ...form,
            body: e.target.value
        })
    }
    const onUpdate = async() => {
        await axios.post('/comments/update', form);
        getComments();
        handleClose();
    }

    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>댓글수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control value={form.body} onChange={onChange}
                            as="textarea" rows={5}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CommentUpdate