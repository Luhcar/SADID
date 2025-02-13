import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import data from '../storages/data.json';
import axios from 'axios';
import {getData} from '../storages/localStorage';
import DatePicker from 'react-native-date-picker';

const SKtugas = ({navigation}) => {
  const [SKtugas, setSKtugas] = useState([]);
  const [filteredSurat, setFilteredSurat] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getData('token').then(async res => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setToken(res);
        getSKtugas(res);
      }
    });
  }, []);

  const getSKtugas = async token => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://arsipdigital-v2.my.id/api/users/histori_sk.php',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data.data;

      // Urutkan data berdasarkan tanggal terbaru
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.tanggal_sk);
        const dateB = new Date(b.tanggal_sk);
        return dateB - dateA;
      });

      setSKtugas(sortedData);
      setFilteredSurat(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredSurat(SKtugas);
    } else {
      const filteredData = SKtugas.filter(item =>
        (item.deskripsi || item.nama_pegawai || '')
          .toLowerCase()
          .includes(text.toLowerCase()),
      );
      setFilteredSurat(filteredData);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nrp}>NRP {item.nrp_pegawai}</Text>
        <Text style={styles.nama}>{item.nama_pegawai}</Text>
        <Text style={styles.deskripsi}>{item.deskripsi}</Text>
        <Text style={styles.date}>Tanggal : {item.tanggal_sk}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailSKtugas', {surat: item})}
          style={styles.detailButton}>
          <Text style={styles.detail}>Lihat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Surat Keterangan Tugas</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Cari berdasarkan deskripsi surat"
            style={styles.searchInput}
            placeholderTextColor="#373737"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredSurat}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SKtugas;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FCB026',
    padding: 16,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontFamily: 'Raleway-Bold',
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 23,
    borderRadius: 15,
    paddingHorizontal: 10,
    width: 311,
    height: 38,
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#FF9114',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
    marginTop: 27,
    marginBottom: 30,
  },
  filterText: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 13,
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#C1C1C1',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  nrp: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  deskripsi: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Raleway-SemiBold',
  },
  nama: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#000000',
    marginTop: 5,
  },
  date: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 14,
  },
  detailButton: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    backgroundColor: '#222831',
    borderRadius: 50,
    width: 60,
    height: 30,
    paddingBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  applyFilterButton: {
    backgroundColor: '#FF9114',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  applyFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
