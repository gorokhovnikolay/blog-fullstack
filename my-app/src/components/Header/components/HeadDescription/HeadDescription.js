import React from 'react';
import styled from 'styled-components';

const HeadDescriptionContainer = ({ className }) => {
	return (
		<div className={className}>
			Веб технологии <br /> Написание кода <br />
			Поиск ошибок
		</div>
	);
};

export const HeadDescription = styled(HeadDescriptionContainer)`
	font-style: italic;
`;
