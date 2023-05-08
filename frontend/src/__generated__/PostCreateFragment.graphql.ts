/**
 * @generated SignedSource<<2c4bbd296269f6214889c67ae2ddb849>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCreateFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostCreateFragment";
};
export type PostCreateFragment$key = {
  readonly " $data"?: PostCreateFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCreateFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCreateFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "10400aba95e3e149667eea02dc1f61d5";

export default node;
