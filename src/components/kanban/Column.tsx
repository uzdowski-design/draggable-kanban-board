import { useState } from 'react';
import { CardType, ColumnProps } from '@/lib/types';
import Card from './Card';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const filteredCards = cards.filter((card) => card.column === column);

  const handleDragStart = (e: React.DragEvent, card: CardType) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    clearHighlightIndicators();
    setActive(false);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    clearHighlightIndicators();
    setActive(false);

    const cardId = e.dataTransfer.getData('cardId');
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before === cardId) return;
    let copy = [...cards];
    let cardToMove = copy.find((c) => c.id === cardId);
    if (!cardToMove) return;
    cardToMove = { ...cardToMove, column };
    copy = copy.filter((c) => c.id !== cardId);
    const moveToEnd = before === '-1';
    if (moveToEnd) copy.push(cardToMove);
    else {
      const indexToInsert = copy.findIndex((c) => c.id === before);
      if (indexToInsert === undefined) return;
      copy.splice(indexToInsert, 0, cardToMove);
    }
    setCards(copy);
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();
    clearHighlightIndicators(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = '1';
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    ) as HTMLElement[];
  };

  const getNearestIndicator = (
    e: React.DragEvent,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;
    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - DISTANCE_OFFSET;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1]
      }
    );
  };

  const clearHighlightIndicators = (elements: HTMLElement[] | null = null) => {
    const indicators = elements || getIndicators();
    indicators.forEach((indicator) => {
      indicator.style.opacity = '0';
    });
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'
        }`}
      >
        {!!filteredCards &&
          filteredCards.map((card) => (
            <Card key={card.id} {...card} handleDragStart={handleDragStart} />
          ))}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
