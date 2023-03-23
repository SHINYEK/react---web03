import axios from 'axios';
import React, { useState, useEffect } from 'react'
import LoadingPage from './LoadingPage'
import { Row, Table, Col } from 'react-bootstrap'
import './Paging.css'
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const PostsPage = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getPosts = async () => {
        setLoading(true)
        const res = await axios.get(`/posts?page=${page}`);
        setPosts(res.data.rows);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [page]);

    if (loading) return <LoadingPage />
    return (
        <div>
            <h1>게시글</h1>
            <Row className='justify-content-center mx-2'>
                <Col md={10}>
                    <div className='text-end my-2'>
                        <span>게시글수: {total}개</span>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>ID.</td>
                                <td>제목</td>
                                <td>작성일</td>
                                <td>작성자</td>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post =>
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        <div className='ellipsis'>
                                            <Link to={`/posts/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='ellipsis'>{post.fdate}</div>
                                    </td>
                                    <td>{post.writer}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        prevPageText={"◀"}
                        nextPageText={"▶"}
                        onChange={(e)=>setPage(e)} />
                </Col>
            </Row>
        </div>
    )
}

export default PostsPage