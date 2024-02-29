import { CardType, SetCardsType } from '@/lib/types';
import { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

const BinArea = ({ setCards }: { setCards: SetCardsType }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    const card = e.dataTransfer.getData('cardId');
    setCards((prev: CardType[] | []) => prev.filter((c) => c.id !== card));
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'bordr-neutral-500 bg-neutral-500/20 text-neutral-50'
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};
export default BinArea;
