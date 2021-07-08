import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Voice from '@react-native-voice/voice';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const Results = ({ results }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 14, color: 'gray', marginBottom: 10 }}>
        Possible results:
      </Text>

      {results.map((result, index) => (
        <Text key={index} style={styles.transcriptionText}>
          {result}
        </Text>
      ))}
    </View>
  );
};

const PartialResult = ({ partialResult }) => {
  return <Text style={styles.transcriptionText}>{partialResult}</Text>;
};

const ErrorMessage = ({ error }) => {
  return (
    <Text style={{ fontSize: 14, color: 'red' }}>{JSON.stringify(error)}</Text>
  );
};

const Transcription = () => {
  const [isListening, setIsListening] = useState(false);
  const [partialResults, setPartialResults] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(async () => {
    await checkPermission();
    if (!hasPermission) await requestPermission();

    return () => {};
  }, []);

  const checkPermission = async () => {
    const checkResult = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (checkResult === RESULTS.GRANTED) setHasPermission(true);
    return checkResult;
  };

  const requestPermission = async () => {
    const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (requestResult === RESULTS.GRANTED) setHasPermission(true);
    return requestResult;
  };

  const startListening = async () => {
    if (!hasPermission) await requestPermission();
    await Voice.start('fil-PH');
    setPartialResults([]);
    setResults([]);
    setError(null);
    setIsListening(true);
  };

  const stopListening = async () => {
    await Voice.stop();
    setIsListening(false);
  };

  const handleClick = () => {
    isListening ? stopListening() : startListening();
  };

  Voice.onSpeechError = e => {
    if (e.error.code === '7') return;
    setError(e.error);
    console.log('onSpeechError: ', e);
  };

  Voice.onSpeechResults = e => {
    setResults(e.value);
    console.log('onSpeechResults: ', e);
  };

  Voice.onSpeechPartialResults = e => {
    setPartialResults(e.value);
    console.log('onSpeechPartialResults: ', e);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {error && <ErrorMessage error={error} />}

        {isListening && partialResults.length === 1 && (
          <PartialResult partialResult={partialResults[0]} />
        )}

        {!isListening && results.length > 0 && <Results results={results} />}

        {!isListening &&
          results.length === 0 &&
          partialResults.length === 0 && (
            <Text style={styles.transcriptionText}>Start talking...</Text>
          )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isListening ? 'red' : 'green' },
        ]}
        activeOpacity={0.8}
        onPress={handleClick}>
        <Text style={styles.buttonText}>{isListening ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Transcription;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
  transcriptionText: { fontSize: 16, color: 'black' },
});
