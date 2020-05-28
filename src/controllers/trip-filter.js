import TripFilterComponent from "../components/trip-filter.js";
import constants from "../data/constants.js";
import {render, replace} from "../utils/render.js";

export default class TripFilterController {
  constructor(containerElement, tripModel) {
    this._currentFilter = constants.FilterType.EVERYTHING;
    this._containerElement = containerElement;
    this._component = null;
    this._tripModel = tripModel;
    this._tripModel.setFilter(this._currentFilter, true);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._tripModel.setOnFilterChangedHandler(this._onFilterChange);
    this._tripModel.setOnDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._component;
    this._component = new TripFilterComponent();
    this._component.setOnFilterChangedHandler((filterType) => {
      this._currentFilter = filterType;
      this._tripModel.setFilter(filterType);
    });

    Object.values(constants.FilterType).map((filter) => {
      if (!this._tripModel.countPointsByFilter(filter)) {
        this._component.disableFilter(filter, true);
      }
    });

    if (oldComponent) {
      replace(this._component, oldComponent);
    } else {
      render(this._containerElement, this._component, constants.RENDER_POSITIONS.AFTER_END);
    }
  }

  _onFilterChange() {
    if (this._tripModel.getFilter() !== this._currentFilter) {
      this.render();
    }
  }

  _onDataChange() {
    this.render();
  }
}
