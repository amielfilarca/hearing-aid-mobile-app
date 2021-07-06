import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { name, version } from '../../package.json';

const AppVersion = () => {
  return <Text style={styles.appInfoText}>{`${name} ${version}`}</Text>;
};

export default AppVersion;

const styles = StyleSheet.create({
  appInfoText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
});
