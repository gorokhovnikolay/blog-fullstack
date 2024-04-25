import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useState } from 'react';
import { Input } from '../../components';
import { setUser } from '../../store/actions';
import { Link, Navigate } from 'react-router-dom';
import { useResetFormHook } from '../../hooks/resetFormHook';
import { useServerRequest } from '../../hooks/useServerRequest';
import { ROLE } from '../../constants/role';
import { request } from '../../utils/request';

const authShemaYup = yup.object().shape({
	login: yup
		.string()
		.required('Введите Логин')
		.matches(/^\w+$/, 'Логин должен содержать только буквы и цыфры')
		.min(3, 'Логин должен быть не более 3 символов')
		.max(20, 'Логин не должен быть более 20 символов'),
	password: yup
		.string()
		.required('Введите Пароль')
		.matches(/^[\w%#]+$/, 'Пароль должен содержать только буквы, цыфры, # и %')
		.min(6, 'Пароль должен быть не более 6 символов')
		.max(40, 'Пароль не должен быть более 40 символов'),
});
const FormContainer = styled.div`
	form {
		width: 260px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.errors {
		background: red;
		width: 100%;
		color: white;
		margin-top: 15px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
	}
`;

export const Autorization = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authShemaYup),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(({ user }) => user.roleId);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}
			dispatch(setUser(user));
		});
	};

	useResetFormHook(reset);
	const errorForm = errors?.login?.message || errors?.password?.message;
	const erorContainer = errorForm || serverError;
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<h2>Авторизация</h2>
			<FormContainer>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Логин..."
						{...register('login', {
							onChange: () => setServerError(null),
						})}
					/>

					<Input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>

					<div>
						<button disabled={!!errorForm}>Войти</button>
						<Link to="/register">Нет аккаунта?</Link>
					</div>
					{erorContainer && (
						<div className="errors">
							<div>{errors?.login?.message}</div>
							<div>{errors?.password?.message}</div>
							<div>{serverError}</div>
						</div>
					)}
				</form>
			</FormContainer>
		</div>
	);
};
