import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Alert
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

export const HomeScreen = () => {
    const { t, i18n } = useTranslate();

    const navigation = useNavigation<any>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPlantId, setSelectedPlantId] = useState('');
    const { signOut, deleteAccount } = useAuth();

    const { data, isSuccess, isLoading } = usePlants();
    const orderCounts = useOrdersCount(selectedPlantId);
    const filter = useContext(FilterContext);

    const load = async () => {
        const result = await loadString('plantId');
        const language = await loadString('language');

        if (language && i18n.language !== language) {
                await i18n.changeLanguage(language);
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
        if(data){
        if(data?.plant===undefined){
         signOut();
        }
        }
      }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={HomeBackgroundImage}
                resizeMode="stretch"
                style={styles.image}>
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
                                            await saveString(
                                                'plantId',
                                                e.id.toString(),
                                            );
                                            await saveString(
                                                'selectedIndex',
                                                i.toString(),
                                            );
                                            await saveString(
                                                'plantName',
                                                e.name.toString(),
                                            );
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
                    {orderCounts.isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                    {orderCounts.isSuccess && (
                        <LAMenuButton
                            disabled={
                                orderCounts.data?.order_history_count <= 0
                            }
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
                    {orderCounts.isLoading && (
                        <ActivityIndicator size="large" />
                    )}
                    {orderCounts.isSuccess && (
                        <LAMenuButton
                            disabled={
                                orderCounts.data?.ongoing_orders_count <= 0
                            }
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

  {/* LOGOUT */}
  <LAButton
    onPress={async () => {
      await signOut();
    }}
    fontColor={COLORS.darkGreen}
    buttonColor={COLORS.lightGreen}
    title={t('sign_in.sign_out')}
    titleSize={FONT_SIZES.small}
  />

 <View style={{ marginTop: 12 }}>
   <LAButton
     onPress={() => {
       Alert.alert(
         t('sign_in.delete_account_title'),
         t('sign_in.delete_account_message'),
         [
           { text: t('sign_in.cancel'), style: 'cancel' },
           {
             text: t('sign_in.delete'),
             style: 'destructive',
             onPress: async () => {
               await deleteAccount();
             },
           },
         ],
       );
     }}
     title={t('sign_in.delete_account')}
     titleSize={FONT_SIZES.small}

     buttonColor="#FFFFFF"

     style={{
       borderWidth: 1,
       borderColor: '#E53935',
       backgroundColor: '#E53935',
     }}

     titleStyle={{
       color: '#ffffff',
       fontWeight: '600',
     }}
   />
 </View>

</View>

            </ImageBackground>
        </SafeAreaView>
    );
};
