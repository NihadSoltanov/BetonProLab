import { FC, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    TextInput,
    View,
    Pressable,
} from 'react-native';
import { styles } from './Form.styles';
import { InputContainer } from '../InputContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenBackgroundWithModal } from '../ScreenBackground/ScreenBackgroundWithModal';
import { LAButton } from '../Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { OrderDto } from 'src/domain/models/Order';
import { getOrder, getOrderTranspLab } from 'src/data/querys/orderQueries';
import { loadString } from 'src/utils/appStorage';
import { Delivery } from 'src/domain/models/Delivery';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDateToString } from 'src/utils/convertToTime';
import { useTranslate } from 'src/i18n/useTranslate';
import moment from 'moment';
import { updateOrderTranspLab } from 'src/data/mutations/orderMutations';
import { OrderTransLab } from 'src/domain/models/OrderTransLab';
import { queryClient } from 'src/api/react-query-lib';

interface laFormSlumpProps {
    onClose: () => void;
    visible: boolean;
    plantId: string;
    deliveryId: string;
    isSelected?:boolean;
}

export const LAFormSlumpTest: FC<laFormSlumpProps> = ({
    visible,
    onClose,
    isSelected,
    plantId,
    deliveryId
}) => {
    const { t } = useTranslate();
    const [plantTime, setPlantTime] = useState('');
    const [siteTime, setSiteTime] = useState('');
    const [plantSlump, setPlantSlump] = useState('0');
    const [siteSlump, setSiteSlump] = useState('0');
    const [plantTemperature, setPlantTemperature] = useState('0.0');
    const [siteTemperature, setSiteTemperature] = useState('0.0');
    const [plantAir, setPlantAir] = useState('0.0');
    const [siteAir, setSiteAir] = useState('0.0');
    const [plantTestedBy, setPlantTestedBy] = useState('');
    const [siteTestedBy, setSiteTestedBy] = useState('');
    const [comments, setComments] = useState('');

    const [showPlantTime, setShowPlantTime] = useState(false);
    const [showSiteTime, setShowSiteTime] = useState(false);

    const timePicker = (pickerName: string) => {
        if (pickerName === 'plant') setShowPlantTime(!showPlantTime);
        if (pickerName === 'site') setShowSiteTime(!showSiteTime);
    };

    const getTransLabs = async () => {
        const lab = await getOrderTranspLab(plantId, deliveryId);
        if (lab) {
            setPlantTime(lab.slump_time_on_plant!);
            setSiteTime(lab.slump_time_on_client_side!);
            setPlantSlump(lab.slump_on_plant!);
            setSiteSlump(lab.slump_on_client_side!);
            setPlantTemperature(lab.temperature!);
            setSiteTemperature(lab.temperature2!);
            setPlantAir(lab.air_intake!);
            setSiteAir(lab.air_intake2!);
            setPlantTestedBy(lab.slump_person!);
            setSiteTestedBy(lab.slump_person2!);
            setComments(lab.comment!);
        }
    };
    useEffect(() => {
        if (isSelected && visible) {
            getTransLabs();
        }
    }, [isSelected,visible]);

    const onHandleUpdate = async () => {
        const delivery: OrderTransLab = {
            delivery_id: deliveryId,
            plant_id: plantId,
            slump_time_on_plant: plantTime,
            slump_time_on_client_side: siteTime,
            slump_on_plant: plantSlump,
            slump_on_client_side: siteSlump,
            temperature: plantTemperature,
            temperature2: siteTemperature,
            air_intake: plantAir,
            air_intake2: siteAir,
            slump_person: plantTestedBy,
            slump_person2: siteTestedBy,
            comment: comments,
        };

      await updateOrderTranspLab(
            delivery,
            plantId,
            deliveryId,
        );
        onClose();
    };

    const resetModal =() =>{
        setPlantTime('');
        setSiteTime('');
        setPlantSlump('0');
        setSiteSlump('0');
        setPlantTemperature('0.0');
        setSiteTemperature('0.0');
        setPlantAir('0.0');
        setSiteAir('0.0');
        setPlantTestedBy('');
        setSiteTestedBy('');
        setComments('');
        onClose();
    }


    return (
        <ScreenBackgroundWithModal
            screenTitle={t('slump_form.slump_test')}
            visible={visible}
            onClose={resetModal}>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>{t('plant')}</Text>
                <Text style={styles.headerText}>{t('site')}</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={{ marginBottom: 300, paddingBottom: 100 }}>
                    <InputContainer title={t('slump_form.time')}>
                        <Pressable
                            onPress={() => timePicker('plant')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {plantTime}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showPlantTime}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                setPlantTime(moment(date).format('HH:mm'));
                                timePicker('plant');
                            }}
                            onCancel={() => timePicker('plant')}
                        />
                        <Pressable
                            onPress={() => timePicker('site')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>{siteTime}</Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showSiteTime}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                setSiteTime(moment(date).format('HH:mm'));
                                timePicker('site');
                            }}
                            onCancel={() => timePicker('site')}
                        />
                    </InputContainer>

                    <InputContainer title={t('slump_form.slump')}>
                        <TextInput
                            placeholder={plantSlump}
                            onChangeText={slump => setPlantSlump(slump)}
                            value={plantSlump}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={siteSlump}
                            onChangeText={slump => setSiteSlump(slump)}
                            value={siteSlump}
                            style={styles.input}
                            inputMode="numeric"
                            textAlign='right'
                        />
                    </InputContainer>

                    <InputContainer title={t('slump_form.temperature')}>
                        <TextInput
                            placeholder={plantTemperature}
                            onChangeText={temperature =>
                                setPlantTemperature(temperature)
                            }
                            value={plantTemperature}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={siteTemperature}
                            onChangeText={temperature =>
                                setSiteTemperature(temperature)
                            }
                            value={siteTemperature}
                            style={styles.input}
                            inputMode="numeric"
                            textAlign='right'
                        />
                    </InputContainer>

                    <InputContainer title={t('slump_form.air')}>
                        <TextInput
                            placeholder={plantAir}
                            onChangeText={air => setPlantAir(air)}
                            value={plantAir}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={siteAir}
                            onChangeText={air => setSiteAir(air)}
                            value={siteAir}
                            style={styles.input}
                            inputMode="numeric"
                            textAlign='right'
                        />
                    </InputContainer>

                    <InputContainer title={t('slump_form.tested_by')}>
                        <TextInput
                            placeholder={plantTestedBy}
                            onChangeText={testedBy =>
                                setPlantTestedBy(testedBy)
                            }
                            value={plantTestedBy}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder={siteTestedBy}
                            onChangeText={testedBy => setSiteTestedBy(testedBy)}
                            value={siteTestedBy}
                            style={styles.input}
                            textAlign='right'
                        />
                    </InputContainer>

                    <InputContainer title={t('comments')}>
                        <TextInput
                            placeholder={comments}
                            onChangeText={text => setComments(text)}
                            value={comments}
                            style={styles.input}
                        />
                    </InputContainer>
                    <LAButton
                        onPress={onHandleUpdate}
                        title={t('update')}
                        fontColor={COLORS.darkGreen}
                        buttonColor={COLORS.lightGreen}
                    />
                </View>
            </KeyboardAwareScrollView>
        </ScreenBackgroundWithModal>
    );
};
