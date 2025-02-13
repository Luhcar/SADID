import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
  } from 'react-native';
  import {useEffect} from 'react';
  import React from 'react';
import { getData } from '../storages/localStorage';
  
  const SplashScreen = ({navigation}) => {

    useEffect(() => {
      setTimeout(() => {
        getData('auth').then(async res => {
          if (res) {
            navigation.replace('Home')
          } else {
            navigation.replace('Login')
          }
        })
      }, 2000)
  })
  
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/images/LogoSplash.png')}
          style={{width: 110, height: 146.8}}
        />
        <View style={styles.title}>
          <Text style={styles.txttitleP}>POLRES</Text>
          <Text style={styles.txttitleD}> DEMAK</Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: '#242424',
            fontFamily: 'Metal-Regular',
            marginTop: 1,
          }}>
          Objektif, Dipercaya, dan Partisipasi
        </Text>
      </SafeAreaView>
    );
  };
  
  export default SplashScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F59532',
    },
    title: {
      width: 238,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 15.2,
    },
    txttitleP: {
      fontSize: 30,
      color: '#FFFFFF',
      fontFamily: 'Prompt-Bold',
      alignItems: 'center',
      justifyContent: 'center',
    },
    txttitleD: {
      fontSize: 30,
      color: '#000000',
      fontFamily: 'Prompt-Bold',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  