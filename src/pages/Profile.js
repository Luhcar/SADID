import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import data from '../storages/data.json';
import { getData, removeData } from '../storages/localStorage';
import axios from 'axios';



const Profile = ({navigation}) => {
  const [profile, setProfile] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData('token').then(async res => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setToken(res);
        getProfile(res);
      }
    })
  }, []);

  const getProfile = async (token) => {
    if (!token) return;
    try{
      setIsLoading(true);
      const response = await axios.get(
      'https://arsipdigital-v2.my.id/api/users/profile.php',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
        const data = response.data.data;
        setProfile(data);
      })
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

function submitLogout() {
  removeData('auth');
  removeData('token');
  navigation.replace('Login') 
}

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/pp.jpg')}
          />
          <Text style={styles.name}>{profile.nama}</Text>
          <Text style={styles.position}>NRP {profile.nrp_pegawai}</Text>
          <TouchableOpacity onPress={submitLogout}>
            <Text style={styles.editProfile}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nomor Telepon</Text>
            <Text style={styles.infoValue}>{profile.nomor_hp}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Kode Bagian</Text>
            <Text style={styles.infoValue}>{profile.kode_bagian}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Jabatan</Text>
            <Text style={styles.infoValue}>{profile.jabatan}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Pangkat</Text>
            <Text style={styles.infoValue}>{profile.pangkat}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Deskripsi</Text>
            <Text style={styles.infoValue}>
              {profile.deskripsi}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  position: {
    fontSize: 14,
    color: '#888',
  },
  editProfile: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
  },
  actionContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    marginHorizontal: 20,
  },
  actionItem: {
    marginVertical: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  historycontainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#333',
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeline: {
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: '#ddd',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    elevation: 5,
    width: 300,
    height: 130,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});
