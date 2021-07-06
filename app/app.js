import React from 'react';
import { SafeAreaView } from 'react-native';
import AppVersion from './components/app-version';
import TranscriptionScreen from './screens/transcription-screen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AppVersion />

      <TranscriptionScreen />
    </SafeAreaView>
  );
};

export default App;
