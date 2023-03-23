import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import LoadingPage from './LoadingPage';
import {Card, Row, Col, Button, Form} from 'react-bootstrap'
import CommentInsert from './CommentInsert';
import { AlertContext } from './AlertContext';
import CommentUpdate from './CommentUpdate';

const CommentsPage = ({postid}) => {
    const {setBox} = useContext(AlertContext);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);

    const getComments = async() => {
        setLoading(true);
        const res = await axios.get(`/comments/${postid}`);
        //console.log(res.data);
        setComments(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getComments();
    },[]);

    const onClickDelete = (id) => {
        setBox({
            show:true,
            message: `${id}번 댓글을 삭제하실래요?`,
            action: async()=> {
                setLoading(true);
                await axios.post('/comments/delete', {id: id});
                setLoading(false);
                getComments();
            }
        })
    }

    const onClickUpdate = (com) => {
        setShow(true);
        setComment(com);
    }

    if(loading) return <LoadingPage/>
    return (
        <div>
            {sessionStorage.getItem('uid') && 
                    <CommentInsert postid={postid} getComments={getComments}/>
            }
            <h1>댓글목록</h1>
            {comments.length === 0 && <p>댓글이 존재하지않습니다.</p>}
            {comments.map(com=>
                <Card className='my-2' key={com.id}>
                    <Card.Body>
                        <Row>
                            <Col md={2}>
                                <img src={com.photo} width="50px"/>
                            </Col>
                            <Col>
                                <p> {com.id}-
                                    {com.uname}({com.writer}) {com.fdate}
                                </p>
                                <p>{com.body}</p>
                            </Col>
                        </Row>
                        <hr/>
                        {sessionStorage.getItem('uid') === com.writer &&
                            <div className='text-end'>
                                <Button className='me-2' 
                                    onClick={()=>onClickUpdate(com)}>수정</Button>
                                <Button variant='danger' 
                                    onClick={()=>onClickDelete(com.id)}>삭제</Button>
                            </div>
                        }
                    </Card.Body>
                </Card>
            )}
            {show && <CommentUpdate getComments={getComments}
                    show={show} setShow={setShow} com={comment}/>}
        </div>
    )
}

export default CommentsPage