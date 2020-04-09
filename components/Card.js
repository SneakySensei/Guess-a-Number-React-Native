import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
	if (!props.styled)
		return <View style={{...styles.card, ...props.style, borderBottomRightRadius: 20, borderTopLeftRadius: 20}}>{props.children}</View>;

		return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		shadowOpacity: 0.26,
		backgroundColor: 'white',
		elevation: 5,
		paddingVertical: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20
	}
});

export default Card;