export type Editor = {
  card: Card;
  selectedElementID: string|null;
  history: History;
};

export type History = {
  undoStack: Card[];
  redoStack: Card[];
};

export type Card = {
  title: string;
  size: Size;
  backgroundColor: string;
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
  position: position;
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

export type position = {
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


export type CardsHistory = {
  cards: string[];
};
