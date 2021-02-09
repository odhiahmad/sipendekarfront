import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {Component} from "react";
import {Avatar, Header, Icon, ListItem} from 'react-native-elements';
import Ripple from "react-native-material-ripple";
import LoaderModal from "./components/LoaderModal";
import {baseApi} from "./services/api";



export default class PetaUmum extends Component {
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

    componentDidMount() {
        this.getIndex();
    }

    getIndex() {
        this.setState({
            loading: true,
            showTryAgain: false,
        });
        return fetch(baseApi + '/potensi-kecelakaan/latlng').then((response) => response.json()).then((responseJson) => {
            this.setState({
                loading: false,
                data: responseJson.results,
                showTryAgain: false,
            });

            console.log(this.state.data)

        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                showTryAgain: true,
            });
        });
    }

    setModalUnvisible(visible) {
        this.setState({modalVisible: visible, dataDetail: []});
    }

    setModalVisible(visible, item) {

        this.setState({
            dataDetail: item,
            modalVisible: visible,
        });


    }

    renderRow = ({item, index}) => {
        return (
            <ListItem
                onPress={() => {
                    this.setModalVisible(true, item);
                }}

                key={index} bottomDivider>
                <Avatar rounded={true} avatarStyle={{width: 80, height: 80}} source={{uri: item.picture}}/>
                <ListItem.Content>
                    {/*<ListItem.Title>{item.sumber_data}</ListItem.Title>*/}
                    <ListItem.Subtitle style={{fontSize: 17}}>{item.sumber_data}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    };


    handleLoadMore = () => {

        if (this.state.searchAktif === 0) {
            this.setState(
                {page: this.state.page + 1, isLoading: true},
                this.getData,
            );
        }

    };

    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large"/>
                </View> : null
        );
    };

    // _onChangeSearchText(text) {
    //
    //
    //     if (text === '') {
    //         this.setState({
    //             searchAktif: 0,
    //         });
    //     } else {
    //         this.setState(
    //             {page: 1, searchAktif: 1, isLoading: false, searchText: text},
    //             this.searchData,
    //         );
    //     }
    //
    // }

    render() {
        return (
            <View style={{flex: 1}}>
                <LoaderModal
                    loading={this.state.loading}/>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0.4)"/>
                <Header
                    backgroundColor='#e52d27'
                    leftComponent={
                        <Ripple onPress={() => this.props.navigation.pop()}>
                            <Icon type='ionicon' name='arrow-back-outline' color='#fff'
                            /></Ripple>}
                    statusBarProps={{barStyle: 'light-content'}}
                    barStyle="light-content"
                    placement="center"
                    centerComponent={{text: 'Peta Umum', style: {color: '#fff', fontWeight: 'bold'}}}
                />
                {/*<SearchBar*/}
                {/*    placeholder="Type Here..."*/}
                {/*    onChangeText={this._onChangeSearchText.bind(this)}*/}
                {/*    value={search}*/}
                {/*/>*/}
                {this.state.showTryAgain === true ?
                    <View style={styles.container}>
                        <Text style={{color: 'gray'}}>Koneksi Bermasalah :(</Text>
                        <TouchableOpacity style={{
                            width: 200,
                            backgroundColor: 'red',
                            borderRadius: 25,
                            marginVertical: 2,
                            paddingVertical: 13,
                        }} onPress={() => this.getIndex()}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: '#ffffff',
                                textAlign: 'center',
                            }}>Refresh </Text>
                        </TouchableOpacity></View> : <FlatList
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={this.renderFooter}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.data}/>}
                <Modal
                    onHardwareBackPress={() => this.setModalUnvisible(!this.state.modalVisible)}
                    propagateSwipe={true}
                    modalTitle="Tes"
                    animationInTiming="300"
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalUnvisible(!this.state.modalVisible);
                    }}>
                    <Header
                        containerStyle={{height: 60}}
                        backgroundColor='#e52d27'
                        rightComponent={
                            <Ripple onPress={() => this.setModalUnvisible(!this.state.modalVisible)}>
                                <Icon type='font-awesome-5' size={25} name='times-circle' color='#fff'
                                /></Ripple>}

                        placement="center"
                        centerComponent={
                            {text: 'Detail', style: {fontSize: 18, color: '#fff'}}
                        }
                    />
                    <View style={{flex: 1}}>
                        <Image source={{uri: this.state.dataDetail.picture}} style={{
                            width: Dimensions.get('window').width,
                            height: 200,
                            marginTop: 20,
                            marginBottom: 10
                        }}/>
                        {/*<MapView*/}
                        {/*    style={{width:Dimensions.get('window').width,height:200}}*/}
                        {/*    initialRegion={{*/}
                        {/*        latitude: this.state.dataDetail.lat,*/}
                        {/*        longitude: this.state.dataDetail.lng,*/}
                        {/*        latitudeDelta: 0,*/}
                        {/*        longitudeDelta: 0,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <View style={{flex:1,marginHorizontal: 20}}>


                        </View>
                    </View>

                </Modal>
            </View>
        );
    }


}


const styles = StyleSheet.create({
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
    loader: {
        marginTop: 18,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 63,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 10,
    },
});
