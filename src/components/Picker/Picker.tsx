import React, { Component, useState } from 'react';
import * as Action from '../../actions';
import Convert from '../../options/convert';
import Model from '../../options/modelsColor';
import { IStrictUser_options_style } from '../../interfaces';
import { connect, ReactReduxContext } from 'react-redux';
import './styles.css';

// Интерфейсы
interface StateProps {
  H: number;
  S: number;
  V: number;
  rgbMain: number[];
  resize: boolean;
  style_options: IStrictUser_options_style;
}
interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

// Компонент
class Picker extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.cPos = this.cPos.bind(this);
  }

  state = {
    on: false,
  };
  circle = {
    width: 12,
    height: 12,
  };

  picker = {
    width: 250,
    height: 140,
    pxX: 250 / 100,
    pxY: 140 / 100,
    left: 0,
    top: 0,
  };

  blockRef: any = React.createRef();

  styleCircle = {};
  styleBlock = {};

  componentWillMount() {
    this.updateElems();
  }

  componentDidMount() {
    let block = this.blockRef.current;
    this.updateCoords();
    const { on } = this.state;
    this.setState({ on: !on });
    block.onmousedown = e => this.mouseDown(e);

    block.ontouchstart = this.touchMove;
    block.ontouchend = this.touchMove;
    block.ontouchmove = this.touchMove;
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { resize, rgbMain, style_options } = this.props;
    const { style_options: so } = nextProps;
    const { width, height } = so.picker;
    const { width: wc, height: hc } = so.circle;

    let bool = nextProps.rgbMain !== rgbMain ? true : false;
    if (nextProps.resize !== resize) {
      this.updateCoords();
      bool = true;
    }
    if (so !== style_options) {
      // Block
      this.picker.width = width ? width : this.picker.width;
      this.picker.height = height ? height : this.picker.height;
      this.picker.pxX = this.picker.width / 100;
      this.picker.pxY = this.picker.height / 100;
      this.updateCoords();

      // Circle
      this.circle.width = wc ? wc : this.circle.width;
      this.circle.height = hc ? hc : this.circle.height;
      bool = true;
    }
    if (nextState.on !== this.state.on) {
      bool = true;
    }
    return bool;
  }

  mouseDown(e) {
    this.cPos(e, true);
    document.onmousemove = e => {
      this.cPos(e, true);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  updateElems() {
    let { picker, circle } = this;
    const { style_options } = this.props;
    if (style_options) {
      // Block
      picker.width = style_options.picker.width;
      picker.height = style_options.picker.height;
      picker.pxX = picker.width / 100;
      picker.pxY = picker.height / 100;

      // Circle
      circle.width = style_options.circle.width;
      circle.height = style_options.circle.width;
    }
  }
  updateCoords() {
    let block = this.blockRef.current;
    let { left, top } = block.getBoundingClientRect();
    this.picker.left = left;
    this.picker.top = top;
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();

    const { width, height, pxX, pxY, left: positX, top: positY } = this.picker;

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
    for (let i = 0; i < touches.length; i++) {
      let newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY,
      };
      this.cPos(newEvent, false);
    }
  }

  getStyleBlock() {
    let { width, height } = this.picker;
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
    const { width: W, height: H, pxX, pxY } = this.picker;
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

const mapStateToProps = ({
  cp_settings: { H, S, V, rgbMain },
  resize,
  user_options: { style },
}: any): StateProps => {
  return {
    H,
    rgbMain,
    S,
    V,
    resize,
    style_options: style,
  };
};
const mapDispatchToProps: DispatchProps = {
  add_color: Action.eventHSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Picker);
