import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Modal,
} from 'react-native';
import React, { ReactNode, FC, useState, useContext } from 'react';
import styles from './ScreenBackground.styles';
import { StairsBgImage, RectangleBgImage, LogoImage } from 'src/themes/images';
import { COLORS } from 'src/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LAFormFilter } from '../Forms/LAFormFilter';
import { FilterContext } from 'src/contexts/Filter';
import { useTranslate } from 'src/i18n/useTranslate';

export interface ScreenBackgroundProps {
    children: ReactNode;
    screenTitle: string;
    isVisible:boolean;
}

export const ScreenBackground: FC<ScreenBackgroundProps> = ({
    children,
    screenTitle,
    isVisible
}) => {
    const { t } = useTranslate();
    const filter = useContext(FilterContext);
    const navigation = useNavigation<any>();
    const [showFilter, setShowFilter] = useState(false);
    const onCloseFilter = () => setShowFilter(!showFilter);
    const onHandleRefresh = ()=>  filter.searchData({client:'',period: '',waybill:''});
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={StairsBgImage}
                style={styles.backgroundImageContainer}>
                <ImageBackground
                    source={RectangleBgImage}
                    style={styles.headerImage}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => navigation.goBack()}>
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
                        <TouchableOpacity style={styles.headerButton}
                        onPress={onHandleRefresh}>
                        <Ionicons
                            name="refresh"
                            size={24}
                            color={COLORS.white}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sortRow}>
                        <Text style={styles.screenTitle}>{screenTitle}</Text>
                        {
                            isVisible &&(
                        <TouchableOpacity
                            style={styles.filterContainer}
                            onPress={onCloseFilter}>
                            <Ionicons
                                name="options-outline"
                                size={20}
                                color={COLORS.white}
                            />
                            <Text style={styles.filterText}>{t('filter_form.filter')}</Text>
                        </TouchableOpacity>
                            )
                        }
                    </View>
                    <LAFormFilter
                        visible={showFilter}
                        onClose={onCloseFilter}
                    />
                    <View style={styles.listContainer}>{children}</View>
                </ImageBackground>
            </ImageBackground>
        </SafeAreaView>
    );
};
