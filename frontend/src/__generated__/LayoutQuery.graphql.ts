/**
 * @generated SignedSource<<6469cc2f84bcd2f8c54114bd62494926>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LayoutQuery$variables = {};
export type LayoutQuery$data = {
  readonly currentUser: {
    readonly " $fragmentSpreads": FragmentRefs<"FriendSuggestionsFragment" | "FriendsFragment" | "UserInfoFragment">;
  } | null;
};
export type LayoutQuery = {
  response: LayoutQuery$data;
  variables: LayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserInfoFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FriendsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FriendSuggestionsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "UserConnection",
            "kind": "LinkedField",
            "name": "friends",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "friends(first:3)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "UserConnection",
            "kind": "LinkedField",
            "name": "friendSuggestions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "friendSuggestions(first:3)"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f25f8ba214ba36f54b4c20eb96da5c61",
    "id": null,
    "metadata": {},
    "name": "LayoutQuery",
    "operationKind": "query",
    "text": "query LayoutQuery {\n  currentUser {\n    ...UserInfoFragment\n    ...FriendsFragment\n    ...FriendSuggestionsFragment\n    id\n  }\n}\n\nfragment FriendFragment on User {\n  id\n  username\n  email\n  firstName\n  lastName\n}\n\nfragment FriendSuggestionsFragment on User {\n  friendSuggestions(first: 3) {\n    edges {\n      node {\n        id\n        ...FriendFragment\n      }\n    }\n  }\n}\n\nfragment FriendsFragment on User {\n  friends(first: 3) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...FriendFragment\n      }\n    }\n  }\n}\n\nfragment UserInfoFragment on User {\n  username\n  email\n  firstName\n  lastName\n}\n"
  }
};
})();

(node as any).hash = "f511971eb42b904ebb0f6ba6a5620b22";

export default node;
