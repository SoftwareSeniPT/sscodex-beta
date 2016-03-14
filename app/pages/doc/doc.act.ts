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

export function getDoc(slug) {
  "use strict";
  return function(dispatch) {
    dispatch(loadingDoc());
    fetch(`https://public-api.wordpress.com/rest/v1.1/sites/sscodex.wordpress.com/posts/slug:${slug}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(loadDoc(json));
    });
  };
}
