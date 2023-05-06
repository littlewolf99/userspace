/**
 * @generated SignedSource<<b959ed3bf7f1e4ff4410eaf02e5baeb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendSuggestionsFragment$data = {
  readonly friendSuggestions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"FriendFragment">;
      } | null;
    } | null>;
  };
  readonly " $fragmentType": "FriendSuggestionsFragment";
};
export type FriendSuggestionsFragment$key = {
  readonly " $data"?: FriendSuggestionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FriendSuggestionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendSuggestionsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
        }
      ],
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
            {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "RequiredField",
                  "field": {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  "action": "NONE",
                  "path": "friendSuggestions.edges.node.id"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FriendFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "friendSuggestions(first:3)"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "fe830f557830e0efcfa1f5ef40a7cf3d";

export default node;
