import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { AlertContext } from './AlertContext';
import LoadingPage from './LoadingPage';

const LoginPage = ({history}) => {
    const {setBox} = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        uid:'user01',
        upass:'pass'
    });
    const {uid,upass} = form;

    const onChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };
    
    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const res=await axios.post('/users/login',form);
        setLoading(false);
        if(res.data.result === 0) {
            setBox({show:true, message:'아이디가 존재하지않습니다!'});
        }else if(res.data.result === 2) {
            setBox({show:true, message:'비밀번호가 일치하지않습니다!'});
        }else {
            sessionStorage.setItem('uid', uid);
            history.push('/');
        }
    };

    if(loading) return <LoadingPage/>
    return (
        <div>
            <h1>로그인</h1>
            <Row className='justify-content-center m-5'>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control className='my-2'
                                    placeholder='아이디'
                                    value={uid} name="uid"
                                    onChange={onChange}
                                />
                                <Form.Control className='my-2'
                                    type='password'
                                    placeholder='비밀번호'
                                    value={upass} name="upass"
                                    onChange={onChange}
                                />
                                <Button style={{width:'100%'}}
                                    type='submit'
                                >로그인</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage