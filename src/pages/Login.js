import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import {getData, storeData} from '../storages/localStorage';
import axios from 'axios';

const Login = ({navigation}) => {
  const [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  function submitLogin() {
    if (LoginForm.email == '') {
      Alert.alert('email harus diisi');
      return;
    }

    if (LoginForm.password == '') {
      Alert.alert('password harus diisi');
      return;
    }

    // Jika vaidasi diatas sudah benar, maka akan muncul alert login berhasil
    axios.post('https://arsipdigital-v2.my.id/api/users/user.php', LoginForm)
    .then((response) => {
      Alert.alert('Login Berhasil');

      storeData('token', response.data.token);

      setLoginForm({
        email: '',
        password: '',
      });
      navigation.replace('Home');

      console.log(response.data);
    }).catch((error) => {
      Alert.alert('Login Gagal', 'Email atau Password Salah');
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={{width: 71, height: 94.75, marginTop: 93}}
      />
      <View style={styles.title}>
        <Text style={styles.txttitleP}>POLRES</Text>
        <Text style={styles.txttitleD}> DEMAK</Text>
      </View>
      <View>
        <Text style={styles.txtwelcome}>Selamat Datang Silahkan Login</Text>
      </View>
      <Input
        label="Email"
        placeholder="Masukkan Email"
        required
        value={LoginForm.email}
        keyboardType="email-address"
        secure={false}
        onChange={isiText => {
          setLoginForm({
            ...LoginForm,
            email: isiText,
          });
        }}
      />
      <Input
        label="Password"
        placeholder="Masukkan Password"
        required={true}
        keyboardType="default"
        secure={true}
        value={LoginForm.password}
        onChange={isiText => {
          setLoginForm({
            ...LoginForm,
            password: isiText,
          });
        }}
      />

      <TouchableOpacity onPress={() => submitLogin()} style={styles.btnLogin}>
        <Text style={styles.btnLogintxt}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    width: 238,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txttitleP: {
    fontSize: 20,
    color: '#FFCC00',
    fontFamily: 'Prompt-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txttitleD: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Prompt-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtwelcome: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Prompt-Medium',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 59,
    marginBottom: 20,
  },
  btnLogin: {
    width: 312,
    height: 45,
    backgroundColor: '#FCB026',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 7,
  },
  btnLogintxt: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
});
