/**
 * @generated SignedSource<<39b9907d3d3a10c697de3573aea352d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserInfoFragment$data = {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly " $fragmentType": "UserInfoFragment";
} | null;
export type UserInfoFragment$key = {
  readonly " $data"?: UserInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserInfoFragment",
  "selections": [
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

(node as any).hash = "a41fbf59706392aaf21dace8c3aada18";

export default node;
