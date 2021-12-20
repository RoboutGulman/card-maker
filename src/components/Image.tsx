import React, { FC } from 'react'
import { ImageElement, Size } from '../model/Types';
type ImageComponentProps = {
    parentSize: Size;
    element: ImageElement;
  };
  const ImageComponent: FC<ImageComponentProps> = ({parentSize, element} : ImageComponentProps) => {
    return (
      <image xlinkHref={element.source} x={element.Position.x+'px'} y={element.Position.y+'px'} height={element.size.height+'px'} width={element.size.width+'px'}/>
    )
}

export default ImageComponent
