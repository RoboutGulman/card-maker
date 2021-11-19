
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
    elements: CardElement[]
};

export enum ElementType {
    TEXT,
    IMAGE,
    PRIMITIVE,
  }
export type CardElement = {
    elementID: String,
    size: Size,
    Position: Position,
    type: ElementType,
    content: TextElement|ImageElement|ArtObjectElement
}

export type TextElement = {
    textContent: String,
    fontSize: Number,
    fontFamily: String
}

export type ImageElement = {
    source: String
}

export type ArtObjectElement = {
    type: ArtObjectType,
    content: Circle|null|Triangle
}

export enum ArtObjectType {
    Circle,
    Rectangle,
    Triangle
}

export type Circle = {
    radius: Number
}


export type Triangle = {
    apexTwo: Position,
    apexThree: Position
}

export type Position = {
    x: Number,
    y: Number
}

export type Size = {
    height: Number,
    width: Number
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


