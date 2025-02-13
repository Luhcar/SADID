import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from '../storages/data.json';
import axios from 'axios';
import {getData} from '../storages/localStorage';

const Home = ({navigation}) => {
  const [profile, setProfile] = useState('');
  const [SKtugas, setSKtugas] = useState('');
  const [dataSurat, setDataSurat] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData('token').then(async res => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setToken(res);
        getProfile(res);
        getSKtugas(res);
        getSurat(res);
      }
    });
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
        return dateB - dateA; // Urutkan menurun berdasarkan tanggal
      });

      setSKtugas(sortedData); // Tetapkan data terurut ke state
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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

  // total data per kategori
  const totalSKTugas = SKtugas.length;
  const totalSuratMasuk = dataSurat.filter(
    item => item.status === 'Masuk',
  ).length;
  const totalSuratKeluar = dataSurat.filter(
    item => item.status === 'Keluar',
  ).length;

  const stats = [
    {tittle: 'SK Tugas', total: totalSKTugas},
    {tittle: 'Surat Masuk', total: totalSuratMasuk},
    {tittle: 'Surat Keluar', total: totalSuratKeluar},
  ];

  const renderSurat = ({item}) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.kode}>{item.kode_transaksi}</Text>
        <Text style={styles.asal}>{item.asal_surat || item.dikirim_kepada}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'Masuk' ? styles.masuk : styles.keluar,
          ]}>
          {item.status}
        </Text>
        <Text
          style={[
            styles.jenis,
            item.jenis_surat === 'Penting' ? styles.keluar : styles.jenis,
          ]}>
          {item.jenis_surat}
        </Text>
        <Text style={styles.date}>{item.tanggal_surat_masuk || item.tanggal_surat_keluar}</Text>
      </View>
    </View>
  );

  const renderSKtugas = ({item}) => (
    <View style={styles.cardContainerTugas}>
      <View style={styles.cardTugas}>
        <View>
          <Text style={styles.nrp}>NRP {item.nrp_pegawai}</Text>
          <Text style={styles.nama}>{item.nama_pegawai}</Text>
          <Text style={styles.deskripsi}>{item.deskripsi}</Text>
          <Text style={styles.dateSK}>Tanggal : {item.tanggal_sk}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailSKtugas', {surat: item})}
            style={styles.button}>
            <Text style={styles.buttonText}>Lihat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title}>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                marginTop: 7,
              }}>
              Halo, {profile.nama} - {profile.jabatan}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',
                fontFamily: 'Poppins-SemiBold',
                marginTop: 9,
              }}>
              Selamat Datang
            </Text>
          </View>
        </View>

        {/* Statistic */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View style={styles.statBox} key={index}>
              <Text style={styles.statLabel}>{stat.tittle}</Text>
              <Text style={styles.statNumber}>{stat.total}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Surat Masuk Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Surat</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DataSurat')}>
            <Text style={styles.seeMore}>Lainnya</Text>
            <View style={styles.underline}></View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataSurat.slice(0, 4)}
          keyExtractor={item => `${item.status}-${item.id}`}
          renderItem={renderSurat}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        />
      </View>

      {/* Surat Keterangan Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SK Tugas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SKtugas')}>
            <Text style={styles.seeMore}>Lainnya</Text>
            <View style={styles.underline}></View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={SKtugas.slice(0, 4)}
        keyExtractor={item => item.id}
        renderItem={renderSKtugas}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainerSK}
      />
    </ScrollView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    backgroundColor: '#FCB026',
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    marginTop: 17,
    marginHorizontal: 29,
    width: 302,
    height: 63,
    flexDirection: 'row',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 110,
    marginTop: 7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: '#FFF',
    width: 91,
    height: 91,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 4,
    marginTop: 25,
  },
  statNumber: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginTop: 9,
  },
  statLabel: {
    fontSize: 11,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginTop: 7,
  },
  section: {
    paddingLeft: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#333',
    marginLeft: 5,
  },
  sectionSub: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#333',
    marginLeft: -5,
  },
  seeMore: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Raleway-SemiBold',
    marginRight: 26,
  },
  underline: {
    width: 50,
    height: 2,
    backgroundColor: '#FCB026',
    marginTop: 2,
  },
  cardContainer: {
    marginTop: 0,
    flexDirection: 'row',
  },
  cardContainerTugas: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#FFF',
    width: 210,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 7,
    position: 'relative',
    marginRight: 12,
    padding: 13,
    paddingVertical: 9,
  },
  kode: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  asal: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: 'Raleway-SemiBold',
    marginTop: -2,
  },
  cardTag: {
    fontSize: 10,
    color: '#FFF',
    backgroundColor: '#FF5C5C',
    padding: 5,
    borderRadius: 10,
    width: 43,
    height: 25,
    marginTop: 5,
  },
  dateSK: {
    fontSize: 15,
    color: '#000000',
    marginTop: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold', 
    marginTop: 14,
  },
  cardTugas: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 18,
    padding: 12,
    paddingVertical: 9,
    position: 'relative',
  },
  cardImage: {
    width: 90,
    height: 95,
    marginRight: 15,
    borderRadius: 5,
    borderRadius: 15,
  },
  button: {
    position: 'absolute',
    right: 8,
    bottom: 5,
    backgroundColor: '#222831',
    borderRadius: 50,
    width: 60,
    height: 25,
    paddingBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 13,
    fontFamily: 'Raleway-SemiBold',
  },
  status: {
    position: 'absolute',
    right: 16,
    top: 7,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  masuk: {
    color: '#299033',
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
  },
  keluar: {
    color: '#C82020',
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
  },
  listContainerSK: {
    marginHorizontal: -7,
  },
  jenis: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Raleway-Bold',
    marginTop: 7,
  },
  nrp: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
  },
  deskripsi: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Raleway-SemiBold',
  },
  nama: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#000000',
    marginTop: 5,
  },
});
