import xhr from "xhr";
import { solrQuery, solrSuggestQuery } from "./solr-query";

const MAX_INT = 2147483647;

let server: any = {};

// Determine the necessary options for the XHR request based on settings.
export const getXHROptions = (query, queryString) => {
  // When using the proxy to query solr, make a GET request
  // and append the query in the QS.
  let options = {
    data: null,
    headers: null,
    url: `${query.url}?${queryString}`,
    method: "GET"
  };

  // When querying solr directly, make a POST request
  // with the query as form data.
  if (query.proxyIsDisabled) {
    options = {
      url: query.url,
      data: queryString,
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        ...(query.userpass ? {"Authorization": "Basic " + query.userpass} : {})
      }
    };
  }

  return options;
};

server.performXhr = function (options, accept, reject = function () {
  console.warn("Undefined reject callback! ");
  (console.trace || function () {
  })();
}) {
  xhr(options, accept, reject);
};

server.submitQuery = (query?, callback?) => {
  callback({type: "SET_RESULTS_PENDING"});

  const queryString = solrQuery(query);
  const options = getXHROptions(query, queryString);

  server.performXhr(options, (err, resp) => {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback({type: "SET_RESULTS", data: JSON.parse(resp.body)});
    } else {
      console.log("Server error: ", err && resp.statusCode);
    }
  });
};

server.submitSuggestQuery = (suggestQuery, callback) => {
  callback({type: "SET_SUGGESTIONS_PENDING"});

  const queryString = solrSuggestQuery(suggestQuery);
  const options = getXHROptions(suggestQuery, queryString);

  server.performXhr(options, (err, resp) => {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback({type: "SET_SUGGESTIONS", data: JSON.parse(resp.body)});
    } else {
      console.log("Server error: ", err && resp.statusCode);
    }
  });
};

server.fetchCsv = (query, callback) => {
  server.performXhr({
    url: query.url,
    data: solrQuery({...query, rows: MAX_INT}, {
      wt: "csv"}),
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      ...(query.userpass ? {"Authorization": "Basic " + query.userpass} : {})
    }
  }, (resp) => {
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      callback(resp.body);
    } else {
      console.log("Server error: ", resp.statusCode);
    }
  });
};

export default server;
