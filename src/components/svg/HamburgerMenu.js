import { useSvgCommon, style } from '../../hooks/useSvgCommon'

const HamburgerMenu = props => {
  useSvgCommon(HamburgerMenu)

  return (
    <svg style={style(props)} {...props.event} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384"><path d="M0 277.333h384V320H0zM0 170.667h384v42.667H0zM0 64h384v42.667H0z"/></svg>
  );
}

export default HamburgerMenu;