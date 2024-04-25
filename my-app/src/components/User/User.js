import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { useState } from 'react';
import { request } from '../../utils/request';

const UserContainer = ({
	roles,
	className,
	id,
	login,
	registredAt,
	roleId,
	deleteUser,
}) => {
	const [initialRole, setInitialrole] = useState(roleId);
	const [newRoleId, setNewRoleId] = useState(roleId);

	const setNewRole = () => {
		request(`/user/${id}`, 'PATCH', { roleId: newRoleId }).then(({ error }) => {
			if (error) {
				return;
			}
			setInitialrole(newRoleId);
		});
	};

	const isDesebledRoleId = newRoleId === initialRole;

	return (
		<div className={className}>
			<div className="table-row__user">
				<div className="table-row__login">{login}</div>
				<div className="table-row__registred">{registredAt}</div>
				<div className="table-row__role">
					<select
						value={newRoleId}
						onChange={({ target }) => setNewRoleId(Number(target.value))}
					>
						{roles.map(({ id, name }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
					</select>
					<div onClick={setNewRole}>
						<Icon
							id={'fa-floppy-o'}
							margin="0 0 0 10px"
							disabled={isDesebledRoleId}
							size="16px"
						/>
					</div>
				</div>
			</div>
			<div onClick={() => deleteUser(id)}>
				<Icon
					className="table-row__delete"
					id={'fa-trash-o'}
					margin="0 0 0 10px"
					size="16px"
				/>
			</div>
		</div>
	);
};

export const User = styled(UserContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& .table-row__user {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding-top: 3px;
		padding-bottom: 3px;
		border: 1px solid gray;
		border-radius: 8px;
		margin: 2px 0 2px 0;
	}
	& .table-row__login,
	.table-row__registred,
	.table-row__role {
		width: 33%;
		text-align: start;
		padding-left: 5px;
	}
	& .table-row__role {
		display: flex;
	}
`;

User.propTypes = {
	roles: PropTypes.array,
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registredAt: PropTypes.string.isRequired,
	roleId: PropTypes.number.isRequired,
	deleteUser: PropTypes.func.isRequired,
};
