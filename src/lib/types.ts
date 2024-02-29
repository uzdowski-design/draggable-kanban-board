export type CardType = { title: string; id: string; column: string };

export type SetCardsType = React.Dispatch<
  React.SetStateAction<CardType[] | never[]>
>;

export type ColumnProps = {
  title: string;
  headingColor: string;
  column: string;
  cards: CardType[];
  setCards: SetCardsType;
};
