/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "MDX_Archive": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "OpenApi": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "OpenApiWorker": {
      "type": "sst.cloudflare.Worker"
      "url": string
    }
    "SpotifyClientId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SpotifyClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "gbfm-www": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
export {}
