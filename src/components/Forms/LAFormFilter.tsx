import React, { useState, useEffect, FC, useContext } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { ScreenBackgroundWithModal } from '../ScreenBackground/ScreenBackgroundWithModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LAButton } from '../Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslate } from 'src/i18n/useTranslate';
import { styles } from './Form.styles';
import moment from 'moment';
import { FilterContext } from 'src/contexts/Filter';

interface laFormFilterProps {
    onClose: () => void;
    visible: boolean;
}

export const LAFormFilter: FC<laFormFilterProps> = ({ onClose, visible }) => {
    const { t } = useTranslate();
    const [period,setPeriod] = useState('');
    const [waybill, setWaybill] = useState('');
    const [client, setClient] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const filter = useContext(FilterContext);

    
    const dateObj=new Date();
    const currentDate=moment(dateObj).format("YYYY-MM");
    const previousDate =moment(dateObj.setMonth(dateObj.getMonth()-1)).format("YYYY-MM");
    const periodData = [
        { period: "", title: t('filter_form.all') },
        { period: currentDate, title: t('filter_form.this_month') },
        { period: previousDate, title: t('filter_form.last_month') },
    ];


    const onHandleFilter = () =>{
        filter.searchData({client:client,period: period,waybill:waybill});
        onClose();
    }

    const onHandleClear = () =>{
        
        setClient('');
        setPeriod('');
        setWaybill('');
        setSelectedIndex(0);
        filter.searchData({client:'',period: '',waybill:''});
    }


    return (
        <ScreenBackgroundWithModal
            screenTitle={t('filter_form.filter')}
            onClose={onClose}
            visible={visible}>
            <KeyboardAwareScrollView>
                <View
                    style={{
                        marginBottom: 300,
                        paddingBottom: 100,
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        padding: 20,
                        marginTop: 15,
                    }}>
                    <View
                        style={{
                            marginBottom: 15,
                        }}>
                        <Text
                            style={{
                                fontWeight: '900',
                                color: COLORS.darkGreen,
                                marginBottom: 10,
                                fontSize: 20,
                            }}>
                            {t('filter_form.period')}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            {periodData.map((e, i) => {
                                return (
                                    <LAButton
                                        key={e.title}
                                        onPress={() => {
                                            setSelectedIndex(i);
                                            setPeriod(e.period);
                                        }}
                                        title={e.title}
                                        buttonColor={
                                            selectedIndex === i
                                                ? COLORS.lightGreen
                                                : COLORS.white
                                        }
                                        buttonTitleWeight="700"
                                        borderColor={COLORS.darkGreen}
                                        borderThickness={1}
                                        fontColor={COLORS.darkGreen}
                                        style={{ borderRadius: 20,flex:1 }}
                                    />
                                );
                            })}
                        </View>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text
                            style={{
                                fontWeight: '900',
                                color: COLORS.darkGreen,
                                marginBottom: 10,
                                fontSize: 20,
                            }}>
                            {t('filter_form.waybill_number')}
                        </Text>
                        <TextInput
                            placeholder={t('filter_form.waybill_placeholder')}
                            style={{
                                borderColor: COLORS.darkGreen,
                                borderWidth: 1,
                                borderRadius: 7,
                                padding: 10,
                            }}
                            inputMode="numeric"
                            onChangeText={text => setWaybill(text)}
                            value={waybill}
                        />
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text
                            style={{
                                fontWeight: '900',
                                color: COLORS.darkGreen,
                                marginBottom: 10,
                                fontSize: 20,
                            }}>
                            {t('filter_form.client')}
                        </Text>
                        <TextInput
                            placeholder={t('filter_form.client_placeholder')}
                            style={{
                                borderColor: COLORS.darkGreen,
                                borderWidth: 1,
                                borderRadius: 7,
                                padding: 10,
                            }}
                            onChangeText={text => setClient(text)}
                            value={client}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent:'center',
                            paddingHorizontal: 20,
                            marginTop: 15,
                        }}>
                        <LAButton
                            onPress={onHandleClear}
                            title={t('filter_form.clear')}
                            buttonColor={COLORS.white}
                            buttonTitleWeight="700"
                            borderColor={COLORS.darkGreen}
                            borderThickness={1}
                            fontColor={COLORS.darkGreen}
                            style={{ borderRadius: 15, paddingHorizontal: 30 }}
                        />
                        <LAButton
                            onPress={onHandleFilter}
                            title={t('filter_form.filter')}
                            buttonColor={COLORS.white}
                            buttonTitleWeight="700"
                            borderColor={COLORS.darkGreen}
                            borderThickness={1}
                            fontColor={COLORS.darkGreen}
                            style={{ borderRadius: 15, paddingHorizontal: 30 }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScreenBackgroundWithModal>
    );
};
