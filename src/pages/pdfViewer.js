import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = ({ route }) => {
    const { pdfUrl } = route.params;

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: pdfUrl }}
                style={{ flex: 1 }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator size="large" color="#FF9114" style={styles.loading} />
                )}
            />
        </View>
    );
};
export default PdfViewer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});
