import { Size } from "../../Types";

export function saveCardAs(size: Size) {
    var stringobJ = new XMLSerializer();
    var svg = document.getElementById('svgcontent');
    if (svg===null) return
    var svgString = stringobJ.serializeToString(svg );
    svgString = '<?xml version="1.0"?>\n' + svgString ; 

    var image = new Image();
    image.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    image.width = size.width;
    image.height = size.height; 

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    image.onload = function() {
      canvas.width = image.width
      canvas.height = image.height
      context?.drawImage(image, 0, 0);
      var a =  document.createElement('a');
      a.download = "image.png"; 
      a.href = canvas.toDataURL('image/png');
      a.click();
    }
    canvas.onload=function() {
    }
  }