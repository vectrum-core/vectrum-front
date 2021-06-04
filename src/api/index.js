import httpService from "./http";
import apiAuthorize from "./apiAuthorize";
import vectrumService from "./vectrum";
import profile from "./profile";
import rates from "./rates";



const api = ({
  options,
  apiKey,
  getAuthCredentials,
  reauthenticate,
}) => {
  const rootUrl = options.domains.root;
  const apiUrl = options.domains.api;
  const nodeUrl = options.domains.node;
  const hyperionUrl = options.domains.hyperion;

  const http = httpService({ apiKey, });
  const authorizedHttp = apiAuthorize(http, getAuthCredentials, reauthenticate);
  const vectrum = vectrumService({ nodeUrl, hyperionUrl });

  const baseApi = {
    rootUrl,
    apiUrl,
    nodeUrl,
    hyperionUrl,
    ...http,
    authorizedGet: authorizedHttp.get,
    authorizedPost: authorizedHttp.post,
    authorizedPut: authorizedHttp.put,
    authorizedPatch: authorizedHttp.patch,
    authorizedDelete: authorizedHttp.deleteRequest,
    vectrum,
  };

  return {
    ...http,
    ...profile({ ...baseApi }),
    vectrum,
    ...rates({ ...baseApi }),
  };
}

export default api;
