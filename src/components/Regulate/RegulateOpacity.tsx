import React, { Component } from "react";
import convert from "../../options/convert";
import { ThemeStore } from "../../interfaces";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface StateProps {
  opacity: number;
}

interface DispatchProps {
  add_color: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateOpacity extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleDown = this.handleDown.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0,
    x: 0
  };
  state = {
    left: 0
  };
  lineMove = false;

  componentDidMount() {
    let elem = this.regulateLine.current;
    let { line } = this;
    line.w = elem.offsetWidth;
    line.h = elem.offsetHeight;
    line.left = elem.getBoundingClientRect().left;

    line.x = line.w / 100;
    this.setState({ left: line.w });
  }

  handleDown(e: any) {
    const { line } = this;
    this.lineMove = true;
    let left;
    document.onmousemove = (c: any) => {
      left = c.clientX - line.left;
      left = left < 0 ? 0 : left;
      left = left > line.w ? line.w : left;
      this.setState({ left });
      let opacity: number = +(Math.floor(left / line.x) * 0.01).toFixed(2);
      this.props.add_color(opacity);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      this.lineMove = false;
    };
  }

  getLeft(): string {
    let { opacity } = this.props;
    let left = (opacity * this.line.x) / 0.01 + "px";
    return left;
  }
  render() {
    let left: string | number = "";
    const { lineMove, line } = this;
    const { opacity } = this.props;
    if (lineMove) {
      left = this.state.left;
    } else {
      left = (opacity * line.x) / 0.01 + "px";
    }
    const style = {
      left
    };

    return (
      <div className="wrap_line_color opacity" ref={this.regulateLine}>
        <div className="opacity_color line_color" id="opacity_color">
          <div className="linear_cover"></div>
        </div>
        <div
          className="picker_slider"
          id="opacity_circle"
          onMouseDown={this.handleDown}
          style={style}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = ({ opacity }: any): StateProps => {
  return {
    opacity
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (opacity: number) => {
      dispatch(Action.change_opacity(opacity));
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateOpacity);
