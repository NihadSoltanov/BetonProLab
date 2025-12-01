import React, { useState, FC, useEffect } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Text,
    LayoutChangeEvent,
    TouchableOpacity,
    Modal,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { SlumpIcon, StrengthIcon } from 'src/themes/icons';
import styles from './OrderCard.styles';
import { COLORS } from 'src/themes/colors';
import { Icon } from '../Icon';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { OrderDto } from 'src/domain/models/Order';
import { getWayBillBaseUrl, truncateText } from 'src/utils/stringUtils';
import { ScrollView } from 'react-native-gesture-handler';
import { LAFormSlumpTest } from '../Forms/LAFormSlumpTest';
import { LAFormFreeze } from '../Forms/LAFormFreeze';
import { LAFormStrength } from '../Forms/LAFormStrength';
import { WebView } from 'react-native-webview';
import { LAFormStrengthOngoing } from '../Forms/LAFormStrengthOngoing';
import { useTranslate } from 'src/i18n/useTranslate';
import { loadString } from 'src/utils/appStorage';

export interface OrderCardProps extends OrderDto {
    leftButtonText: string;
    middleButtonText?: string;
    rightButtonText: string;
    newLength: number;
    order: OrderDto;
    plantId: string;
    isOngoingOrder: boolean;
}

export const OrderCard: FC<OrderCardProps> = props => {
    const handleWebButton = async (
        plantId: string,
        orderId: string,
        deliveryId: string,
    ) => {
        const baseUrl = await getWayBillBaseUrl();
        const url = baseUrl + plantId + '_' + orderId + '_X_' + deliveryId;
        setSiteUrl(url);
        setWebViewVisible(true);
    };
    const { t } = useTranslate();
    const [siteUrl, setSiteUrl] = useState('');
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [plantName, setPlantName] = useState<string>('');
    const [showSlumpModal, setShowSlumpModal] = useState(false);
    const onCloseSlump = () => setShowSlumpModal(!showSlumpModal);

    const [showFreezeModal, setShowFreezeModal] = useState(false);
    const onCloseFreeze = () => setShowFreezeModal(!showFreezeModal);

    const [showStrengthModal, setShowStrengthModal] = useState(false);
    const onCloseStrength = () => setShowStrengthModal(!showStrengthModal);


    const [selectedFreezeIndex, setSelectedFreezeIndex] = useState(0);
    const [selectedSlumpIndex, setSelectedSlumpIndex] = useState(0);
    const [selectedStrengthIndex, setSelectedStrengthIndex] = useState(0);


    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const onLayoutHeight = event.nativeEvent.layout.height;
        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

        return {
            height: animatedHeight.value,
        };
    }, [expanded, height]);

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    const load = async () => {
        const loadPlant = await loadString('plantName');
        setPlantName(loadPlant ?? '');
    };

    useEffect(() => {
        load();
    }, []);
    return (
        <View style={styles.wrap}>
            <TouchableWithoutFeedback onPress={onItemPress}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.orderDate}>
                                {props?.customer?.substring(0, 33)}
                            </Text>
                            <View style={styles.orderDetailsContainer}>
                                <Text style={styles.orderId}>
                                    #{props?.order_id}
                                </Text>
                                <Text style={styles.orderAddressText}>
                                    {truncateText(
                                        props?.delivery_address,
                                        20,
                                        props?.newLength,
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.priceText}>
                        {parseFloat(props?.amount?.toString()).toFixed(1)}/m3
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            {expanded && (
                <Animated.View
                    style={[animatedStyle, styles.animationContainer]}>
                    <View style={styles.detailsContainer} onLayout={onLayout}>
                        <View style={styles.detailsTitle}>
                            <Text style={styles.detailsTitleText}>
                                {t('product')}
                            </Text>
                            <Text style={styles.detailsText}>
                                {props?.product}
                            </Text>
                        </View>

                        <View style={styles.detailsTitle}>
                            <Text style={styles.detailsTitleText}>
                                {t('date')}
                            </Text>
                            <Text style={styles.detailsText}>
                                {props?.delivery_data}
                            </Text>
                        </View>

                        <View style={styles.detailsTitle}>
                            <Text style={styles.detailsTitleText}>
                                {t('plant')}
                            </Text>
                            <Text style={styles.detailsText}>{plantName}</Text>
                        </View>
                        <View style={styles.detailsTitle}>
                            <Text style={styles.detailsTitleText}>
                                {t('interval')}
                            </Text>
                            <Text style={styles.detailsText}>
                                {props?.delivery_interval}
                            </Text>
                        </View>
                        <View style={styles.horizontalLine} />
                        <ScrollView style={{ flex: 1 }}>
                            {props?.delivery?.map((e, i) => {
                                return (
                                    <View key={i}>
                                        <Modal
                                            visible={webViewVisible}
                                            presentationStyle="pageSheet"
                                            animationType="slide"
                                            onRequestClose={() =>
                                                setWebViewVisible(false)
                                            }>
                                            <View
                                                style={
                                                    styles.closeBtnContainer
                                                }>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setWebViewVisible(false)
                                                    }
                                                    style={styles.closebtn}>
                                                    <Ionicons
                                                        size={30}
                                                        name="close"
                                                        style={{
                                                            color: COLORS.darkGreen,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <WebView
                                                source={{ uri: siteUrl }}
                                                style={{
                                                    flex: 1,
                                                }}
                                            />
                                        </Modal>
                                        { (selectedSlumpIndex===i) &&
                                        <LAFormSlumpTest
                                            visible={showSlumpModal}
                                            onClose={onCloseSlump}
                                            isSelected={selectedSlumpIndex===i}
                                            plantId={props.plantId}
                                            deliveryId={e.delivery_id}
                                        />
                                         }
                                         { (selectedFreezeIndex===i) &&
                                        <LAFormFreeze
                                            visible={showFreezeModal}
                                            onClose={onCloseFreeze}
                                            plantId={props.plantId}
                                            deliveryId={e.delivery_id}
                                            isSelected={selectedFreezeIndex===i}
                                        />
                                        }
                                        {props.isOngoingOrder ? (
                                              (selectedStrengthIndex===i) &&
                                            <LAFormStrengthOngoing
                                                visible={showStrengthModal}
                                                onClose={onCloseStrength}
                                                plantId={props.plantId}
                                                deliveryId={e.delivery_id}
                                                isSelected={selectedStrengthIndex===i}
                                            />
                                        ) : (
                                            (selectedStrengthIndex===i) &&
                                            <LAFormStrength
                                                visible={showStrengthModal}
                                                onClose={onCloseStrength}
                                                isSelected={selectedStrengthIndex===i}
                                                plantId={props.plantId}
                                                deliveryId={e.delivery_id}
                                            />
                                        )}
                                        <View style={styles.webViewContainer}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleWebButton(
                                                        props.plantId,
                                                        props.order_id,
                                                        e.delivery_id,
                                                    )
                                                }
                                                style={{ flex: 1 }}>
                                                <Ionicons
                                                    name="list-outline"
                                                    size={40}
                                                    iconTint={COLORS.darkGreen}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.buttonsRow}>
                                                <TouchableOpacity
                                                    style={{
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onPress={() =>{
                                                        setShowSlumpModal(!showSlumpModal);
                                                        setSelectedSlumpIndex(i);
                                                    }
                                                        
                                                    }>
                                                    <Icon
                                                        name={SlumpIcon}
                                                        size={40}
                                                        iconTint={
                                                            COLORS.darkGreen
                                                        }
                                                    />

                                                    <Text
                                                        style={styles.iconText}>
                                                        {props.leftButtonText}
                                                    </Text>
                                                </TouchableOpacity>
                                                {props.middleButtonText && (
                                                    <TouchableOpacity
                                                        onPress={() =>{
                                                            setShowFreezeModal(
                                                                !showFreezeModal,
                                                            );
                                                            setSelectedFreezeIndex(i);
                                                        }
                                                        }>
                                                        <Ionicons
                                                            size={40}
                                                            name="snow"
                                                            style={{
                                                                color: COLORS.darkGreen,
                                                                alignSelf:
                                                                    'center',
                                                            }}
                                                        />

                                                        <Text
                                                            style={
                                                                styles.iconText
                                                            }>
                                                            {
                                                                props.middleButtonText
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}

                                                <TouchableOpacity
                                                    onPress={() =>{
                                                        setShowStrengthModal(
                                                            !showStrengthModal,
                                                        );
                                                        setSelectedStrengthIndex(i);
                                                    }
                                                    }>
                                                    <Icon
                                                        size={40}
                                                        name={StrengthIcon}
                                                        iconTint={
                                                            COLORS.darkGreen
                                                        }
                                                    />

                                                    <Text
                                                        style={styles.iconText}>
                                                        {props.rightButtonText}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={styles.licenseContainer}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                }}>
                                                <Text
                                                    style={
                                                        styles.bottomTextLabel
                                                    }>
                                                    {t('license_plate')}:{' '}
                                                </Text>
                                                <Text style={{ marginTop: 2 }}>
                                                    {' '}
                                                    {e.car_plate}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                }}>
                                                <Text
                                                    style={
                                                        styles.bottomTextLabel
                                                    }>
                                                    {t('amount')}:{' '}
                                                </Text>
                                                <Text style={{ marginTop: 2 }}>
                                                    {' '}
                                                    {e.amount}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.invoice}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                }}>
                                                <Text
                                                    style={
                                                        styles.bottomTextLabel
                                                    }>
                                                    {t('invoice')}:{' '}
                                                </Text>
                                                <Text style={{ marginTop: 2 }}>
                                                    {' '}
                                                    {e.invoice}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                }}>
                                                <Text
                                                    style={
                                                        styles.bottomTextLabel
                                                    }>
                                                    {t('time')}:{' '}
                                                </Text>
                                                <Text style={{ marginTop: 2 }}>
                                                    {' '}
                                                    {e.produced_time}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.horizontalLine} />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};
