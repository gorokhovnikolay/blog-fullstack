import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../Icon/Icon';
import { logOutUser } from '../../../../store/actions';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';

const UserBlock = styled.div`
	margin-bottom: 12px;
	text-align: end;
`;
const IconBlock = styled.div`
	display: flex;
	justify-content: space-around;
`;
const ButtonBack = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const isAdmin = checkAccess([ROLE.ADMIN], user.roleId);

	return (
		<div className={className}>
			{user.login ? (
				<UserBlock>
					<div onClick={() => dispatch(logOutUser(user))}>
						Выход {user.login}
					</div>
				</UserBlock>
			) : (
				<Link to="/login">
					<UserBlock>
						<div>
							Вход{' '}
							<i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
						</div>
					</UserBlock>
				</Link>
			)}

			<IconBlock>
				<ButtonBack onClick={() => navigate(-1)}>
					<Icon id={'fa-backward'} margin="0 0 0 10px" />
				</ButtonBack>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id={'fa-file-text-o'} margin="0 0 0 10px" />
						</Link>
						<Link to="/users">
							<Icon id={'fa-users'} margin="0 0 0 10px" />
						</Link>
					</>
				)}
			</IconBlock>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
`;
