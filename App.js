import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


const loadFonts = () => {
  return Font.loadAsync({
    'cairo': require('./assets/fonts/Cairo-Regular.ttf'),
    'cairo-bold': require('./assets/fonts/Cairo-Bold.ttf')
  })
};


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (
      <AppLoading
      startAsync={loadFonts}
      onFinish={() => {setDataLoaded(true)}}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRound => {
    setGuessRounds(numOfRound);
  }

  const startNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>
  if (userNumber && guessRounds<=0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onNewGame={startNewGame} />
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.screen}>
      <Header title="Guess A Number"/>
      {content}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
