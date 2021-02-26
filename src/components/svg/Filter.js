import { useSvgCommon, style } from '../../hooks/useSvgCommon'

const Filter = props => {
  useSvgCommon(Filter)

  return (
    <svg className={props.customClass} style={style(props)} {...props.event} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M90.5 0h-30v362h-30v90h30v60h30v-60h30v-90h-30zm0 422h-30v-30h30zM481.5 362h-30V0h-30v362h-30v90h30v60h30v-60h30zm-30 60h-30v-30h30zM331.5 0h-30v222h-30v90h30v200h30V312h30v-90h-30zm0 282h-30v-30h30zM210.5 0h-30v53.652h-30v90h30V512h30V143.652h30v-90h-30zm0 113.652h-30v-30h30z"/></svg>
  );
}

export default Filter;