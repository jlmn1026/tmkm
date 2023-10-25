import { Button } from 'antd';
import { useCallback } from 'react';

type Props = {
  deckId: string;
};

const SaveDeckButton = ({ deckId }: Props) => {
  const saveAsJson = useCallback(() => {}, []);

  return <Button onClick={saveAsJson}>Save Deck as JSON</Button>;
};

export default SaveDeckButton;
