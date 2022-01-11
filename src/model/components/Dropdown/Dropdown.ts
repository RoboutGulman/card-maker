import { Size } from "../../Types";
export enum formatType{
  jpeg,
  png
}
type saveCardAsArguments={
  size: Size,
  type:formatType,
}
export function saveCardAs({ size, type}: saveCardAsArguments) {
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
      var a =  document.createElement('a');
      console.log(type)
      if (type == 1){
        context?.drawImage(image, 0, 0);
        a.download = "image.png"; 
        a.href = canvas.toDataURL('image/png');
      }
      else{
        if (context!=null){
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context?.drawImage(image, 0, 0);
        a.download = "image.jpeg";
        a.href = canvas.toDataURL('image/jpeg');
      }
      a.click();
    }
    canvas.onload=function() {
    }
  }