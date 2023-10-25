import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
// import {Feather} from 'react-native-vector-icons';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('window').width;

const InputWithIconFeatherComponent = (
  props: object | any,
): React.JSX.Element => {
  const {label, iconName, setValue, updateValue, placeholder, secure} = props;

  return (
    <View style={styles.investmentPairContainerFull}>
      <View style={styles.singleInvestmentMetric}>
        <View>
          <Text style={styles.inputText}>{label}</Text>
          <View style={styles.splitInput}>
            {/* <Feather size={20} color={'#4169e1'} name={iconName} /> */}
            <Text>{iconName}</Text>
            <TextInput
              style={styles.inputSplit}
              value={setValue}
              returnKeyType="done"
              placeholder={placeholder}
              secureTextEntry={secure}
              onChangeText={value => {
                updateValue(value);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

InputWithIconFeatherComponent.propTypes = {
  label: PropTypes.string,
  iconName: PropTypes.string,
  setValue: PropTypes.string,
  updateValue: PropTypes.func,
  placeholder: PropTypes.string,
  secure: PropTypes.bool,
};

const styles = StyleSheet.create({
  investmentPairContainerFull: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  singleInvestmentMetric: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#E8E8E8',
  },
  inputText: {
    fontSize: 17,
    fontWeight: '500',
  },
  splitInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputSplit: {
    marginTop: 10,
    fontSize: 17,
    width: deviceWidth - 75,
    paddingLeft: 2,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default InputWithIconFeatherComponent;
