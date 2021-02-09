import {Alert, Image, StatusBar, StyleSheet, TextInput, View} from "react-native";
import React from "react";
import {BottomSheet,Button, Header, Icon,ListItem} from 'react-native-elements';
import Ripple from "react-native-material-ripple";
import * as ImagePicker from 'expo-image-picker';
import {baseApi} from "./services/api";
import LoaderModal from "./components/LoaderModal";

import ValidationComponent from 'react-native-form-validator';
import * as Location from 'expo-location';

export default class LaporanPengaduan extends ValidationComponent {
    constructor(props) {

        super(props);
        this.state = {
            loadingModal: false,
            loading: false,
            showTryAgain: false,

            tanggal:'',

            nama: '',
            no_hp: '',
            gambar: '',
            pesan: '',
            file_ext: '',
            provinsi: '',
            kota: '',
            kecamatan: '',
            lat:'',
            long:'',
            lokasi:'',



            uri:'',
            date: new Date(1598051730000),

            setShow: false,
            isVisible: false,

        };
    }


    componentDidMount() {
        this.getLocation();
    }

    setBottomSheetVisibility = () => {
        this.setState({isVisible: !this.state.isVisible});
    }



    getLocation = async () => {
        this.setState({
            loading: true,
        });
        Location.requestPermissionsAsync().then((permission) => {
            if (permission.status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                Location.getCurrentPositionAsync().then((pos) => {
                    Location.reverseGeocodeAsync({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }).then((res) => {
                        this.setState({
                            loading: false,
                        });
                        this.setState({
                            provinsi: res[0].region,
                            kota: res[0].subregion,
                            kecamatan: res[0].district,
                            postalCode:res[0].postalCode,
                            lat:pos.coords.latitude,
                            long: pos.coords.longitude,
                            lokasi:res[0].street

                        })

                        console.log({
                            provinsi: res[0].region,
                            kota: res[0].subregion,
                            kecamatan: res[0].district,
                            postalCode:res[0].postalCode,
                            lat:pos.coords.latitude,
                            long: pos.coords.longitude,
                        })

                        // e.g. Canada, United States
                    });
                });
            }
        });


    }


    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });


        if (!result.cancelled) {

            let uri = result.uri;
            let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);
            this.setState({
                gambar: result.base64,
                file_ext: fileExtension,
                uri: result.uri
            })

            console.log(this.state.file_ext);
        }
    };



    _onSubmit() {

        this.validate({
            nama: {required: true},
            email: {required: true},
            no_hp: {required: true},
            gambar: {required: true},
            pesan: {required: true},

        });
        if (this.isFormValid()) {
            this.setState({
                loading: true,
            });
            fetch(baseApi + 'kebakaran', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    nama: this.state.nama,
                    no_hp: this.state.no_hp,
                    file: this.state.gambar,
                    pesan: this.state.pesan,
                    file_ext: this.state.file_ext,
                    provinsi: this.state.provinsi,
                    kabupaten: this.state.kota,
                    kecamatan: this.state.kecamatan,
                    lat:this.state.lat,
                    lng:this.state.long,
                    lokasi:this.state.lokasi

                }),
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)

                if (responseJson.status === true) {
                    console.log(responseJson.status)
                    this.setState({
                        loading: false,
                        nama: '',
                        email: '',
                        no_hp: '',
                        gambar: '',
                        pesan: '',
                        file_ext: '',
                        uri:''
                    });

                    Alert.alert(
                        "Notifikasi",
                        "Berhasil menginputkan data laporan",
                        [
                            {text: "OK", onPress: () => console.log("OK Pressed")}
                        ],
                        {cancelable: false}
                    );


                } else {
                    console.log(responseJson)
                    this.setState({
                        loading: false,

                    });

                    Alert.alert(
                        "Notifikasi",
                        "Gagal",
                        [
                            {text: "OK"}
                        ],
                        {cancelable: false}
                    );

                }


            }).catch((error) => {
                console.log(error)
                this.setState({
                    loading: false,
                });

                Alert.alert(
                    "Notifikasi",
                    "Gagal",
                    [
                        {text: "OK"}
                    ],
                    {cancelable: false}
                );
            });
        } else {

            Alert.alert(
                "Notifikasi",
                "Isi Semua Data Dengan Benar",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: false}
            );
            console.log('Gagal')

        }

    }

    pickFoto = () => {

        let dataTes = {
            nama: this.state.nama,
            no_hp: this.state.no_hp,
            pesan: this.state.pesan
        }
        this.props.navigation.navigate('Kamera', { goBackData: dataTes});
        this.setBottomSheetVisibility()
    }

    render() {

        const list = [
            {
                title: 'Pilih Foto / Video',
                onPress: this.pickImage
            },
            {
                title: 'Ambil Foto / Video',
                onPress: this.pickFoto
            },
            {
                title: 'Keluar',
                containerStyle: {backgroundColor: 'red'},
                titleStyle: {color: 'white'},
                onPress: this.setBottomSheetVisibility,
            },
        ];
        return (
            <View style={{flex: 1}}>
                <LoaderModal
                    loading={this.state.loading}/>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0.4)"/>
                <Header
                    containerStyle={{height:80}}
                    backgroundColor='#e52d27'
                    leftComponent={
                        <Ripple onPress={() => {
                            this.props.navigation.pop()
                        }}>
                            <Icon type='ionicon' name='arrow-back-outline' color='#fff'
                            /></Ripple>}

                    centerComponent={{text: 'Laporkan', style: {color: '#fff', fontWeight: 'bold'}}}
                />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <TextInput
                        value={this.state.nama}
                        onChangeText={(nama) => this.setState({nama})}
                        placeholder='Nama'
                        clearButtonMode='always'
                        selectionColor="#999999"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        autoCapitalize='words'
                        style={styles.inputBox}
                    />
                    <TextInput
                        value={this.state.no_hp}
                        keyboardType={"numeric"}
                        onChangeText={(no_hp) => this.setState({no_hp})}
                        placeholder='Nomor HP'
                        clearButtonMode='always'
                        selectionColor="#999999"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        autoCapitalize='words'
                        style={styles.inputBox}
                    />
                    <TextInput
                        value={this.state.pesan}
                        onChangeText={(pesan) => this.setState({pesan})}
                        placeholder='Pesan'
                        clearButtonMode='always'
                        selectionColor="#999999"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        autoCapitalize='words'
                        style={styles.inputBox}
                    />

                    {this.state.uri !== '' ?
                        <View style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={{uri: this.state.uri}} style={{
                                width: 120,
                                height: 120,
                                marginBottom: 5
                            }}/>
                        </View>
                        :
                        <View></View>
                    }


                    <Button
                        buttonStyle={{
                            backgroundColor: 'rgba(29, 163, 11,0.8)',
                            height: 60,
                            width: 240,
                            borderRadius: 30
                        }}
                        onPress={this.pickImage}
                        containerStyle={{margin: 5}}
                        title="Ambil Foto"
                    />


                    <Button
                        onPress={this._onSubmit.bind(this)}
                        buttonStyle={{backgroundColor: 'red', height: 60, width: 240, borderRadius: 30}}
                        containerStyle={{margin: 5, marginTop: 5}}
                        title="Submit Laporan"
                    />
                </View>
                <BottomSheet isVisible={this.state.isVisible}>
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    inputTextStyle: {
        paddingTop: 30
    },
    inputBox: {
        height: 50,
        width: 500,
        maxWidth: 400,
        // backgroundColor: 'rgba(29, 163, 11,0.8)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 10,
    },

});
