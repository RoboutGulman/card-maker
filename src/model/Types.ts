export type Editor = {
  cardsHistory: CardsHistory;
  card: Card;
  selectedElementID: string;
  history: History;
};

export type History = {
  undoStack: Card[];
  redoStack: Card[];
};

export type Card = {
  title: string;
  cardID: string;
  size: Size;
  backgroundColor: Color;
  elements: Element[];
};

export type Element = TextElement | ImageElement | ArtObjectElement;

export enum ElementType {
  TEXT,
  IMAGE,
  ARTOBJECT
}
export type CardElement = {
  elementID: string;
  size: Size;
  Position: Position;
  type: ElementType;
};

export type TextElement = CardElement & {
  type: ElementType.TEXT;
  textContent: string;
  fontSize: number;
  fontFamily: string;
};

export type ImageElement = CardElement & {
  type: ElementType.IMAGE;
  source: string;
};

export type ArtObjectElement = CardElement & {
  type: ElementType.ARTOBJECT;
  artObjectType: ArtObjectType
};

export enum ArtObjectType {
  CIRCLE,
  RECTANGLE,
  TRIANGLE
}

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type EditorState = {
  history: ActionHistory;
  selectedElement: string;
};

export type ActionHistory = {
  currState: number;
  states: Card[];
};

export type CardID = {
  id: string;
};

export enum Color {
  red,
  green,
  blue
}

export type CardsHistory = {
  cards: string[];
};
