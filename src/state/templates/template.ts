import {
    Editor,
    Color,
    ElementType,
    ArtObjectType
  } from "../../model/Types";
  
export const editor: Editor = {
    card: {
      title: "my card",
      size: {
        height: 600,
        width: 800
      },
      backgroundColor: Color.red,
      elements: [
        {
          type: ElementType.TEXT,
          elementID: "65",
          size: {
            height: 15,
            width: 20
          },
          Position: {
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
          Position: {
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
          Position: {
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
          Position: {
            x: 70,
            y: 230
          },
          artObjectType: ArtObjectType.TRIANGLE
        }
      ]
    },
    selectedElementID: "65",
    history: {
      undoStack: [],
      redoStack: []
    }
  };