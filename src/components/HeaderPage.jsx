import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { AlertContext } from './AlertContext';

const HeaderPage = ({history}) => {
    const {setBox} = useContext(AlertContext);

    const onClickHome = (e) => {
        e.preventDefault();
        history.push('/');
    }

    const onLogout = (e) => {
        e.preventDefault();
        setBox({
            show:true,
            message: '로그아웃을 하시겠습니까?',
            action: ()=>{
                sessionStorage.removeItem('uid');
                history.push('/');
            }
        });
    }

    return (
        <Navbar bg="dark" expand="lg" className='header'>
        <Container fluid>
          <Navbar.Brand href="/" onClick={onClickHome}>LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Link to="/posts">게시글</Link>
                {sessionStorage.getItem('uid') ? 
                    <Link to="/logout" onClick={onLogout}>로그아웃</Link>:
                    <Link to="/login">로그인</Link>
                }
            </Nav>
            {sessionStorage.getItem('uid') && 
                <Link to="mypage">{sessionStorage.getItem('uid')}</Link>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default withRouter(HeaderPage)