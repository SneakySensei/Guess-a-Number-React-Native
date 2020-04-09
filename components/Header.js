import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import BodyText from './BodyText';
import TitleText from './TitleText';

import Colors from '../constants/colors';

const Header = props => {
	return (
			<View style={styles.header}>
				<BodyText style={styles.headerTitle}>{props.title}</BodyText>
			</View>
		);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: {
		color: 'black',
		fontSize: 18
	}
});

export default Header;