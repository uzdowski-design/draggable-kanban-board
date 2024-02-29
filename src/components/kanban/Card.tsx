import { CardType } from '@/lib/types';
import DropIndicator from './DropIndicator';
import { motion } from 'framer-motion';

const Card = ({
  title,
  id,
  column,
  handleDragStart
}: CardType & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDragStart: (e: React.DragEvent | any, card: CardType) => void;
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grap rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm textneutral-100">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
