import {Editor } from "../../model/Types";

export const defEditor: Editor = {
    card: {
        title: "my card",
        size: {
          height: 600,
          width: 800
        },
        backgroundColor: "white",
        elements: []
      },
      selectedElementID: null,
      history: {
        undoStack: [],
        redoStack: []
      }
    };