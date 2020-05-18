import TripFilterComponent from "../components/trip-filter.js";
import constants from "../data/constants.js";
import {render} from "../utils/render.js";

export default class TripFilterController {
  constructor(containerElement, tripModel) {
    this._containerElement = containerElement;
    this._tripModel = tripModel;
    this._currentFilter = constants.FilterType.EVERYTHING;
    this._tripModel.setFilter(this._currentFilter);
    this._component = null;
  }

  render() {
    this._component = new TripFilterComponent();
    this._component.addOnFilterEvent((filterType) => {
      this._tripModel.setFilter(filterType);
    });
    render(this._containerElement, this._component, constants.RENDER_POSITIONS.AFTER_END);
  }
}
