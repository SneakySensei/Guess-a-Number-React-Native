import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import BodyText from './BodyText';
import colors from '../constants/colors';

const MainButton = props => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableNativeFeedback onPress={props.onPress}>
				<View style={{...styles.button, backgroundColor: props.color}}>
					<BodyText style={styles.text}>{props.title}</BodyText>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 30,
		overflow: 'hidden'
	},
	button:{
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text:{
		color: 'white',
		textAlign: 'center'
	}
});

export default MainButton;