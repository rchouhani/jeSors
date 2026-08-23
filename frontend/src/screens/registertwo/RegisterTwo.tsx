import React, { useState, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

import { CATEGORY_COLORS, CATEGORY_TEXT_COLORS } from '../../theme/colors';
import rawEvents from '../../data/events.json';

import { useRegister } from '../../context/RegisterContext';
import { launchImageLibrary } from 'react-native-image-picker';

type AuthNavigationParamList = {
    Login: undefined;
    EventsFeed: undefined;
};

const RegisterTwoScreen = () => {

    const categories =[...new Set(rawEvents.map(event => event.category))];
    const navigation = useNavigation<NavigationProp<AuthNavigationParamList>>();

    const { setProgress, isLogin } = useRegister();
    const [photo, setPhoto] = useState<string | null>(null);
    const [city, setCity] = useState('');
    const [bio, setBio] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
    const filled = [city, bio].filter(v => v && v.length > 0).length;
        setProgress(50 + (filled / 2) * 50);
    }, [city, bio]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (!response.didCancel && response.assets?.[0].uri) {
                setPhoto(response.assets[0].uri);
            }
        });
    }

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
            );
    };

    return (
        <>
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <ProgressBar />
            <Text style={{ fontSize: 40, fontWeight: 800, marginTop: 70, marginBottom: -20 }}>Ton profil</Text>
            <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 12, marginBottom: 30 }}>
                {'\n'}Les autres participants le verront ainsi
            </Text>
            <TouchableOpacity
                style={styles.photoCircle}
                onPress={pickImage}
            >
                {photo
                    ? <Image source={{ uri: photo }} style={styles.photoImage} />
                    : <Text style={styles.photoPlaceholder}>Ajoute ta photo<Text style={{ fontStyle: 'italic', fontSize: 10 }}>{'\n'}(Optionnel)</Text></Text>
                }
            </TouchableOpacity>
            <InputComp
                label='Ville'
                placeholder='Ville'
                value={city}
                onChangeText={setCity}
                keyboardType='default'
            />
            <InputComp
                label='Bio'
                placeholder='Raconte-nous qui tu es'
                style={{ height: 150 }}
                value={bio}
                onChangeText={setBio}
                keyboardType='default'
            />
            {/*Badge de catégories d'activités*/}
                <Text style={styles.interestTitle}>Centres d'intérêt</Text>
                <Text style={styles.interestSubtitle}>Sélectionne ce qui te correspond</Text>
            <View style={styles.tagsContainer}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.tag,
                            { backgroundColor: CATEGORY_COLORS[category] || '#EAEAEA' },
                            selectedCategories.includes(category) && styles.tagSelected,
                        ]}
                        onPress={() => toggleCategory(category)}
                    >
                        <Text style={[
                            styles.tagText,
                            { color: CATEGORY_TEXT_COLORS[category] || '#333' },
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ButtonComp 
                title='Créer mon compte'
                onPress={() => isLogin
                            ? navigation.navigate('EventsFeed')
                            : navigation.navigate('Login')
                        } />
        </View>
        </>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginTop: 150,
        marginLeft: 50,
        fontSize: 16,
    },
     photoCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'cornflowerblue',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: -20,
    },
    photoImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
    },
    photoPlaceholder: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
     interestTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    interestSubtitle: {
        color: 'grey',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tagSelected: {
        borderColor: 'steelblue',
        borderWidth: 2,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default RegisterTwoScreen;