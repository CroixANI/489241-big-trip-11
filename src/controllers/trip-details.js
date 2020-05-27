import TripDetailsComponent from "../components/trip-details.js";
import TripDetails from "../data/trip-details.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";

export default class TripDetailsController {
  constructor(containerElement, tripModel) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;
    this._component = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._tripModel.setOnDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._component;
    const tripDetails = new TripDetails(this._tripModel);
    this._component = new TripDetailsComponent(tripDetails);
    if (oldComponent) {
      replace(this._component, oldComponent);
    } else {
      render(this._containerElement, this._component, constants.RENDER_POSITIONS.AFTER_BEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
