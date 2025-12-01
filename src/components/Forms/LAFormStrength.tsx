import { FC, useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { styles } from './Form.styles';
import { InputContainer } from '../InputContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenBackgroundWithModal } from '../ScreenBackground/ScreenBackgroundWithModal';
import { LAButton } from '../Button/LAButton';
import { COLORS } from 'src/themes/colors';
import { OrderDto } from 'src/domain/models/Order';
import { getOrder, getOrderTranspLab } from 'src/data/querys/orderQueries';
import { Delivery } from 'src/domain/models/Delivery';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTranslate } from 'src/i18n/useTranslate';
import moment from 'moment';
import { OrderTransLab } from 'src/domain/models/OrderTransLab';
import { updateOrderTranspLab } from 'src/data/mutations/orderMutations';

interface laFormStrengthProps {
    onClose: () => void;
    visible: boolean;
    plantId: string;
    deliveryId: string;
    isSelected?: boolean;
}

export const LAFormStrength: FC<laFormStrengthProps> = ({
    visible,
    onClose,
    plantId,
    deliveryId,
    isSelected,
}) => {
    const { t } = useTranslate();
    const [dateOfSampling, setDateOfSampling] = useState('');
    const [samplingBy, setSamplingBy] = useState('');
    const [testedBy, setTestedBy] = useState('');
    const [oneTestTime, setOneTestTime] = useState('');
    const [oneStrength, setOneStrength] = useState('0.0');
    const [oneDensity, setOneDensity] = useState('0.0');
    const [sevenTestTime, setSevenTestTime] = useState('');
    const [sevenStrength, setSevenStrength] = useState('0.0');
    const [sevenDensity, setSevenDensity] = useState('0.0');
    const [fourteenTestTime, setFourteenTestTime] = useState('');
    const [fourteenStrength, setFourteenStrength] = useState('0.0');
    const [fourteenDensity, setFourteenDensity] = useState('0.0');
    const [twoEightTestTime, setTwoEightTestTime] = useState('');
    const [twoEightStrength, setTwoEightStrength] = useState('0.0');
    const [twoEightDensity, setTwoEightDensity] = useState('0.0');
    const [comments, setComments] = useState('');

    const [showSamplePicker, setShowSamplePicker] = useState(false);
    const [showOnePicker, setShowOnePicker] = useState(false);
    const [showSevenPicker, setShowSevenPicker] = useState(false);
    const [showFourteenPicker, setShowFourteenPicker] = useState(false);
    const [showTwoEightPicker, setShowTwoEightPicker] = useState(false);

    const timePicker = (pickerName: string) => {
        if (pickerName === 'sample') setShowSamplePicker(!showSamplePicker);
        if (pickerName === 'one') setShowOnePicker(!showOnePicker);
        if (pickerName === 'seven') setShowSevenPicker(!showSevenPicker);
        if (pickerName === 'fourteen')
            setShowFourteenPicker(!showFourteenPicker);
        if (pickerName === 'twoEight')
            setShowTwoEightPicker(!showTwoEightPicker);
    };

    const getTransLabs = async () => {
        const lab = await getOrderTranspLab(plantId, deliveryId);
        if (lab) {
            setDateOfSampling(lab.sample_taking_data!);
            setSamplingBy(lab.person_sample!);
            setTestedBy(lab.test_person!);
            setOneTestTime(lab['1_day']!);
            setOneStrength(lab['1_day_strength']!);
            setOneDensity(lab['1_day_density']!);
            setSevenTestTime(lab['7_day']!);
            setSevenStrength(lab['7_day_strength']!);
            setSevenDensity(lab['7_day_density']!);
            setFourteenTestTime(lab['14_day']!);
            setFourteenStrength(lab['14_day_strength']!);
            setFourteenDensity(lab['14_day_density']!);
            setTwoEightDensity(lab['28_day_density']!);
            setTwoEightTestTime(lab['28_day']!);
            setTwoEightStrength(lab['28_day_strength']!);
            setComments(lab.comment!);
        }
    };
    useEffect(() => {
        if (isSelected && visible) {
            getTransLabs();
        }
    }, [isSelected, visible]);

    const onHandleUpdate = async () => {
        const delivery: OrderTransLab = {
            delivery_id: deliveryId,
            plant_id: plantId,
            sample_taking_data: dateOfSampling,
            person_sample: samplingBy,
            test_person: testedBy,
            ['1_day']: oneTestTime,
            ['1_day_strength']: oneStrength,
            ['1_day_density']: oneDensity,
            ['7_day']: sevenTestTime,
            ['7_day_strength']: sevenStrength,
            ['7_day_density']: sevenDensity,
            ['14_day']: fourteenTestTime,
            ['14_day_strength']: fourteenStrength,
            ['14_day_density']: fourteenDensity,
            ['28_day']: twoEightTestTime,
            ['28_day_strength']: twoEightStrength,
            ['28_day_density']: twoEightDensity,
            comment: comments,
        };

        await updateOrderTranspLab(delivery, plantId, deliveryId);
        onClose();
    };

    const resetModal =() =>{
        setDateOfSampling('');
        setSamplingBy('');
        setTestedBy('');
        setOneTestTime('');
        setOneStrength('0.0');
        setOneDensity('0.0');
        setSevenTestTime('');
        setSevenStrength('0.0');
        setSevenDensity('0.0');
        setFourteenTestTime('');
        setFourteenStrength('0.0');
        setFourteenDensity('0.0');
        setTwoEightDensity('0.0');
        setTwoEightTestTime('');
        setTwoEightStrength('0.0');
        setComments('');
        onClose();
    }

    return (
        <ScreenBackgroundWithModal
            screenTitle={t('strength_form.strength_test')}
            visible={visible}
            onClose={resetModal}>
            <View style={styles.formContainer}>
                <View style={styles.formHeaderContainer}>
                    <Text style={styles.headerText}>
                        {t('strength_form.date_of_sampling')}
                    </Text>
                </View>
                <View style={styles.formHeaderContainer}>
                    <Text style={styles.headerText}>
                        {t('strength_form.sampling_by')}
                    </Text>
                </View>
                <View style={styles.formHeaderContainer}>
                    <Text style={styles.headerText}>
                        {t('strength_form.tested_by')}
                    </Text>
                </View>
            </View>
            <KeyboardAwareScrollView>
                <View
                    style={{
                        marginBottom: 300,
                        paddingBottom: 180,
                    }}>
                    <InputContainer title="">
                        <Pressable
                            onPress={() => timePicker('sample')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {dateOfSampling}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showSamplePicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                // setDateOfSampling(moment(date).format('HH:mm'));
                                setDateOfSampling(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                timePicker('sample');
                            }}
                            onCancel={() => timePicker('sample')}
                        />

                        <TextInput
                            placeholder={samplingBy}
                            onChangeText={text => setSamplingBy(text)}
                            value={samplingBy}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder={testedBy}
                            onChangeText={text => setTestedBy(text)}
                            value={testedBy}
                            style={styles.input}
                        />
                    </InputContainer>
                    <View style={styles.horizontalLine} />
                    <View style={styles.formContainer}>
                        <View style={styles.formHeaderContainer}>
                            <Text style={styles.headerText}>
                                {t('strength_form.test_time')}
                            </Text>
                        </View>
                        <View style={styles.formHeaderContainer}>
                            <Text style={styles.headerText}>
                                {' '}
                                {t('strength_form.strength')} MPa
                            </Text>
                        </View>
                        <View style={styles.formHeaderContainer}>
                            <Text style={styles.headerText}>
                                {t('strength_form.density')}, kg/m3
                            </Text>
                        </View>
                    </View>
                    <InputContainer title={t('strength_form.1_day')}>
                        <Pressable
                            onPress={() => timePicker('one')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {oneTestTime}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showOnePicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={date => {
                                //setOneTestTime(moment(date).format('HH:mm'));
                                setOneTestTime(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                timePicker('one');
                            }}
                            onCancel={() => timePicker('one')}
                        />
                        <TextInput
                            placeholder={oneStrength}
                            onChangeText={text => setOneStrength(text)}
                            value={oneStrength}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={oneDensity}
                            onChangeText={text => setOneDensity(text)}
                            value={oneDensity}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('strength_form.7_day')}>
                        <Pressable
                            onPress={() => timePicker('seven')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {sevenTestTime}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showSevenPicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                // setSevenTestTime(moment(date).format('HH:mm'));
                                setSevenTestTime(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                timePicker('seven');
                            }}
                            onCancel={() => timePicker('seven')}
                        />
                        <TextInput
                            placeholder={sevenStrength}
                            onChangeText={text => setSevenStrength(text)}
                            value={sevenStrength}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={sevenDensity}
                            onChangeText={text => setSevenDensity(text)}
                            value={sevenDensity}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('strength_form.14_day')}>
                        <Pressable
                            onPress={() => timePicker('fourteen')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {fourteenTestTime}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showFourteenPicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                // setFourteenTestTime(
                                //     moment(date).format('HH:mm'),
                                // );
                                setFourteenTestTime(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                timePicker('fourteen');
                            }}
                            onCancel={() => timePicker('fourteen')}
                        />
                        <TextInput
                            placeholder={fourteenStrength}
                            onChangeText={text => setFourteenStrength(text)}
                            value={fourteenStrength}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={fourteenDensity}
                            onChangeText={text => setFourteenDensity(text)}
                            value={fourteenDensity}
                            style={styles.input}
                            inputMode="numeric"
                        />
                    </InputContainer>
                    <InputContainer title={t('strength_form.28_day')}>
                        <Pressable
                            onPress={() => timePicker('twoEight')}
                            style={styles.input}>
                            <Text style={styles.timeInputText}>
                                {twoEightTestTime}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={showTwoEightPicker}
                            mode="datetime"
                            is24Hour={true}
                            display="spinner"
                            onConfirm={(date: Date) => {
                                // setTwoEightTestTime(
                                //     moment(date).format('HH:mm'),
                                // );
                                setTwoEightTestTime(
                                    moment(date).format('YYYY-MM-DD, HH:mm'),
                                );
                                timePicker('twoEight');
                            }}
                            onCancel={() => timePicker('twoEight')}
                        />
                        <TextInput
                            placeholder={twoEightStrength}
                            onChangeText={text => setTwoEightStrength(text)}
                            value={twoEightStrength}
                            style={styles.input}
                            inputMode="numeric"
                        />
                        <TextInput
                            placeholder={twoEightDensity}
                            onChangeText={text => setTwoEightDensity(text)}
                            value={twoEightDensity}
                            style={styles.input}
                            inputMode="numeric"
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
