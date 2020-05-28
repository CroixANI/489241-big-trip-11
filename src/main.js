import Backend from "./api/backend.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import TripModel from "./models/trip.js";
import MenuComponent, {MENU_ITEMS} from "./components/menu.js";
import TripDetailsController from "./controllers/trip-details.js";
import TripStatisticsController from "./controllers/trip-statistics.js";
import TripFilterController from "./controllers/trip-filter.js";
import TripController from "./controllers/trip.js";
import BackendCache from "./data/backend-cache.js";
import constants from "./data/constants.js";
import {render} from "./utils/render.js";

const PAGE_HEADER_SELECTOR = `.page-header`;
const MAIN_CONTAINER_SELECTOR = `.trip-main`;
const MENU_HEADER_SELECTOR = `.trip-controls .trip-view-header`;
const FILTER_HEADER_SELECTOR = `.trip-controls .trip-filter-header`;
const TRIP_CONTAINER_SELECTOR = `main .trip-events`;
const ADD_NEW_BUTTON_SELECTOR = `.trip-main__event-add-btn`;

const BACKEND_ENDPOINT = `https://11.ecmascript.pages.academy/big-trip`;
const BACKEND_AUTHORIZATION = `Basic dXNlcjpzdXBlcnBhc3N3b3Jk`;

const STORE_PREFIX = `trip-points`;
const STORE_VERSION = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;

const sitePageHeaderElement = document.querySelector(PAGE_HEADER_SELECTOR);
const tripMainElement = sitePageHeaderElement.querySelector(MAIN_CONTAINER_SELECTOR);
const tripViewHeaderElement = tripMainElement.querySelector(MENU_HEADER_SELECTOR);
const tripFilterHeaderElement = tripMainElement.querySelector(FILTER_HEADER_SELECTOR);
const tripEventsElement = document.querySelector(TRIP_CONTAINER_SELECTOR);

const renderAll = () => {
  const backend = new Backend(BACKEND_ENDPOINT, BACKEND_AUTHORIZATION);
  const store = new Store(STORE_NAME, window.localStorage);
  const provider = new Provider(backend, store);
  const tripModel = new TripModel();
  const tripDetailsController = new TripDetailsController(tripMainElement, tripModel);
  const menuComponent = new MenuComponent();
  const tripFilterController = new TripFilterController(tripFilterHeaderElement, tripModel);
  const tripController = new TripController(tripEventsElement, tripModel, provider);
  const tripStatisticsController = new TripStatisticsController(tripEventsElement, tripModel);

  menuComponent.setOnMenuChangedHandler((menuItem) => {
    if (menuItem === MENU_ITEMS.TABLE) {
      tripController.show();
      tripStatisticsController.hide();
    } else {
      tripController.hide();
      tripStatisticsController.show();
    }
  });

  document.querySelector(ADD_NEW_BUTTON_SELECTOR)
      .addEventListener(`click`, () => {
        menuComponent.navigateToTable();
        tripController.onNewButtonClicked();
      });

  tripDetailsController.render();
  render(tripViewHeaderElement, menuComponent, constants.RENDER_POSITIONS.AFTER_END);
  tripFilterController.render();
  tripController.render();
  tripStatisticsController.render();
  tripStatisticsController.hide();

  provider.getDestinations().then((data) => {
    BackendCache.setDestinations(data);
  }).then(() => provider.getOffers().then((data) => {
    BackendCache.setOffers(data);
  }).then(() => provider.getPoints().then((data) => {
    tripModel.setPoints(data);
  })));
};

renderAll();
