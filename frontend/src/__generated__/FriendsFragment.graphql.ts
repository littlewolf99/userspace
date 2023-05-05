/**
 * @generated SignedSource<<5cc93600f8500c3f1971a9ad3d9eb301>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendsFragment$data = {
  readonly friends: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"FriendFragment">;
  } | null> | null;
  readonly " $fragmentType": "FriendsFragment";
};
export type FriendsFragment$key = {
  readonly " $data"?: FriendsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FriendsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "friends",
      "plural": true,
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
          "path": "friends.id"
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "d784369fbf69a7f0097f4680d3f21008";

export default node;
