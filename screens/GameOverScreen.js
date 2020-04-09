import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
	const [window, setWindow] = useState(Dimensions.get("window"));
	
	useEffect(() => {
		const updateDimensions = () => {
			setWindow(Dimensions.get("window"));
		}
		Dimensions.addEventListener("change", updateDimensions);

		return () => {
			Dimensions.removeEventListener("change", updateDimensions);
		}
	})

	const styles = StyleSheet.create({
		screen: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		title: {
			fontSize: window.height > 600 ? 22 : 18
		},
		imageContainer: {
		 width: window.height * 0.40,
		 height: window.height * 0.40,
		 borderRadius: window.height * 0.20,
		 borderColor: 'black',
		 borderWidth: 4,
		 overflow: 'hidden',
		 marginVertical: window.height > 600 ? 10 : 0
		},
		image: {
			width: '100%',
			height: '100%'
		},
		bodyText: {
			marginVertical: 5 ,
			fontSize: window.height > 600 ? 22 : 18,
			marginHorizontal: 50,
			textAlign: 'center'
		},
		accentText: {
			color: colors.primary
		}
	 });

	return (
		<View style={styles.screen}>
			<TitleText style={styles.title}>The Game is Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image 
				// source={require('../assets/original.png')} 
				source={require('../assets/original.png')} 
				style={styles.image} />
			</View>
			<BodyText style={styles.bodyText}>Computer guessed your number was <TitleText style={styles.accentText}>{props.userNumber}</TitleText> in <TitleText style={styles.accentText}>{props.roundsNumber}</TitleText> tries!</BodyText>
			<MainButton title="New Game" onPress={props.onNewGame} color={colors.primary} />
		</View>
	);
};



export default GameOverScreen;