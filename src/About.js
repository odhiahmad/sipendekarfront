import {StatusBar, Text, View} from "react-native";
import React, {Component} from "react";
import {Header, Icon,PricingCard } from 'react-native-elements';
import Ripple from "react-native-material-ripple";


export default class About extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0.4)"/>
                <Header
                    containerStyle={{
                        height:80
                    }}
                    backgroundColor='gray'
                    leftComponent={
                        <Ripple onPress={() => {
                            this.props.navigation.pop()
                        }}>
                            <Icon type='ionicon' name='arrow-back-outline' color='#fff'
                            /></Ripple>}

                    centerComponent={{text: 'About', style: {color: '#fff',fontWeight:'bold'}}}
                />
                <PricingCard
                    color="gray"
                    title="Aplikasi SIPENDEKAR"
                    info={['Aplikasi SISTEM Pelaporan Kebakaran ini dibuat untuk melaporkan dan melihat informasi Kebakaran']}
                    button={{ title: ' Lihat Website Aplikasi SIPENDEKAR ', icon: 'flight-takeoff' }}
                />
            </View>
        );
    }


}
