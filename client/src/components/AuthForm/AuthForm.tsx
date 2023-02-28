import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

export const AuthForm = () => {
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();

	const loginChange = (event: any) => {
		setLogin(event.target.value);
	}

	const passwordChange = (event: any) => {
		setPassword(event.target.value);
	}

	const registrationClick = async () => {
		console.log(login);
		console.log(password);

		const response = await fetch('/user/create', {
			method: 'POST',
			body: JSON.stringify({ "username": login, "email": "em@mail.ru", "birthday": 12, "password": password })
		});

		console.log(response.body);

		if (response.status !== 200) {
			throw new Error(`Request failed: ${response.status}`);
		}
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