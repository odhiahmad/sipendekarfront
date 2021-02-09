import React, {Component} from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {StackActions} from '@react-navigation/native';
import * as ImageManipulator from "expo-image-manipulator";
import {Icon} from "react-native-elements";


class Kamera extends Component {

    constructor(props) {

        super(props);
        this.state = {
            hasCameraPermission: null,

        };
    }
    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    ambilFoto = () => {
        this.snap();
    }

    snap = async () => {
        if (this.camera) {
            const optionsCamera = {quality: 0.5, base64: true, skipProcessing: true};
            let photo = await this.camera.takePictureAsync(
                optionsCamera
            );

            let resizedPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 300, height: 300 } }],
                { compress: 1, format: "jpeg", base64: true }
            );

            this.props.navigation.state.params.goBackData({
                uri: resizedPhoto.uri, gambar: resizedPhoto.base64
            });
            this.props.navigation.pop()


        }
    };



    render() {
        const {hasCameraPermission} = this.state;

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        style={styles.indicator}
                        animating={true}
                        size="large"
                    />
                    <Text>Sedang Mengupload Photo</Text>
                </View>
            );
        }

        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                        <Camera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={{
                                flex: 1,
                                marginTop: 5,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: Dimensions.get('window').height - 200,
                                width: Dimensions.get('window').width,
                            }}
                            type={this.state.type}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'column',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Icon
                                        name="phone"
                                        size={25}
                                        color="white"
                                        type="font-awesome-5"
                                    />
                                </TouchableOpacity>
                            </View>
                        </Camera>

                        <View>
                            <TouchableOpacity onPress={this.ambilFoto}>
                                <Text>Ambil Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

export default Kamera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
