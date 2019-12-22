import React, { PureComponent } from 'react';
import * as Action from '../../actions';
import { connect } from 'react-redux';
import Convert from '../../options/convert';
import Model from '../../options/modelsColor';
import { IStrictOptions } from '../../interfaces';
import './styles.css';

// Интерфейсы
interface StateProps {
  H: number;
  S: number;
  V: number;
  rgbMain: number[];
  style_options: IStrictOptions;
}
interface DispatchProps {
  add_color: (mas: any) => void;
}

type Props = StateProps & DispatchProps;

// Компонент
export class Picker extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.mouseDown = this.mouseDown.bind(this);
    this.touchMoveStart = this.touchMoveStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.cPos = this.cPos.bind(this);
  }

  state = {
    on: false,
  };

  picker = {
    pxX: this.props.style_options.picker.width / 100,
    pxY: this.props.style_options.picker.height / 100,
    left: 0,
    top: 0,
  };

  blockRef: any = React.createRef();

  styleCircle = {};
  styleBlock = {};

  componentDidMount() {
    this.updateCoords();
  }
  componentDidUpdate(prevProps) {
    let { style_options } = prevProps;
    let { style_options: nst } = this.props;
    let { picker } = this;
    // picker, circle
    let { picker: p } = nst;
    let { width: pw, height: ph } = p;
    if (style_options !== nst) {
      picker.pxX = pw / 100;
      picker.pxY = ph / 100;

      this.updateCoords();
      this.forceUpdate();
    }
  }

  handleMouseMove = e => {
    this.cPos(e, true);
  };

  mouseDown(e) {
    this.updateCoords();
    this.cPos(e, true);

    document.addEventListener('mousemove', this.handleMouseMove);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', this.handleMouseMove);
    };
  }

  updateCoords() {
    let block = this.blockRef.current;
    let { left, top } = block.getBoundingClientRect();
    this.picker.left = left;
    this.picker.top = top;
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();

    const { pxX, pxY, left: positX, top: positY } = this.picker;
    const { width, height } = this.props.style_options.picker;

    let left = +(c.clientX - positX).toFixed(2);
    let top = +(c.clientY - positY).toFixed(2);

    // Проверка left
    left = left < 0 ? 0 : left > width ? width : left;

    // Проверка top
    top = top > height ? height : top < 0 ? 0 : top;

    const S = Math.ceil(left / pxX);
    const V = Math.ceil(Math.abs(top / pxY - 100));

    this.props.add_color([null, S, V]);
  }

  touchMoveStart(e) {
    this.updateCoords();
    this.touchMove(e);
  }

  touchMove(e: any) {
    // e.preventDefault();
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
    let { width, height } = this.props.style_options.picker;
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
    const { width, height } = this.props.style_options.circle;
    const { width: W, height: H } = this.props.style_options.picker;
    const { pxX, pxY } = this.picker;
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
        onMouseDown={this.mouseDown}
        onTouchStart={this.touchMoveStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchMove}
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

const mapStateToProps = ({ H, S, V, rgbMain, options }: any) => {
  return {
    H,
    S,
    V,
    rgbMain,
    style_options: options,
  };
};
const mapDispatchToProps: DispatchProps = {
  add_color: Action.eventHSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Picker);
