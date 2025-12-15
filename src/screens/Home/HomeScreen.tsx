import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { LAButton } from 'src/components/Button/LAButton';
import { LAMenuButton } from 'src/components/Button/LAMenuButton';
import { HomeBackgroundImage, LogoImage } from 'src/themes/images';
import { useNavigation } from '@react-navigation/native';
import { HistoryIcon, LocationIcon, ArrowRightIcon } from 'src/themes/icons';
import styles from './HomeScreen.styles';
import loginStyles from '../Login/LoginScreen.styles';
import { FONT_SIZES } from 'src/themes/fonts';
import { ButtonGroup } from './ButtonGroup';
import { COLORS } from 'src/themes/colors';
import { usePlants } from 'src/data/querys/plantQueries';
import { useTranslate } from 'src/i18n/useTranslate';
import {
    useOngoingOrders,
    useOrdersCount,
    useOrdersHistory,
} from 'src/data/querys/orderQueries';
import { loadString, saveString } from 'src/utils/appStorage';
import { FilterContext } from 'src/contexts/Filter';
import { useAuth } from 'src/contexts/Auth';
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { axios } from "src/api/axios-lib";
import { clear } from "src/utils/appStorage";

export const HomeScreen = () => {
    const { t, i18n } = useTranslate();
    const navigation = useNavigation<any>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPlantId, setSelectedPlantId] = useState('');
    const { signOut } = useAuth();
    const { data, isSuccess, isLoading } = usePlants();
    const orderCounts = useOrdersCount(selectedPlantId);
    const filter = useContext(FilterContext);

    const load = async () => {
        const result = await loadString('plantId');
        const language = await loadString('language');

        if (language) {
            i18n.changeLanguage(language);
        } else {
            i18n.changeLanguage('en');
        }

        if (result) {
            setSelectedPlantId(result);
        } else if (data?.plant?.length) {
            const firstPlantId = data.plant[0].id.toString();
            setSelectedPlantId(firstPlantId);
            await saveString('plantId', firstPlantId);
        }

        const index = await loadString('selectedIndex');
        if (index) {
            setSelectedIndex(parseInt(index));
        } else {
            setSelectedIndex(0);
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (data) {
            if (data?.plant === undefined) {
                signOut();
            }
        }
    }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={HomeBackgroundImage}
                resizeMode="stretch"
                style={styles.image}
            >
                <Image source={LogoImage} style={styles.logo} />

                <View style={styles.allBtnsContainer}>
                    <Text style={styles.headerTitle}>{t('plants')}</Text>

                    <ScrollView horizontal={true} style={{ marginBottom: 30 }}>
                        {isLoading && <ActivityIndicator size="large" />}
                        {isSuccess &&
                            data?.plant
                                ?.filter(p => p?.id && p?.name)
                                .map((e, i) => {

                                    console.log("✅ PLANT FROM API:", e);
                                    return (
                                        <ButtonGroup
                                            key={e.id}
                                            title={e.name}
                                            selectedIndex={selectedIndex}
                                            selectedbuttonStyle={{
                                                backgroundColor: COLORS.lightGreen,
                                            }}
                                            isSelected={selectedIndex === i}
                                            onPress={async value => {
                                                setSelectedIndex(i);
                                                setSelectedPlantId(e.id.toString());
                                                await saveString('plantId', e.id.toString());
                                                await saveString('selectedIndex', i.toString());
                                                await saveString('plantName', e.name.toString());
                                                filter.searchData({
                                                    client: '',
                                                    period: '',
                                                    waybill: '',
                                                });
                                            }}
                                        />
                                    );
                                })}
                    </ScrollView>

                    {orderCounts.isLoading && <ActivityIndicator size="large" />}

                    {orderCounts.isSuccess && (
                        <LAMenuButton
                            disabled={orderCounts.data?.order_history_count <= 0}
                            onPress={() =>
                                navigation.navigate('OrderHistory', {
                                    plant_id: selectedPlantId,
                                })
                            }
                            title={t('ORDER_HISTORY')}
                            subTitle={
                                orderCounts.data?.order_history_count +
                                ' ' +
                                t('order')
                            }
                            leftIcon={HistoryIcon}
                            leftImageStyle={styles.historyImage}
                            style={styles.orderHistoryButtonStyle}
                            rightIcon={ArrowRightIcon}
                            rightImageStyle={styles.rightImage}
                            titleStyle={styles.historyTitle}
                            subTitleStyle={styles.subTitle}
                        />
                    )}

                    {orderCounts.isLoading && <ActivityIndicator size="large" />}

                    {orderCounts.isSuccess && (
                        <LAMenuButton
                            disabled={orderCounts.data?.ongoing_orders_count <= 0}
                            onPress={() =>
                                navigation.navigate('OngoingOrder', {
                                    plant_id: selectedPlantId,
                                })
                            }
                            title={t('ORDER_TRACKING')}
                            subTitle={
                                orderCounts.data?.ongoing_orders_count +
                                ' ' +
                                t('ongoing_orders')
                            }
                            leftIcon={LocationIcon}
                            leftImageStyle={styles.trackingImage}
                            style={styles.orderTrackingButtonStyle}
                            rightIcon={ArrowRightIcon}
                            rightImageStyle={styles.rightImage}
                            titleStyle={styles.historyTitle}
                            subTitleStyle={styles.subTitle}
                        />
                    )}
                </View>

                <View style={loginStyles.btnWrapper}>
                    <LAButton
                        onPress={async () => {
                            await signOut();
                        }}
                        fontColor={COLORS.darkGreen}
                        buttonColor={COLORS.lightGreen}
                        title={t('sign_in.sign_out')}
                        titleSize={FONT_SIZES.small}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                t("sign_in.delete_account_confirm_title"),
                                t("sign_in.delete_account_confirm_msg"),
                                [
                                    { text: t("sign_in.cancel"), style: "cancel" },
                                    {
                                        text: t("sign_in.delete"),
                                        style: "destructive",
                                        onPress: async () => {
                                            const user_id = await loadString("user_id");

                                            if (!user_id) {
                                                Alert.alert(
                                                    t("sign_in.delete_error"),
                                                    t("sign_in.user_id_missing")
                                                );
                                                return;
                                            }

                                            try {
                                                const res = await axios.get("deactivateUser", {
                                                    params: { user_id },
                                                });

                                                if (res.data?.success) {
                                                    Alert.alert(t("sign_in.account_deleted"));
                                                    await clear();
                                                    signOut();
                                                } else {
                                                    Alert.alert(t("sign_in.delete_error"));
                                                }
                                            } catch (err) {
                                                Alert.alert(t("sign_in.server_error"));
                                            }
                                        },
                                    },
                                ]
                            );
                        }}
                        style={{
                            backgroundColor: "red",
                            padding: 12,
                            borderRadius: 10,
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: FONT_SIZES.small }}>
                            {t("sign_in.delete_account")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
