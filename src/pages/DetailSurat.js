import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailSurat = ({route, navigation}) => {
  const {surat} = route.params;

  const handleOpenPDF = () => {
    const pdfUrl = `https://arsipdigital-v2.my.id/uploads/surat_masuk/${surat.softfile}`;
    Linking.openURL(pdfUrl).catch(err =>
      console.error('Gagal membuka file', err),
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack('DataSurat')}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detail Surat</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.kodeSurat}>{surat.kode_transaksi}</Text>

        {surat.status === 'Masuk' ? (
          <Text style={styles.titleSurat}>{surat.asal_surat}</Text>
        ) : (
          <Text style={styles.titleSurat}>{surat.dikirim_kepada}</Text>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Tipe Surat : {surat.status}</Text>
          <Text style={styles.infoText}>Jenis Surat : {surat.jenis_surat}</Text>
        </View>

         <View style={styles.penerimaContainer}>
          <Text style={styles.label}>Penerima</Text>
          <Text style={styles.penerima}>{surat.penerima_nama}</Text>
        </View>

        <View style={styles.softfileContainer}>
          <Text style={styles.label}>Softfile</Text>
          {/* <Image
            source={require('../assets/images/surat.png')} // Ganti dengan URL gambar dokumen asli Anda
            style={styles.image}
          /> */}
          <TouchableOpacity style={styles.button} onPress={handleOpenPDF}>
            <Text style={styles.buttonText}>Buka Surat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default DetailSurat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    marginTop: 10,
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
    marginBottom: 16,
  },
  titleSurat: {
    fontSize: 19,
    fontFamily: 'Raleway-Bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#555',
    marginBottom: 8,
  },
  penerimaContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#000',
    marginBottom: 10,
  },
  penerima: {
    fontSize: 17,
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
  currentStatus: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    color: '#444',
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    backgroundColor: '#FF9114',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FCB026',
  },
});
