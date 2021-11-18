
export type Editor = {
    cardsHistory: CardsHistory,
    card: Card,
    editorState: EditorState
};

export type Card = {
    title:String,
    cardID: String,
    size: Size,
    backgroundColor: Color,
    elements: CardElement[]
};


export type CardElement = {
    elementID: ElementID,
    size: Size,
    Position: Position,
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
  selectedElement: ElementID 
}

export type ActionHistory = {
    currState: number,
    states: Card[]
}

export type ElementID = {
     id: String
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
  cards: CardID[]
}


