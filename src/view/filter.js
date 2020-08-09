import {filtersName} from "../mock/filter.js";

const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersName.map((item) => `
      <div class="trip-filters__filter">
        <input id="filter-${item.split(` `)[0].toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.split(` `)[0].toLowerCase()}" checked>
        <label class="trip-filters__filter-label" for="filter-${item.split(` `)[0].toLowerCase()}">${item.split(` `)[0]}</label>
      </div>
      `).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export {createFilterTemplate};
