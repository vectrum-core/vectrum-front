import fetch from "isomorphic-fetch";
import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { JsonRpc as Hyperion } from "@eoscafe/hyperion";



export default ({ nodeUrl, hyperionUrl, }) => {
  const reInit = (privateKeys = [], opts = {}) => {
    const nodeEndpoint = opts.endpointNode || nodeUrl;
    const hyperionEndpoint = opts.endpointHyperion || hyperionUrl;

    const hyperion = new Hyperion("https://eos.hyperion.eosrio.io", { fetch }); // TODO

    const rpc = new JsonRpc(nodeEndpoint, { fetch });
    const signatureProvider = new JsSignatureProvider(privateKeys);
    const api = new Api({
      rpc, signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });

    return {
      hyperion,
      rpc, api, signatureProvider,
      nodeEndpoint, hyperionEndpoint,
    };
  }

  const {
    hyperion,
    rpc, api, signatureProvider,
    nodeEndpoint, hyperionEndpoint,
  } = reInit();
  // как-то обновиться когда кошель расшифрован

  return {
    hyperion,
    rpc, api, signatureProvider,
    nodeEndpoint, hyperionEndpoint,
    reInit,
  };
}
