import { Route, Routes } from 'react-router-dom';
import { Header, Footer, CheckContent } from './components';
import { Autorization, Register, Users, Post, Main } from './pages';
import { styled } from 'styled-components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions';
import { Modal } from './components/Modal/Modal';

const Content = styled.div`
	text-align: center;
	padding: 120px 40px;
`;
const App = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: auto;
	min-height: 100%;
	max-width: 1000px;
	margin: 0 auto;
	background: #fff;
`;

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('hash'));
		if (user) {
			dispatch(setUser(user));
		}
	}, [dispatch]);

	useLayoutEffect(() => {
		fetch('/post')
			.then((res) => res.json())
			.then(console.log);
	});

	return (
		<App>
			<Header />
			<Content>
				<Routes>
					<Route path="/login" element={<Autorization />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Main />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:postId" element={<Post />} />
					<Route path="/post/:postId/edit" element={<Post />} />
					<Route path="*" element={<CheckContent />} />
				</Routes>
			</Content>
			<Footer />
			<Modal />
		</App>
	);
};
