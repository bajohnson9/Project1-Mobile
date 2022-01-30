import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, Modal, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ReimbursementItem } from '../dtos/dtos';

interface Props {
  label: string;
  data: Array<{ label: string; reimb:ReimbursementItem }>;
  onSelect: (item: { label: string; reimb:ReimbursementItem }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
const DropdownButton = useRef(null);
const [visible, setVisible] = useState(false);
const [selected, setSelected] = useState(undefined);
const [dropdownTop, setDropdownTop] = useState(0);

const toggleDropdown = (): void => {
  visible ? setVisible(false) : openDropdown();
};

const openDropdown = (): void => {
    {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    }
};
  
const onItemPress = (item): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
};

const renderItem = ({ item }): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text><Text>🔥     </Text><Text>{item.label}</Text></Text>
    </TouchableOpacity>
);

const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      <Icon style={styles.icon} type="font-awesome" name="chevron-down" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderColor: '#324ca8',
    width: '100%',
    borderWidth: 3,
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '90%',
    overflow: 'scroll',
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;
