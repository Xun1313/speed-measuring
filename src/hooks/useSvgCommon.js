import PropType from 'prop-types';

const useSvgCommon = name => {
  name.propTypes = {
    width: PropType.oneOfType([PropType.string, PropType.number]),
    height: PropType.oneOfType([PropType.string, PropType.number]),
    customClass: PropType.string,
    customStyle: PropType.string,
    color: PropType.string,
    direction: PropType.string,
    event: PropType.object
  }

  name.defaultProps = {
    width: 30,
    height: 30,
    color: 'currentColor',
    direction: 'bottom'
  }
}

const style = props => {
  return {
    width: props.width,
    height: props.height,
    fill: props.color,
    transform: `rotate(${rotate[props.direction]}deg)`,
    ...props.customStyle,
  }
}

const rotate = {
  top: 180,
  bottom: 0,
  left: 90,
  right: 270
}

export { useSvgCommon, style };