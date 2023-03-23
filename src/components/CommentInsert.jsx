import axios from 'axios';
import React, { useState } from 'react'
import {Card, Form, Button} from 'react-bootstrap'
import LoadingPage from './LoadingPage';

const CommentInsert = ({postid, getComments}) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        writer: sessionStorage.getItem('uid'),
        body:'',
        postid: postid
    });
    const onChange = (e) => {
        setForm({
            ...form,
            body: e.target.value
        })
    }

    const onSubmit= async(e) =>{
        e.preventDefault();
        //console.log(form);
        setLoading(true);
        await axios.post('/comments/insert', form);
        setForm({
            ...form,
            body:''
        });
        setLoading(false);
        getComments();
    }

    if(loading) return <LoadingPage/>
    return (
        <Card>
            <Card.Body>
                <Form className='text-end' onSubmit={onSubmit}>
                    <Form.Control 
                        value={form.body} onChange={onChange}
                        placeholder='내용을 입력하세요.'/>
                    <Button
                        type="submit" 
                        className='my-2'>등록</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CommentInsert