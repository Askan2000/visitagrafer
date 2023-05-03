import round from './DecimalHandler'

const customLabel = (props: any ) => {
    const {
       value, dy, dx, x, y, fontSize, textAnchor
      } = props;
      const customValue = round(value, 1).toFixed(1);
      
      return(
      <text x={x} y={y} dy={dy} dx={dx} fontSize={fontSize} textAnchor={textAnchor}>
        {customValue}
      </text>
      )
}
export default customLabel;