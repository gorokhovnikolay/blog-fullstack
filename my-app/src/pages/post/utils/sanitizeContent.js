export const sanitizeContent = (content) =>
	content
		.replaceAll('<div><br></div>', '\n\n')
		.replaceAll('&nbsp;', ' ')
		.replaceAll('<div>', '')
		.replaceAll('</div>', '');
