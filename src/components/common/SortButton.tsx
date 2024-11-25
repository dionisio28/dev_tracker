import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Modal, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../styles/colors';

interface SortOption {
  key: string;
  label: string;
  icon: string
}

interface SortButtonProps {
  selectedSort: string;
  onSortChange: (sortKey: string) => void;
}

const SORT_OPTIONS: SortOption[] = [
  {key: 'name', label: 'Ordem alfabética', icon: 'abc'},
  {key: 'stars-asc', label: 'Estrelas Crescente', icon: 'star-rate'},
  {key: 'stars-desc', label: 'Estrelas Decrescente', icon: 'star-border'},
  {key: 'updated', label: 'Última Atualização', icon: 'update'},
];

const SortButton: React.FC<SortButtonProps> = React.memo(
  ({selectedSort, onSortChange}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSortChange = (key: string) => {
      onSortChange(key);
      setModalVisible(false);
    };

    return (
      <>
        <Button onPress={() => setModalVisible(true)}>
          <MaterialIcons name="sort" size={20} color={Colors.darkGray} />
          <ButtonText>Ordenar lista de repositórios</ButtonText>
        </Button>

        <Modal transparent visible={modalVisible} animationType="slide">
          <ModalBackground>
            <ModalContainer>
              <FlatList
                data={SORT_OPTIONS}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <SortOptionButton onPress={() => handleSortChange(item.key)}>
                          <MaterialIcons name={item.icon} size={24} color={Colors.lightGray} />
                    <SortOptionText isSelected={item.key === selectedSort}>
                      {item.label}
                    </SortOptionText>
                  </SortOptionButton>
                )}
              />
              <CloseButton onPress={() => setModalVisible(false)}>
                <CloseButtonText>Fechar</CloseButtonText>
              </CloseButton>
            </ModalContainer>
          </ModalBackground>
        </Modal>
      </>
    );
  },
);

export default SortButton;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ButtonText = styled.Text`
  color: ${Colors.lightBlack};
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`;

const SortOptionButton = styled.TouchableOpacity`
  padding: 12px 8px;
  flex-direction: row;
  align-items: center;
`;

const SortOptionText = styled.Text<{isSelected: boolean}>`
  font-size: 16px;
  color: ${({isSelected}) => (isSelected ? Colors.info : Colors.black)};
  font-weight: ${({isSelected}) => (isSelected ? 'bold' : 'normal')};
  margin-left: 8px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 16px;
  align-self: center;
  padding: 10px 16px;
  border-radius: 8px;
`;

const CloseButtonText = styled.Text`
  color: ${Colors.info};
  font-size: 16px;
  font-weight: bold;
`;
