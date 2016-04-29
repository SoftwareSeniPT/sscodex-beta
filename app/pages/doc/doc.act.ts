const fetch = require("isomorphic-fetch");

function loadingDoc() {
  "use strict";
  return {
    type: "START_LOADING_DOC"
  };
}

function loadDoc(data) {
  "use strict";
  return {
    type: "LOAD_DOC",
    data: data
  };
}

function loadSearchDoc(data) {
  "use strict";
  return {
    type: "LOAD_SEARCH_DOC",
    data: data
  };
}

function onSearchPage(status) {
  "use strict";
  return {
    type: "UPDATE_SEARCH_PAGE_VISIBILITY",
    status: status
  };
}

export function getDoc(slug) {
  "use strict";
  return function(dispatch) {
    dispatch(loadingDoc());
    dispatch(onSearchPage(false));
    fetch(`https://public-api.wordpress.com/rest/v1.1/sites/sscodex.wordpress.com/posts/slug:${slug}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(loadDoc(json));
    });
  };
}

export function searchDoc(query) {
  "use strict";
  return function(dispatch) {
    dispatch(loadingDoc());
    dispatch(onSearchPage(true));
    if (query === "") {
      dispatch(onSearchPage(false));
    } else {
      fetch(`https://public-api.wordpress.com/rest/v1.1/sites/sscodex.wordpress.com/posts/?search=${query}&number=10&fields=ID,title,slug,excerpt`)
        .then((response) => response.json())
        .then((json) => {
          dispatch(loadSearchDoc(json));
        });
    }
  };
}
