import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from 'react';

export const AuthForm = () => {
	const apiUrl = 'http://localhost:8080/';

	const [login, setLogin] = useState();
	const [password, setPassword] = useState();

	const loginChange = (event: any) => {
		setLogin(event.target.value);
	}

	const passwordChange = (event: any) => {
		setPassword(event.target.value);
	}

	const registrationClick = async () => {
		await axios
			.post(apiUrl + 'user/create', {
				"username": login,
				"email": "em@mail.ru",
				"birthday": null,
				"password": password
			})
			.then((response) => {
				console.log("body: ", response);
			});
	}

	const loginClick = () => {
		console.log(login);
		console.log(password);
	}

	return (
		<Stack gap={2} className='col-md-3 mx-auto' direction='vertical'>
			<Row>
				<Form.Control type='text' placeholder='Введите логин' size='lg' value={login} onChange={loginChange} />
			</Row>

			<Row>
				<Form.Control type='password' placeholder='Введите пароль' size='lg' value={password} onChange={passwordChange} />
			</Row>

			<Row>
				<Col>
					<Button size='lg' onClick={registrationClick}>Зарегистрироваться</Button>
				</Col>

				<Col>
					<Button size='lg' onClick={loginClick}>Войти</Button>
				</Col>
			</Row>
		</Stack>
	)
}