import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

const DetailSKtugas = ({route, navigation}) => {
  const {surat} = route.params;

  

  const handleOpenPDF = () => {
    const pdfUrl = `https://arsipdigital-v2.my.id/uploads/surat_tugas/${surat.softfile}`;
    Linking.openURL(pdfUrl).catch(err =>
      console.error('Gagal membuka file', err),
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack('DataSKtugas')}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detail SK Tugas</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.kodeSurat}>NRP {surat.nrp_pegawai}</Text>
        <Text style={styles.label}>Pegawai</Text>
        <Text style={styles.titleSurat}>{surat.nama_pegawai}</Text>
        <Text style={styles.infoText}>Tanggal : {surat.tanggal_sk}</Text>

        <View style={styles.penerimaContainer}>
          <Text style={styles.label}>Deskripsi</Text>
          <Text style={styles.penerima}>{surat.deskripsi}</Text>
        </View>

        <View style={styles.softfileContainer}>
          <Text style={styles.label}>Softfile</Text>
          {/* <Image
            source={require('../assets/images/surat.png')} // Ganti dengan URL gambar dokumen asli Anda
            style={styles.image}
          /> */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleOpenPDF}>
              <Text style={styles.buttonText}>Buka Surat</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailSKtugas;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#222831',
    paddingVertical: 19,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FCB026',
    height: 65,
    paddingLeft: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 19,
  },
  kodeSurat: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 10,
  },
  titleSurat: {
    fontSize: 18.5,
    fontFamily: 'Raleway-SemiBold',
    color: '#333',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#555',
    marginBottom: 20,
  },
  penerimaContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#000',
    marginBottom: 4,
  },
  penerima: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#555',
  },
  softfileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF9114',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    justifyContent: 'center',
    color: '#fff',
  },
  dataContainer: {
    paddingHorizontal: 17,
    paddingTop: 29,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, 
},
buttonDownload: {
  backgroundColor: '#3498db',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 50,
},
view: {
  flex: 1,
}
});
