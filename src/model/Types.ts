
export type Editor = {
    cardsHistory: CardsHistory,
    card: Card,
    selectedElementID: String,
    history: History
};

export type History = {
    undoStack: Card[];
    currentState: number;    
}

export type Card = {
    title:String,
    cardID: String,
    size: Size,
    backgroundColor: Color,
    elements: Element[]
};

export type Element= TextElement|ImageElement|ArtObjectElement;


export enum ElementType {
    TEXT,
    IMAGE,
    PRIMITIVE,
  }
export type CardElement = {
    elementID: String,
    size: Size,
    Position: Position,
    type: ElementType
}

export type TextElement = CardElement & {
    type: ElementType.TEXT,
    textContent: String,
    fontSize: number,
    fontFamily: String
}

export type ImageElement = CardElement & {
    type: ElementType.IMAGE,
    source: String
}

export type ArtObjectElement = CardElement & {
    type: ElementType.PRIMITIVE,
    content: Circle|null|Triangle
}

export enum ArtObjectType {
    Circle,
    Rectangle,
    Triangle
}

export type Circle = {
    radius: number
}


export type Triangle = {
    apexTwo: Position,
    apexThree: Position
}

export type Position = {
    x: number,
    y: number
}

export type Size = {
    height: number,
    width: number
}

export type EditorState = {
  history: ActionHistory,
  selectedElement: String 
}

export type ActionHistory = {
    currState: number,
    states: Card[]
}


export type CardID = {
    id: String
}

export enum Color {
    red,
    green,
    blue
}

export type CardsHistory = {
  cards: String[]
}


