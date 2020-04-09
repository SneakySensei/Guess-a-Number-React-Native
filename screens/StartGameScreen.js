import React, { useState, useEffect  } from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Dimensions, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';

import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {

	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

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

	

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber>99) {
			Alert.alert("Invalid number!", "Number has to be between 1-99", [{text: "Okay", style:"destructive", onPress:resetInputHandler}]);
			return;
		}

		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	}

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card styled={false} style={{...styles.summaryContainer, width: window.width*0.55}}>
				<BodyText>You Selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<View style={{width: window.width * 0.6}}></View><MainButton title="START GAME!" color={Colors.primary} onPress={() => props.onStartGame(selectedNumber)} />
			</Card>
		);
	}

	return (
		<ScrollView>
		<KeyboardAvoidingView behavior="padding">
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game!</TitleText>
				<Card styled={true} style={{...styles.inputContainer, width: window.width*0.75}}>
					<BodyText>Select a Number</BodyText>
					<Input
						style={styles.input}
						keyboardType='number-pad' 
						maxLength={2}
						onChangeText = {numberInputHandler}
						value={enteredValue}
						autoFocus={true}/>

					<View style={styles.buttonContainer}>
						<View style={{width: window.width * 0.30}}><MainButton color={Colors.secondary} title="RESET" onPress={resetInputHandler}/></View>
						<View style={{width: window.width * 0.30}}><MainButton color={Colors.primary} title="CONFIRM" onPress={confirmInputHandler}/></View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
			
		</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContainer:{
		maxWidth: '80%',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		width: '100%',
		justifyContent: 'space-evenly'
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	}
});

export default StartGameScreen;