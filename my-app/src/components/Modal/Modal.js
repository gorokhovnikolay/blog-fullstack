import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const text = useSelector(({ app }) => app.modal.text);
	const isOpen = useSelector(({ app }) => app.modal.isOpen);
	const onComfirm = useSelector(({ app }) => app.modal.onComfirm);
	const onCancel = useSelector(({ app }) => app.modal.onCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<button onClick={onComfirm}>Да</button>
					<button onClick={onCancel}>Отмена</button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	& .overlay {
		position: absolute;
		background: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}
	& .box {
		width: 400px;
		background-color: white;
		position: relative;
		z-index: 30;
		margin: 0 auto;
		top: 50%;
		transform: translate(0, -50%);
		padding: 0 20px 20px;
	}
`;
