import TripStatisticsComponent from "../components/trip-statistics.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";

export default class TripStatisticsController {
  constructor(containerElement, tripModel) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;
    this._component = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._isHidden = true;
    this._tripModel.setOnDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._component;
    this._component = new TripStatisticsComponent(this._tripModel.getAllPoints());
    if (oldComponent) {
      replace(this._component, oldComponent);
    } else {
      render(this._containerElement, this._component, constants.RENDER_POSITIONS.AFTER_END);
    }
  }

  show() {
    this._isHidden = false;
    this._component.show();
  }

  hide() {
    this._isHidden = true;
    this._component.hide();
  }

  _onDataChange() {
    this.render();

    if (this._isHidden) {
      this.hide();
    } else {
      this.show();
    }
  }
}
