import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  Observable,
  GraphQLResponse,
  Disposable,
} from "relay-runtime";
import { createClient } from "graphql-ws";
import { RelayObservable } from "relay-runtime/lib/network/RelayObservable";

const URL = "localhost:8000/graphql";
const HTTP_ENDPOINT = `http://${URL}`;
const WS_ENDPOINT = `ws://${URL}`;

const wsClient = createClient({
  url: WS_ENDPOINT,
});

const fetchFn: FetchFunction = async (request, variables) => {
  const additionalHeaders: { [key: string]: string } = {};
  const authToken = localStorage.getItem("authtoken");
  if (authToken) {
    additionalHeaders["Authorization"] = `Token ${authToken}`;
  }

  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await resp.json();
};

const subscribeFn = (
  operation: any,
  variables: any
): RelayObservable<GraphQLResponse> | Disposable => {
  return Observable.create((sink: any) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink
    );
  });
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn, subscribeFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
