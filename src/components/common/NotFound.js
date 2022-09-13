import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const NotFound = (props) => (
	<div>
		{props.children}
	</div>
);

NotFound.propTypes = {
	jumbotronProps: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string
	})
};

NotFound.defaultProps = {
	jumbotronProps: {
		title: '404 not found'
	},
	children: (<Link to="/">Not Found Page, Back to home</Link>)
};

export default memo(NotFound);
