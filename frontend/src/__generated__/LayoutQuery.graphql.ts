/**
 * @generated SignedSource<<485d899ed8417dfc9114b66ad595087f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LayoutQuery$variables = {
  id: string;
};
export type LayoutQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"FriendSuggestionsFragment" | "FriendsFragment" | "UserInfoFragment">;
  } | null;
};
export type LayoutQuery = {
  response: LayoutQuery$data;
  variables: LayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "friends(first:3)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "friendSuggestions(first:3)"
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "427c941d029f053d7f4c0344a2b764fa",
    "id": null,
    "metadata": {},
    "name": "LayoutQuery",
    "operationKind": "query",
    "text": "query LayoutQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    ...UserInfoFragment\n    ...FriendsFragment\n    ...FriendSuggestionsFragment\n    id\n  }\n}\n\nfragment FriendFragment on User {\n  id\n  username\n  email\n  firstName\n  lastName\n}\n\nfragment FriendSuggestionsFragment on User {\n  friendSuggestions(first: 3) {\n    edges {\n      node {\n        id\n        ...FriendFragment\n      }\n    }\n  }\n}\n\nfragment FriendsFragment on User {\n  friends(first: 3) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...FriendFragment\n      }\n    }\n  }\n}\n\nfragment UserInfoFragment on User {\n  username\n  email\n  firstName\n  lastName\n}\n"
  }
};
})();

(node as any).hash = "102f9f19b94329f34d87b8c7164c79bb";

export default node;
