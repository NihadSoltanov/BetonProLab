import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
} from 'react-native';
import React, { ReactNode, FC, useState } from 'react';
import styles from './ScreenBackground.styles';
import { StairsBgImage, RectangleBgImage, LogoImage } from 'src/themes/images';
import { COLORS } from 'src/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export interface ScreenBackgroundProps {
    children: ReactNode;
    screenTitle: string;
    onClose: () => void;
    visible:boolean;
}

export const ScreenBackgroundWithModal: FC<ScreenBackgroundProps> = ({
    children,
    screenTitle,
    visible,
    onClose
}) => {

    return (
        <SafeAreaView style={{flex:1}}>
       <Modal visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}>
        <ImageBackground
            source={StairsBgImage}
            style={styles.backgroundImageContainer}>
            <ImageBackground
                source={RectangleBgImage}
                style={styles.headerImage}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={onClose}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                    <Image
                        source={LogoImage}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="grid" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.sortRow}>
                    <Text style={styles.screenTitle}>{screenTitle}</Text>
                </View>
                <View style={styles.listContainer}>
                    {children}</View>
            </ImageBackground>
        </ImageBackground>
     </Modal>
        </SafeAreaView>
    );
};
