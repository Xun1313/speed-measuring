import { useSvgCommon, style } from '../../hooks/useSvgCommon'

const Street = props => {
  useSvgCommon(Street)

  return (
    <svg className={props.customClass} style={style(props)} {...props.event} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M320 0h-16v72H0v16h320zm0 0M384 352h96v-16h-80V168h80v-16h-96zm0 0M400 72V0h-16v88h96V72zm0 0M384 480h16v-48h80v-16h-96zm0 0M181.336 464H0v16h186.664l64-48H304v48h16v-64h-74.664zm0 0M304 336h-74.664l-64 48H144v16h26.664l64-48H320V152H0v16h304zm0 0"/><path d="M112 200c-39.746.043-71.957 32.254-72 72 0 36.8 58.719 122.848 65.414 132.543l6.586 9.535 6.586-9.535C125.28 394.848 184 308.801 184 272c-.043-39.746-32.254-71.957-72-72zm0 185.695C91.863 355.238 56 296 56 272c0-30.93 25.07-56 56-56s56 25.07 56 56c0 24-35.871 83.2-56 113.695zm0 0"/><path d="M112 240c-17.672 0-32 14.328-32 32s14.328 32 32 32 32-14.328 32-32-14.328-32-32-32zm0 48c-8.836 0-16-7.164-16-16s7.164-16 16-16 16 7.164 16 16-7.164 16-16 16zm0 0M0 384h80v16H0zm0 0M440 112h16v16h-16zm0 0M408 112h16v16h-16zm0 0M376 112h16v16h-16zm0 0M344 112h16v16h-16zm0 0M344 152h16v16h-16zm0 0M344 184h16v16h-16zm0 0M344 216h16v16h-16zm0 0M344 248h16v16h-16zm0 0M344 280h16v16h-16zm0 0M344 312h16v16h-16zm0 0M344 344h16v16h-16zm0 0M344 376h16v16h-16zm0 0M312 376h16v16h-16zm0 0M280 376h16v16h-16zm0 0M248 376h16v16h-16zm0 0M215.027 389.656l11.313-11.316 11.316 11.316-11.316 11.313zm0 0M191.027 413.652l11.313-11.312 11.316 11.312-11.316 11.313zm0 0M168 424h16v16h-16zm0 0M136 424h16v16h-16zm0 0M104 424h16v16h-16zm0 0"/></svg>
  );
}

export default Street;
