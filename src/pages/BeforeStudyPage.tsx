import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { StudyDeck } from '@/features/deck/constant';
import { getDeck } from '@/features/deck/deckStore';
import { StudyType, studyModeAtom } from '@/jotai/study';
import { PageRoute } from '@/routes/pageRoute';
import { styled } from '@stitches/react';
import { Button } from 'antd';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';

const BeforeStudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [, setStudyMode] = useAtom(studyModeAtom);

  const [deck, setDeck] = useState<StudyDeck>();
  const [usedType, setUsedType] = useState<StudyType>('belowGoalCount');
  const [useNum, setUseNum] = useState<number>(10);

  useAsync(async () => {
    if (!deckId) {
      return;
    }
    setDeck(getDeck(deckId));
  });

  const startStudy = useCallback(() => {
    setStudyMode({
      cardNum: useNum,
      cardType: usedType,
    });

    navigate(`${PageRoute.Study}/${deckId}`);
  }, [deckId, navigate, setStudyMode, useNum, usedType]);

  if (!deck) {
    return <>Loading...</>;
  }

  return (
    <CommonContainer>
      <SubTitle>Select the type of card for your study</SubTitle>
      <SelectNumberRow>
        <Button
          type={usedType === 'all' ? 'primary' : 'default'}
          onClick={() => setUsedType('all')}
        >
          All Card
        </Button>
        <Button
          type={usedType === 'infrequently' ? 'primary' : 'default'}
          onClick={() => setUsedType('infrequently')}
        >
          Used infrequently
        </Button>
        <Button
          type={usedType === 'belowGoalCount' ? 'primary' : 'default'}
          onClick={() => setUsedType('belowGoalCount')}
        >
          Below goal count
        </Button>
      </SelectNumberRow>
      <SubTitle>Select use Number of cards</SubTitle>
      <SelectNumberRow>
        {Array.from({ length: 5 }).map((_, index) => {
          const num = (index + 1) * 10;
          return (
            <Button
              key={num}
              onClick={() => setUseNum(num)}
              type={useNum === num ? 'primary' : 'default'}
            >
              {num}
            </Button>
          );
        })}
      </SelectNumberRow>
      <StartButtonRow>
        <Button type="primary" onClick={startStudy}>
          Study Start
        </Button>
      </StartButtonRow>
    </CommonContainer>
  );
};

export default BeforeStudyPage;

const SelectNumberRow = styled('div', {
  display: 'flex',
  gap: '12px',
  margin: '24px 0px',
});

const StartButtonRow = styled('div', {
  marginTop: '48px',
});
