import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { getData, storeData } from '../storages/localStorage';

const DataSurat = ({ navigation }) => {
  const [dataSurat, setDataSurat] = useState([]);
  const [filteredSurat, setFilteredSurat] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getData('token').then(async (res) => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setToken(res);
        getSurat(res); // Panggil fungsi getSurat setelah token tersedia
      }
    });
  }, []);

  const getSurat = async (token) => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://arsipdigital-v2.my.id/api/users/histori_surat.php',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const suratMasuk = (response.data.data.surat_masuk || []).map((item) => ({
        ...item,
        status: 'Masuk',
      }));
      const suratKeluar = (response.data.data.surat_keluar || []).map((item) => ({
        ...item,
        status: 'Keluar',
      }));
      const combinedData = [...suratMasuk, ...suratKeluar];
      const filteredData = removeDuplicatesByIdAndStatus(combinedData);

      const sortedData = filteredData.sort((a, b) => {
        const dateA = new Date(a.tanggal_surat_masuk || a.tanggal_surat_keluar);
        const dateB = new Date(b.tanggal_surat_masuk || b.tanggal_surat_keluar);
        return dateB - dateA; // Urutan menurun
      });

      setDataSurat(sortedData); // Gabungkan data surat masuk dan keluar
      setFilteredSurat(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const removeDuplicatesByIdAndStatus = (array) => {
    const uniqueData = array.reduce((acc, current) => {
      const exists = acc.find((item) => item.id === current.id && item.status === current.status);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueData;
  };
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredSurat(dataSurat);
    } else {
      const filteredData = dataSurat.filter((item) =>
        (item.asal_surat || item.dikirim_kepada || '')
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredSurat(filteredData);
    }
  };
  


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.kode}>{item.kode_transaksi}</Text>
      <Text style={styles.asal}>{item.asal_surat || item.dikirim_kepada}</Text>
      <Text style={styles.jenis}>
          Jenis Surat : <Text style={item.jenis_surat === 'Penting' ? styles.statusKeluar : null}>{item.jenis_surat}</Text>
      </Text>
      <Text style={styles.date}>
        Tanggal: {item.tanggal_surat_masuk || item.tanggal_surat_keluar}
      </Text>
      <Text
        style={[
          styles.status,
          item.status === 'Masuk' ? styles.statusMasuk : styles.statusKeluar,
        ]}
      >
        {item.status}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailSurat', { surat: item })}
        style={styles.detailButton}>
        <Text style={styles.detail}>Lihat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Surat</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Cari berdasarkan asal surat"
            style={styles.searchInput}
            placeholderTextColor="#373737"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredSurat}
        keyExtractor={(item) => `${item.status}-${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default DataSurat;

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
  kode: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  asal: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#000000',
    marginTop: 10,
  },
  jenis: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Raleway-SemiBold',
    marginTop: 1,
  },
  date: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  status: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusMasuk: {
    color: '#299033',
  },
  statusKeluar: {
    color: '#C82020',
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
});
