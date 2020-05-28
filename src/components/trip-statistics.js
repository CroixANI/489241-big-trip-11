import AbstractComponent from "./abstract-component.js";
import CountStatistics from "../utils/statistics.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 55;
const MONEY_CHART_CANVAS_SELECTOR = `.statistics__chart--money`;
const TRANSPORT_CHART_CANVAS_SELECTOR = `.statistics__chart--transport`;
const TIME_CHART_CANVAS_SELECTOR = `.statistics__chart--time`;

const createChart = (element, title, data, labels, formatter) => {
  const formattedLabels = labels.map((label) => label.toUpperCase());
  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: formattedLabels,
      datasets: [{
        data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createMoneyChart = (element, moneyStatistic) => {
  return createChart(element, `MONEY`, moneyStatistic.data, moneyStatistic.labels, (val) => `€ ${val}`);
};

const createTransportChart = (element, transportStatistic) => {
  return createChart(element, `TRANSPORT`, transportStatistic.data, transportStatistic.labels, (val) => `${val}x`);
};

const createTimeChart = (element, timeStatistic) => {
  return createChart(element, `TIME`, timeStatistic.data, timeStatistic.labels, (val) => `${val}H`);
};

const createTripStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class TripStatisticsComponent extends AbstractComponent {
  constructor(points) {
    super();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
    this._points = points;
    this._renderStatistics();
  }

  getTemplate() {
    return createTripStatisticsTemplate();
  }

  _renderStatistics() {
    const element = this.getElement();
    const moneyCanvasElement = element.querySelector(MONEY_CHART_CANVAS_SELECTOR);
    const transportCanvasElement = element.querySelector(TRANSPORT_CHART_CANVAS_SELECTOR);
    const timeCanvasElement = element.querySelector(TIME_CHART_CANVAS_SELECTOR);

    const moneyStatistic = CountStatistics.countMoneyStatistics(this._points);
    const transportStatistic = CountStatistics.countTransportStatistics(this._points);
    const timeStatistic = CountStatistics.countTimeStatistics(this._points);

    moneyCanvasElement.height = BAR_HEIGHT * moneyStatistic.labels.length;
    transportCanvasElement.height = BAR_HEIGHT * transportStatistic.labels.length;
    timeCanvasElement.height = BAR_HEIGHT * timeStatistic.labels.length;

    this._moneyChart = createMoneyChart(moneyCanvasElement, moneyStatistic);
    this._transportChart = createTransportChart(transportCanvasElement, transportStatistic);
    this._timeChart = createTimeChart(timeCanvasElement, timeStatistic);
  }
}
