import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {Icon} from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingModal: false,
            loading: false,
            showTryAgain: false,
            isLoading: true,
            dataSource: null,
            data: [],
            dataDetail: [],
            isLoadingDataModal: true,
            isModalVisible: false,
            modalVisible: false,
            urlImage: '',
            searchAktif: 0
        };
    }

    pickImage = async () => {
        this.setBottomSheetVisibility();
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

        const {navigation} = this.props.navigation;
        return (
            <ImageBackground
                source={require("./images/back.png")}
                style={{width: "100%", height: "100%"}}
            >


                <View style={{paddingHorizontal: 40, marginTop: 80}}>
                    <Text
                        style={{
                            fontSize: 40,
                            color: "#522289",
                        }}
                    >
                        Hello
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            paddingVertical: 10,
                            paddingRight: 80,
                            lineHeight: 22,
                            color: "#a2a2db",
                        }}
                    >
                        Selamat Datang di SIPENDEKAR Sistem Pendeteksi Kebakaran
                    </Text>
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        flexDirection: "row",*/}
                    {/*        backgroundColor: "#FFF",*/}
                    {/*        borderRadius: 40,*/}
                    {/*        alignItems: "center",*/}
                    {/*        paddingVertical: 10,*/}
                    {/*        paddingHorizontal: 20,*/}
                    {/*        marginTop: 30,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Image*/}
                    {/*        source={require("./images/search.png")}*/}
                    {/*        style={{height: 14, width: 14}}*/}
                    {/*    />*/}
                    {/*    <TextInput*/}
                    {/*        placeholder="Lorem ipsum"*/}
                    {/*        style={{paddingHorizontal: 20, fontSize: 15, color: "#ccccef"}}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    <View style={{flexDirection: "row",alignItems: "center",
                        justifyContent: "center", marginTop: 350}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("LaporanPengaduan")}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 100,
                                width: 120,

                            }}>
                            <View

                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 66,
                                    width: 66,
                                    borderRadius: 50,
                                    backgroundColor: "#5facdb",
                                }}
                            >
                                <Icon type='font-awesome-5' name='briefcase' color='#fff'
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "gray",
                                }}
                            >Data Laporan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("About")}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 100,
                                width: 120,

                            }}>
                            <View

                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 66,
                                    width: 66,
                                    borderRadius: 50,
                                    backgroundColor: "#ff5c83",
                                    marginHorizontal: 22,
                                }}
                            >
                                <Icon type='font-awesome-5' name='clipboard-check' color='#fff'
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "gray",
                                }}
                            >About</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </ImageBackground>
        );
    }


}

const styles = StyleSheet.create({
    ripleContainer: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        minHeight: 56,
        margin: 4,
        borderRadius: 15,
        elevation: 2,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    buttonRiple: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        width: 80,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 2,
        padding: 5,
    },
    buttonRiple2: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        width: 110,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 2,
        padding: 5,
    },
    a: {
        backgroundColor: '#1da30b',
    },
    textButton: {
        fontSize: 12,
        fontWeight: '500',
        color: 'gray',
    },
    text: {
        fontSize: 30,
        fontWeight: '500',
        color: 'rgba(255,255,255,.87)',
    },

    footnote: {
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,.54)',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {},
    view2: {},
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: 'orange',
        borderRadius: 25,
        marginVertical: 2,
        paddingVertical: 13,
    },
});
