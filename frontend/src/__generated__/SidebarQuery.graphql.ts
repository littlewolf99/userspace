/**
 * @generated SignedSource<<d0d976e6761d70262d72de4213e0ab2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SidebarQuery$variables = {};
export type SidebarQuery$data = {
  readonly currentUser: {
    readonly " $fragmentSpreads": FragmentRefs<"FriendSuggestionsFragment" | "FriendsFragment" | "UserInfoFragment">;
  } | null;
};
export type SidebarQuery = {
  response: SidebarQuery$data;
  variables: SidebarQuery$variables;
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
v6 = [
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
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
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SidebarQuery",
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
    "name": "SidebarQuery",
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
            "selections": (v6/*: any*/),
            "storageKey": "friends(first:3)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FriendsFragment__friends",
            "kind": "LinkedHandle",
            "name": "friends"
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "UserConnection",
            "kind": "LinkedField",
            "name": "friendSuggestions",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": "friendSuggestions(first:3)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FriendSuggestionsFragmentFragment__friendSuggestions",
            "kind": "LinkedHandle",
            "name": "friendSuggestions"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e6f7b77f0a6d4a079737c702f2f55532",
    "id": null,
    "metadata": {},
    "name": "SidebarQuery",
    "operationKind": "query",
    "text": "query SidebarQuery {\n  currentUser {\n    ...UserInfoFragment\n    ...FriendsFragment\n    ...FriendSuggestionsFragment\n    id\n  }\n}\n\nfragment FriendFragment on User {\n  id\n  username\n  email\n  firstName\n  lastName\n}\n\nfragment FriendSuggestionsFragment on User {\n  friendSuggestions(first: 3) {\n    edges {\n      node {\n        id\n        ...FriendFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment FriendsFragment on User {\n  friends(first: 3) {\n    edges {\n      node {\n        id\n        ...FriendFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment UserInfoFragment on User {\n  username\n  email\n  firstName\n  lastName\n}\n"
  }
};
})();

(node as any).hash = "d445de7db56b90e4ae3beb44077c1472";

export default node;
