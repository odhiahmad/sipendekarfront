import {StatusBar, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import React, {Component} from "react";
import {Header, Icon, Tile, ListItem, Button, BottomSheet} from 'react-native-elements';
import Ripple from "react-native-material-ripple";
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

        const {navigate} = this.props.navigation;
        return (
            <View style={{flex:1}}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0.4)"/>
                <Header
                    containerStyle={{height:80}}
                    backgroundColor='#e52d27'
                    centerComponent={{ text: 'SIPENDEKAR', style: { color: '#fff',fontWeight:'bold' } }}
                />



                <View style={{backgroundColor: 'white', padding: 5,flex: 1,
                    justifyContent:'flex-start'}}>
                    <Button
                        onPress={() => navigate("LaporanPengaduan")}
                        titleStyle={{fontSize:25}}
                        buttonStyle={{backgroundColor:'#e52d27',height:120,marginTop:20}}
                        icon={
                            <Icon
                                name="phone"
                                size={25}
                                color="white"
                                type="font-awesome-5"
                            />
                        }
                        iconRight
                        title="Laporkan "
                    />
                    <Button
                        onPress={() => navigate("LaporanPengaduan")}
                        titleStyle={{fontSize:25}}
                        buttonStyle={{backgroundColor:'#e52d27',height:120,marginTop:20}}
                        icon={
                            <Icon
                                name="fire"
                                size={25}
                                color="white"
                                type="font-awesome-5"
                            />
                        }
                        iconRight
                        title="About "
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
