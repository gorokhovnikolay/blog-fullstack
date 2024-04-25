import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	display: flex;
	justify-content: space-between;
	height: 120px;
	align-items: center;
	background: white;
	box-shadow: 0px -4px 6px #b3b3b3;
	padding: 0 40px;
`;

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	const [curentFullYear, setCurentFullYear] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Smolensk&units=metric&lang=ru&appid=5fa9431bdf21f77a2b0a3eb0dc9ac0a8',
		)
			.then((data) => data.json())
			.then(({ main, name, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp) + '℃');
				setWeather(weather[0].description);
				setCurentFullYear(
					new Date().toLocaleString('ru', { day: 'numeric', month: 'long' }),
				);
			});
	}, []);
	return (
		<FooterContainer>
			<div>
				<div>Блог Веб-разработчика</div>
				<div>веб@разраточик.ru</div>
			</div>
			<div>
				<div>
					{city} {curentFullYear}{' '}
				</div>
				<div>
					{temperature} {weather}
				</div>
			</div>
		</FooterContainer>
	);
};
