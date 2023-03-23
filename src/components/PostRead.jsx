import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import CommentsPage from './CommentsPage';
import LoadingPage from './LoadingPage';

const PostRead = ({match}) => {
    const id=match.params.id;
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);

    const getPost = async() => {
        setLoading(true);
        const res=await axios.get(`/posts/${id}`);
        setPost(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getPost();
    },[]);

    if(loading) return <LoadingPage/>
    return (
        <div>
            <h1>게시글정보</h1>
            <Row className='justify-content-center mx-2 my-3'>
                <Col md={10}>
                    <Card>
                        <Card.Title className='p-4'>
                            <p>[{post.id}] {post.title}</p>
                            <p>작성일: {post.fdate}</p>
                            <p>작성자: {post.writer}</p>
                            <hr/>
                        </Card.Title>
                        <Card.Body>
                            <p>{post.body}</p>
                        </Card.Body>
                    </Card>
                    <hr/>
                    <CommentsPage postid={post.id}/>
                </Col>
            </Row>
        </div>
    )
}

export default PostRead