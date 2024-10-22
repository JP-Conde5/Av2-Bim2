import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, BarcodeScanningResult } from "expo-camera";
import { useRef, useState } from "react"
import { Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

export function Take(){
    const [side, setSide] = useState<CameraType>('back')
    const [permission, requestPermission] = useCameraPermissions()
    const [photo, setPhoto] = useState<CameraCapturedPicture>()
    const [scanned, setScanned] = useState(false)
    const refCamView = useRef<CameraView>(null)
    
    if(!permission){
        return <View/>
    }
    
    if(!permission.granted){
        return (
            <View style={styles.container}>
                <View>
                    <Text>Você precisa dar permissãoa à câmera</Text>
                    <TouchableOpacity onPress={requestPermission}><Text>Permitir</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
    
    function handleBarcodeScanner({data}: BarcodeScanningResult){
        Alert.alert(`${data}`)
        setScanned(true)
    }

    function toogleCameraSide(){
        setSide(current => (current == 'back' ? 'front' : 'back'))
    }

    async function takePicture(){
        if(refCamView.current){
            const picture = await refCamView.current.takePictureAsync({ imageType: 'jpg', quality: 0})
            setPhoto(picture)
        }
    }
    if(scanned){
        return(
            <View>
                <TouchableOpacity><MaterialCommunityIcons name="qrcode-scan" size={40} color={colors.primary}/></TouchableOpacity>
                <CameraView facing={side} ref={refCamView}/>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={toogleCameraSide}><MaterialIcons name="flip-camera-android" size={40} color={colors.primary}/></TouchableOpacity>
            <CameraView style={styles.cam} facing={side} ref={refCamView} barcodeScannerSettings={{barcodeTypes: ['qr']}} onBarcodeScanned={handleBarcodeScanner}/>
            <TouchableOpacity onPress={takePicture}><MaterialCommunityIcons name="camera-iris" size={40} color={colors.primary}/></TouchableOpacity>
            {photo && <Image source={{uri:photo.uri}}/>}
        </View>
    )
}