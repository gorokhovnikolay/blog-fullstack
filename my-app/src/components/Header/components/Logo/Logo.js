import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../../components';

const LogoTextBig = styled.div`
	font-size: 33px;
	font-weight: 700;
`;
const LogoTextSmall = styled.div``;

export const LogoContainer = ({ className }) => {
	return (
		<Link to="/">
			<div className={className}>
				<Icon id={'fa-code fa-4x'} />
				<div>
					<LogoTextBig>Blog</LogoTextBig>
					<LogoTextSmall>Web-Разработчика</LogoTextSmall>
				</div>
			</div>
		</Link>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
`;
