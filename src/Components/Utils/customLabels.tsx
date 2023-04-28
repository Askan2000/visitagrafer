import {round} from './DecimalHandler'

const customLabel = (props: any) => {
    const {
       value
      } = props;
      const customValue = round(value, 1);
      
      return(
      <text>
        {customValue}
      </text>
      )
}
export default customLabel;