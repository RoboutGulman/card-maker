import Element from './Element'

const ElementList = ({elements}: any) => {
    return (
        <div style={
          {
            position:'relative', 
            width: '400px',
            height:'100px', 
            backgroundColor: 'red', 
            border: '1px lightgray'
          }
          }>
           {elements.map((element: any, index: number) =>
             <Element 
               //remove={remove} 
               number={index + 1} 
               element={element} 
               key={element.id}
              />
           )} 
        </div>
    )
}

export default ElementList
