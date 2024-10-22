import { useState } from "react";
import { View, Image, TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from '@expo/vector-icons';
import {colors} from '../../styles/colors'
import { styles } from "./styles";

export function Select(){
    const [image, setImage] = useState<string | null>(null);
    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        if(!result.canceled){
            setImage(result.assets[0].uri)
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.image}>
                {image && <Image source={{uri: image}}/>}
            </View>
            <TouchableOpacity onPress={pickImage}><FontAwesome name="photo" size={40} color={colors.primary}/></TouchableOpacity>
        </View>

    )
}