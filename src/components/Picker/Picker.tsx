import React, { Component } from 'react';
import * as Action from '../../actions';
import { connect } from 'react-redux';
import Convert from '../../options/convert';
import Model from '../../options/modelsColor';
import './styles.css';

// Интерфейсы
interface StateProps {
  H: number;
  S: number;
  V: number;
  rgbMain: number[];
}
interface DispatchProps {
  add_color: (mas: any) => void;
}
interface OwnProps {
  width: number;
  height: number;
}

interface IStyleBlock {
  width?: string;
  height?: string;
  background: string;
}

type Props = StateProps & OwnProps & DispatchProps;

// Компонент
class Picker extends Component<Props> {
  circle = {
    width: 12,
    height: 12,
  };

  block = {
    width: this.props.width,
    height: this.props.height,
    pxX: this.props.width / 100,
    pxY: this.props.height / 100,
    left: 0,
    top: 0,
  };

  blockRef: any = React.createRef();

  styleCircle = {};
  styleBlock = {};

  constructor(props: Props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();

    const { width, height, pxX, pxY, left: positX, top: positY } = this.block;

    let left = +(c.clientX - positX).toFixed(2);
    let top = +(c.clientY - positY).toFixed(2);

    // Проверка left
    left = left < 0 ? 0 : left;
    left = left > width ? width : left;

    // Проверка top
    top = top > height ? height : top;
    top = top < 0 ? 0 : top;

    const S = Math.ceil(left / pxX);
    const V = Math.ceil(Math.abs(top / pxY - 100));

    this.props.add_color([null, S, V]);
  }

  touchMove(e: any) {
    e.preventDefault();
    var touches = e.changedTouches;
    console.log(touches);
    for (let i = 0; i < touches.length; i++) {
      let newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY,
      };
      this.cPos(newEvent, false);
    }
  }
  componentDidMount() {
    let block = this.blockRef.current;
    let { left, top } = block.getBoundingClientRect();
    this.block.left = left;
    this.block.top = top;

    block.onmousedown = e => {
      this.cPos(e, true);
      document.onmousemove = e => {
        this.cPos(e, true);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    block.addEventListener('touchstart', this.touchMove, false);
    block.addEventListener('touchend', this.touchMove, false);
    block.addEventListener('touchmove', this.touchMove, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let bool = nextProps.rgbMain !== this.props.rgbMain ? true : false;
    return bool;
  }

  getStyleBlock() {
    let { width, height } = this.block;
    let { H } = this.props;
    let rgb = 'rgb(' + Convert.hsv_rgb(H, 100, 100) + ')';
    let background = `linear-gradient(to top, rgb(0, 0, 0), transparent), linear-gradient(to left, 
    ${rgb} , rgb(255, 255, 255))`;

    this.styleBlock = {
      width: width + 'px',
      height: height + 'px',
      background,
    };
  }

  getStyleCircle() {
    const { width, height } = this.circle;
    const { width: W, height: H, pxX, pxY } = this.block;
    const { S, V } = this.props;
    const backgroundColor = Model.rgb.getStr(this.props.rgbMain);
    let left: number | string = pxX * S;
    let top: number | string = pxY * Math.abs(V - 100);

    // Проверка left
    left = left < 0 ? 0 + 'px' : left > W ? W : left + 'px';
    // Проверка top
    top = top > H ? H + 'px' : top < 0 ? 0 : top + 'px';

    this.styleCircle = {
      width: width + 'px',
      height: height + 'px',
      left,
      top,
      backgroundColor,
    };
  }
  render() {
    this.getStyleCircle();
    this.getStyleBlock();
    return (
      <div
        ref={this.blockRef}
        className="cp_block-picker"
        id="cp_block-picker"
        style={this.styleBlock}
      >
        <div
          className="cp_block-circle"
          id="cp_block-circle"
          style={this.styleCircle}
          draggable={false}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = ({ H, S, V, rgbMain }: any): StateProps => {
  return {
    H,
    rgbMain,
    S,
    V,
  };
};
const mapDispatchToProps: DispatchProps = {
  add_color: Action.eventHSV,
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Picker);
