import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import AppVersion from './components/app-version';
import TranscriptionScreen from './screens/transcription-screen';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{ flex: 1 }}>
        <AppVersion />

        <TranscriptionScreen />
      </Layout>
    </ApplicationProvider>
  );
};

export default App;
