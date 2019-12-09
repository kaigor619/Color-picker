import PresentColorTheme from './PresentColor';
import { connect } from 'react-redux';
import { ThemeStore } from '../../interfaces';
import Model from '../../options/modelsColor';
import './styles.css';

interface StateProps {
  rgbMain: number[];
  opacity: number;
}

type Props = StateProps;

class PresentColorOut extends PresentColorTheme<Props> {
  stylingPresent() {
    let { opacity, rgbMain } = this.props;
    this.stylePresent = {
      backgroundColor: Model.rgb.getString(rgbMain, opacity),
    };
  }
}

const mapStateToProps = ({ rgbMain, opacity }: ThemeStore) => {
  return {
    rgbMain,
    opacity,
  };
};

export default connect(
  mapStateToProps,
  {},
)(PresentColorOut);
