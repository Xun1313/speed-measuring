import { useSvgCommon, style } from '../../hooks/useSvgCommon'

const Clock = props => {
  useSvgCommon(Clock)

  return (
    <svg style={style(props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.294 443.294"><path d="M221.647 0C99.433 0 0 99.433 0 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647S343.861 0 221.647 0zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="M235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
  );
}

export default Clock;