import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { displayName } from '../../app.json';
import { version } from '../../package.json';

const AppVersion = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        category="c1"
        appearance="hint"
        style={{ marginTop: 10 }}>{`${displayName} ${version}`}</Text>
    </View>
  );
};

export default AppVersion;
