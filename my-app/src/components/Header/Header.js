import { styled } from 'styled-components';
import { Logo, HeadDescription, ControlPanel } from './components';

export const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<HeadDescription />
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	position: fixed;
	width: 1000px;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding-right: 40px;
	padding-left: 40px;
	box-shadow: 0px 1px 4px 0px #405060;
	background: #fff;
`;
