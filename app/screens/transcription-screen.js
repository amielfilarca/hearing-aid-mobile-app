import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import Voice from '@react-native-voice/voice';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const Results = ({ results }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text category="label" appearance="hint" style={{ marginBottom: 10 }}>
        Possible results:
      </Text>

      {results.map((result, index) => (
        <Text key={index} category="p1">
          {result}
        </Text>
      ))}
    </View>
  );
};

const PartialResult = ({ partialResult }) => {
  return <Text category="p1">{partialResult}</Text>;
};

const ErrorMessage = ({ error }) => {
  return (
    <Text category="p1" status="danger" style={{ marginBottom: 10 }}>
      {JSON.stringify(error)}
    </Text>
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
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}>
        {error && <ErrorMessage error={error} />}

        {isListening && partialResults.length === 1 && (
          <PartialResult partialResult={partialResults[0]} />
        )}

        {!isListening && results.length > 0 && <Results results={results} />}

        {!isListening && results.length === 0 && partialResults.length === 0 && (
          <Text category="p1" appearance="hint">
            Start talking...
          </Text>
        )}
      </View>

      <Button
        onPress={handleClick}
        status={isListening ? 'danger' : 'primary'}
        style={{ marginHorizontal: 20, marginBottom: 30 }}>
        {isListening ? 'STOP' : 'START'}
      </Button>
    </Layout>
  );
};

export default Transcription;
