import TripFilterComponent from "../components/trip-filter.js";
import constants from "../data/constants.js";
import {render} from "../utils/render.js";

export default class TripFilterController {
  constructor(containerElement, tripModel) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;

    this._currentFilter = constants.FilterType.EVERYTHING;
  }

  render() {
    render(this._containerElement, new TripFilterComponent(), constants.RENDER_POSITIONS.AFTER_END);
  }
}
