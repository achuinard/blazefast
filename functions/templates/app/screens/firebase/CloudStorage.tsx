import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, FlatList, Platform, Alert, StyleSheet, useColorScheme} from 'react-native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {getAuth} from "@react-native-firebase/auth";
import {BFText} from "@/components/BFText";
import BFButton from "@/components/BFButton";

type CloudStorageImage = {
    name: string;
    url: string;
}

const CloudStorageScreen = () => {
    const [images, setImages] = useState<CloudStorageImage[]>([]);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const result = await storage().ref('users/' + getAuth().currentUser?.uid).list();
        const urls = await Promise.all(
            result.items.map(async (ref) => {
                const url = await ref.getDownloadURL();
                return {name: ref.name, url};
            })
        );
        setImages(urls);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const {uri} = result.assets[0];
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

            try {
                await storage().ref(`users/${getAuth().currentUser?.uid}/${filename}`).putFile(uploadUri);
                console.log('Image uploaded successfully');
                fetchImages();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const deleteImage = async (name: string) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        await storage().ref(`users/${getAuth().currentUser?.uid}/${name}`).delete();
                        fetchImages();
                    },
                },
            ]
        );

    }

    return (
        <View style={styles.container}>
            <BFText style={styles.title}>Cloud Storage Gallery</BFText>
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImage}
            >
                <BFText style={styles.uploadButtonText}>Upload Image</BFText>
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={images}
                ItemSeparatorComponent={() => <View style={[styles.separator, {backgroundColor: isDark ? '#4b5563' : '#d1d5db'}]}/>}
                renderItem={({item}) => (
                    <View style={styles.imageContainer}>
                        <View>
                            <Image
                                source={{uri: item.url}}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <BFText style={styles.imageName}>{item.name}</BFText>
                        </View>
                        <View style={styles.buttonRow}>
                            <BFButton
                                title={'Share'}
                                onPress={() => deleteImage(item.name)}/>
                            <BFButton
                                color={'danger'}
                                title={'Delete'}
                                onPress={() => deleteImage(item.name)}/>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    uploadButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    uploadButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        marginVertical: 8,
    },
    imageContainer: {
        gap: 8,
    },
    image: {
        width: '100%',
        height: 192,
        borderRadius: 8,
    },
    imageName: {
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
        padding: 8,
        fontSize: 12,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});

export default CloudStorageScreen;
