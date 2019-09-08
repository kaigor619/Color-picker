import React, { Component } from "react";
import convert from "../../options/convert";
import { ThemeStore } from "../../interfaces";
import { connect } from "react-redux";
import * as Action from "../../actions";

interface StateProps {
  H: number;
}

interface DispatchProps {
  add_color: (n: number) => void;
}

type Props = StateProps & DispatchProps;

class RegulateColor extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleDown = this.handleDown.bind(this);
  }
  regulateLine: any = React.createRef();

  line = {
    w: 0,
    h: 0,
    left: 0
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
  }

  handleDown(e: any) {
    const { line } = this;
    let left;
    this.lineMove = true;
    document.onmousemove = (c: any) => {
      left = c.clientX - line.left;
      left = left < 0 ? 0 : left;
      left = left > line.w ? line.w : left;
      this.setState({ left });

      const h = convert.getHfromPosit(left, line.w);
      this.props.add_color(h);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      this.lineMove = false;
    };
  }
  render() {
    let left;
    const { lineMove, line } = this;
    if (lineMove) {
      left = this.state.left;
    } else {
      const { H } = this.props;
      left = Math.abs((H - 360) * (line.w / 360)) + "px";
    }
    const style = {
      left
    };

    return (
      <div className="wrap_line_color line">
        <div
          id="ss_line"
          className="hue_color line_color"
          ref={this.regulateLine}
        ></div>
        <div
          className="picker_slider"
          id="line_circle"
          onMouseDown={this.handleDown}
          style={style}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = ({ H }: any): StateProps => {
  return {
    H
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add_color: (h: number) => {
      dispatch(Action.change_h(h));
      dispatch(Action.syncRGB());
    }
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegulateColor);
