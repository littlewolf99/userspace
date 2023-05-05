/**
 * @generated SignedSource<<b57bb34570a9988c0f3de56b0cc3bedd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FriendFragment$data = {
  readonly email: string;
  readonly firstName: string;
  readonly id: string;
  readonly lastName: string;
  readonly username: string;
  readonly " $fragmentType": "FriendFragment";
} | null;
export type FriendFragment$key = {
  readonly " $data"?: FriendFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FriendFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendFragment",
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
      "path": "id"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      "action": "NONE",
      "path": "username"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      "action": "NONE",
      "path": "email"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      "action": "NONE",
      "path": "firstName"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      "action": "NONE",
      "path": "lastName"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "7fe85b89864563f1b6e2dc3b276356ee";

export default node;
