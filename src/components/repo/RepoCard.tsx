import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Repository} from '../../redux/types/repoTypes';
import {Colors} from '../../styles/colors';
import {formatDate} from '../../utils/dateFormatter';
import {Alert, Linking} from 'react-native';

interface RepoCardProps {
  repo: Repository;
}

const RepoCard: React.FC<RepoCardProps> = React.memo(({repo}) => {
  const handlePress = async () => {
    try {
      if (repo.html_url) {
        await Linking.openURL(repo.html_url);
      } else {
        Alert.alert('Erro', 'URL do repositório não encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  };
  
  return (
    <TouchableCard onPress={handlePress}>
      <Details>
        <RepoName>{repo.name}</RepoName>

        <RepoDescription>{repo.description}</RepoDescription>

        <RepoInfo>
          <LanguageIndicator>
            <LanguageText>{repo.language || 'L. Desconhecida'}</LanguageText>
          </LanguageIndicator>
          <Stars>
            <MaterialIcons name="star" size={16} color={Colors.warning} />
            <StarCount>{repo.stargazers_count}</StarCount>
          </Stars>
          <UpdatedText>Atualizado em {formatDate(repo.updated_at)}</UpdatedText>
        </RepoInfo>
      </Details>
    </TouchableCard>
  );
}, areEqual);

function areEqual(prevProps: RepoCardProps, nextProps: RepoCardProps) {
  return prevProps.repo.id === nextProps.repo.id;
}

export default RepoCard;

const TouchableCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: ${Colors.opacityGray};
  background-color: #fff;
`;

const Details = styled.View`
  flex: 1;
`;

const RepoName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${Colors.lightBlack};
`;

const RepoDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${Colors.lightBlack};
`;

const RepoInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LanguageIndicator = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LanguageText = styled.Text`
  font-size: 14px;
  color: ${Colors.lightBlack};
`;

const Stars = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarCount = styled.Text`
  font-size: 14px;
  color: ${Colors.black};
  margin-left: 4px;
`;

const UpdatedText = styled.Text`
  font-size: 12px;
  color: ${Colors.lightGray};
`;
