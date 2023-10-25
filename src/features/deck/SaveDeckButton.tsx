import { Button } from 'antd';
import { useCallback } from 'react';
import { getDeck } from './deckStore';

type Props = {
  deckId: string;
};

const SaveDeckButton = ({ deckId }: Props) => {
  const saveAsJson = useCallback(() => {
    const deck = getDeck(deckId);
    const blob = new Blob([JSON.stringify(deck)], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${deck.name}.json`;
    link.click();
  }, [deckId]);

  return <Button onClick={saveAsJson}>Save Deck as JSON</Button>;
};

export default SaveDeckButton;
