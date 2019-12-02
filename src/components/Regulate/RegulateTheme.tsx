import React, { Component } from 'react';
type Props = {};

class RegulateTheme<TProps = Props> extends Component<TProps> {
  constructor(props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0,
    x: 0,
  };
  diff = 0;
  styleCircle = {};

  updateCoords() {
    let block = this.regulateLine.current;
    let { left } = block.getBoundingClientRect();
    this.line.left = left;
  }
  updateElem() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;
    line.x = elem.offsetWidth / this.diff;
  }

  hookDidMount() {}
  componentDidMount() {
    let elem = this.regulateLine.current;
    this.updateElem();

    // this.setState({});
    this.forceUpdate();
    // this.hookDidMount();

    // Events
    elem.onmousedown = e => {
      this.cPos(e, true);
      document.onmousemove = e => this.cPos(e, true);

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };

    elem.addEventListener('touchstart', this.touchMove, false);
    elem.addEventListener('touchend', this.touchMove, false);
    elem.addEventListener('touchmove', this.touchMove, false);
  }

  touchMove(e: any) {
    e.stopPropagation();
    var touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const newEvent = {
        clientX: touches[i].pageX,
        clientY: touches[i].pageY,
      };
      this.cPos(newEvent, false);
    }
  }

  handleDown(e: any) {
    document.onmousemove = e => this.cPos(e, true);

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  cPos(c: any, bool: boolean) {
    if (bool) c.preventDefault();
    const { line } = this;
    let left, a;
    left = Number(c.clientX - line.left).toFixed(2);
    a = left < 0 ? 0 : left;
    a = a > line.w ? line.w : a;
    this.hookCPos(a);
  }

  hookCPos(a: number) {}

  getLeft() {
    return 0;
  }

  stylingCircle() {
    const { line } = this;

    let left = this.getLeft();

    left = left < 0 ? 0 : left;
    left = left > line.w ? line.w : left;

    this.styleCircle = {
      left: left + 'px',
    };
  }
}

export default RegulateTheme;
