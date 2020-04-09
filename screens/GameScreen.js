import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';

import { Ionicons } from '@expo/vector-icons';

import MainButton from '../components/MainButton';
import colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randNum = Math.floor(Math.random() * (max-min)) + min;
	if (randNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randNum;
	}
}

const GameScreen = props => {

	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);

	const {userChoice, onGameOver} = props;

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

	useEffect(() => {
		if (currentGuess === props.userChoice) {
			props.onGameOver(pastGuesses.length)
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (direction !== Math.sign(props.userChoice - currentGuess)) {
			Alert.alert("Don't Lie!", "Smartphones aren't that smart. Do you realise that I had to sit at 2AM and write this check for people like you? You're a horrible person! 😠", [
				{ text: 'Sorry ☹', style: 'cancel' }
			]);
			return;
		}

		if (direction === -1) {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess+1;
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);

		setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses])
	}
	
	if(Dimensions.get('window').height<500){
		return (
			<View style={stylesLanscape.screen}>
				<TitleText>Opponent's Guess</TitleText>
				
				<View style={stylesLanscape.landscape}>
					<View style={{...stylesLanscape.controls, width: window.width * 0.5}}>
						<NumberContainer>{currentGuess}</NumberContainer>
						<Card style={stylesLanscape.buttonContainer}>
							<View style={{width: window.width * 0.15}}><MainButton title={<Ionicons name="md-remove" size={24} />} color={colors.secondary} onPress={nextGuessHandler.bind(this, -1)} /></View>
							<View style={{width: window.width * 0.15}}><MainButton title={<Ionicons name="md-add" size={24} />} color={colors.primary} onPress={nextGuessHandler.bind(this, 1)} /></View>
						</Card>
					</View>

					<View style={stylesLanscape.list}>
						<ScrollView >
							{pastGuesses.map( (guess, index) => (
								<View key={guess} style={stylesLanscape.listItem}>
									<Text>Round: {pastGuesses.length-index}</Text>
									<TitleText>{guess}</TitleText>
								</View>
							))}
						</ScrollView>
					</View>

				</View>

			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<View style={{width: window.width * 0.30}}><MainButton title={<Ionicons name="md-remove" size={24} />} color={colors.secondary} onPress={nextGuessHandler.bind(this, -1)} /></View>
				<View style={{width: window.width * 0.30}}><MainButton title={<Ionicons name="md-add" size={24} />} color={colors.primary} onPress={nextGuessHandler.bind(this, 1)} /></View>
			</Card>
			<View style={styles.list}>
				<ScrollView >
					{pastGuesses.map( (guess, index) => (
						<View key={guess} style={styles.listItem}>
							<Text>Round: {pastGuesses.length-index}</Text>
							<TitleText>{guess}</TitleText>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);




};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%'
	},
	list:{
		marginTop: 10,
		width: '60%',
		flex: 1
	},
	listItem: {
		flexDirection: 'row',
		height: 50,
		borderColor: colors.secondary,
		borderWidth: 2,
		borderRadius: 10,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: 10
	}
});

const stylesLanscape = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	landscape: {
		flexDirection: 'row',
		flex: 1
	},
	controls:{
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		alignSelf: 'stretch'
	},
	list:{
		marginTop: 10,
		flex: 1
	},
	listItem: {
		flexDirection: 'row',
		height: 50,
		borderColor: colors.secondary,
		borderWidth: 2,
		borderRadius: 10,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: 10
	}
});

export default GameScreen;