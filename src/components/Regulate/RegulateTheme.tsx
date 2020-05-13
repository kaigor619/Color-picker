import React, { PureComponent } from 'react';
type Props = {};

class RegulateTheme<TProps = Props> extends PureComponent<TProps> {
  constructor(props) {
    super(props);
    this.cPos = this.cPos.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
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
    let elem = this.regulateLine.current;
    let { left } = elem.getBoundingClientRect();
    this.line.left = left;
  }
  updateElem() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.x = elem.offsetWidth / this.diff;
    this.updateCoords();
  }
  handleMouseMove(e) {
    this.cPos(e, true);
  }

  mouseDown(e) {
    this.updateCoords();
    this.cPos(e, true);
    document.addEventListener('mousemove', this.handleMouseMove);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', this.handleMouseMove);
    };
  }
  touchStart(e) {
    this.updateCoords();
    this.touchMove(e);
  }
  componentDidMount() {
    this.updateElem();
    this.forceUpdate();
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

    left = left < 0 ? 0 : left > line.w ? line.w : left;

    this.styleCircle = {
      left: left + 'px',
    };
  }
}

export default RegulateTheme;
