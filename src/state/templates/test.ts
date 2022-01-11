import {
    Editor,
    ElementType,
    ArtObjectType
  } from "../../model/Types";
import image from "./test.jpg"
  
export const editor: Editor = {
    card: {
      title: "my card",
      size: {
        height: 600,
        width: 800
      },
      backgroundColor: "white",
      elements: [
        {
          type: ElementType.TEXT,
          elementID: "65",
          size: {
            height: 15,
            width: 20
          },
          position: {
            x: 15,
            y: 20
          },
          textContent: "hello",
          fontSize: 14,
          fontFamily: "Calibri"
        }, {
          type: ElementType.ARTOBJECT,
          elementID: "5",
          size: {
            height: 15,
            width: 20
          },
          position: {
            x: 44,
            y: 230
          },
          artObjectType: ArtObjectType.CIRCLE
        }, {
          type: ElementType.ARTOBJECT,
          elementID: "85",
          size: {
            height: 15,
            width: 20
          },
          position: {
            x: 10,
            y: 200
          },
          artObjectType: ArtObjectType.RECTANGLE
        }, {
          type: ElementType.ARTOBJECT,
          elementID: "34",
          size: {
            height: 40,
            width: 60
          },
          position: {
            x: 70,
            y: 230
          },
          artObjectType: ArtObjectType.TRIANGLE
        },
        {
          elementID: '36',
          type: ElementType.IMAGE,
          size: {
            height:300,
            width:400
          },
          position: {
            x: 150,
            y: 100
          },
          source: image
        }
      ]
    },
    selectedElementID: "65",
    history: {
      undoStack: [],
      redoStack: []
    }
  };