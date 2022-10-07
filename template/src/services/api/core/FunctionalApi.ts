// ________                                 __      __                                __         ______   _______  ______
// |        \                               |  \    |  \                              |  \       /      \ |       \|      \
// | ########__    __  _______    _______  _| ##_    \##  ______   _______    ______  | ##      |  ######\| #######\\######
// | ##__   |  \  |  \|       \  /       \|   ## \  |  \ /      \ |       \  |      \ | ##      | ##__| ##| ##__/ ## | ##
// | ##  \  | ##  | ##| #######\|  ####### \######  | ##|  ######\| #######\  \######\| ##      | ##    ##| ##    ## | ##
// | #####  | ##  | ##| ##  | ##| ##        | ## __ | ##| ##  | ##| ##  | ## /      ##| ##      | ########| #######  | ##
// | ##     | ##__/ ##| ##  | ##| ##_____   | ##|  \| ##| ##__/ ##| ##  | ##|  #######| ##      | ##  | ##| ##      _| ##_
// | ##      \##    ##| ##  | ## \##     \   \##  ##| ## \##    ##| ##  | ## \##    ##| ##      | ##  | ##| ##     |   ## \
// \##       \######  \##   \##  \#######    \####  \##  \######  \##   \##  \####### \##       \##   \## \##      \######
//

import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import LoadingPortal from 'src/components/base/LoadingPortal';
import qs from 'qs';
import {REQUEST_TIMEOUT} from 'src/configs/environment';
import {Button} from 'src/components/base/DialogAlertResult';

/** Basic configuration for all APIs */
type BaseConfig = {
  /** Base url of the api */
  baseUrl: string;

  /** Axios default header configuration for the whole api, for example: token, timeout, accept, content-type,... */
  defaultHeader: () => any;

  /** Callback for post processing data after request succeeded */
  onSuccess: <R>(value: any, uiConfig: UIConfig) => R | Promise<R>;

  /** Callback for handling errors */
  onError: (error: any, uiConfig: UIConfig) => any;

  /**Callback for handling interceptor request and response */
  onInterceptorApi?: {
    request?: {
      onFullfilled?: (
        config: AxiosRequestConfig,
      ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
      onRejected?: (error: any) => any;
    };
    response?: {
      onFullfilled?: (
        res: AxiosResponse,
      ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
      onRejected?: (error: any) => any;
    };
  };
};

/** Configuration used on specific API */
type ApiConfig<I> = {
  /** Endpoint only, eg. /v1/auth/login */
  route: string;

  /** Either request body for POST, PUT or request param for GET, DELETE */
  data: I;

  /** @see UIConfig */
  uiConfig: UIConfig;

  /** Axios header configuration for specific API */
  headers: any;
};

type PopupConfig = {
  popupSuccess?: {
    isShow?: boolean;
    customText?: string;
    customTitle?: string;
    buttons?: Button[];
  };
  popupError?: {
    isShow?: boolean;
    customText?: string;
    customTitle?: string;
    buttons?: Button[];
  };
};

/** Determine additional UI actions */
export type UIConfig = {
  /** Whether show loading or not */
  loading?: boolean;
  /** Message to show on loading screen */
  loadingMessage?: string;

  /** Used for customize popup config */
  popupConfig?: PopupConfig;
};
const defaultUIConfig: UIConfig = {
  loading: true,
  loadingMessage: '',
  popupConfig: {
    popupError: {
      isShow: true,
    },
    popupSuccess: {
      isShow: false,
    },
  },
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Construct an runner instance that call api with pre-defined configurations
 */
export class ApiRunner<I, O> {
  baseConfig: BaseConfig;
  route: string;
  data: I;
  headers: any;
  uiConfig: UIConfig;
  method: RequestMethod;
  isUseInterceptor?: boolean;

  constructor(
    method: RequestMethod,
    baseConfig: BaseConfig,
    apiConfig: ApiConfig<I>,
  ) {
    this.baseConfig = baseConfig;
    this.route = apiConfig.route;
    this.data = apiConfig.data;
    this.uiConfig = apiConfig.uiConfig;
    this.headers = apiConfig.headers;
    this.method = method;
  }

  loading(loading: boolean) {
    this.uiConfig.loading = loading;
    return this;
  }

  loadingMessage(loadingMessage: string) {
    this.uiConfig.loadingMessage = loadingMessage;
    return this;
  }

  configPopup(popupConfig: PopupConfig) {
    this.uiConfig.popupConfig = {
      ...this.uiConfig.popupConfig,
      ...popupConfig,
    };
    return this;
  }

  configHeaders(headers: any) {
    this.headers = {
      ...this.headers,
      ...headers,
    };
    return this;
  }

  setUseInterceptor(isUse: boolean) {
    this.isUseInterceptor = isUse;
    return this;
  }

  configure(uiConfig: UIConfig) {
    this.uiConfig = uiConfig;
    return this;
  }

  /**
   * Invoke function that sends request to server
   * ```
   * const runner = new ApiRunner("GET", baseConfig, apiConfig);
   * runner.run();
   * ```
   * @returns Promise<O> with O is output type/interface
   */
  async run() {
    let url = `${this.baseConfig.baseUrl}${this.route}`;
    let data: I | null = this.data;
    const isQuery = this.method === 'GET' || this.method === 'DELETE';
    if (isQuery && data) {
      const query = qs.stringify(data);
      url = `${url}?${query}`;
      data = null;
    }
    const options = {
      method: this.method,
      url,
      timeout: parseInt(REQUEST_TIMEOUT, 10),
      headers: {
        ...this.baseConfig.defaultHeader(),
        ...(Boolean(this.headers) && this.headers),
      },
    };
    if (data) {
      Object.assign(options, {
        data: data,
      });
    }
    // Update loading message while sending request
    if (this.uiConfig.loading) {
      LoadingPortal.show();
    }
    if (this.uiConfig.loadingMessage) {
      LoadingPortal.setMessage(this.uiConfig.loadingMessage);
    }
    const instance = axios;
    if (this.baseConfig.onInterceptorApi && this.isUseInterceptor) {
      instance.interceptors.request.use(
        this.baseConfig.onInterceptorApi.request?.onFullfilled,
        this.baseConfig.onInterceptorApi.request?.onRejected,
      );
      instance.interceptors.response.use(
        this.baseConfig.onInterceptorApi.response?.onFullfilled,
        this.baseConfig.onInterceptorApi.response?.onRejected,
      );
    }

    try {
      console.log({options});

      const rs = await instance(options);
      return this.baseConfig.onSuccess<O>(rs.data, this.uiConfig);
    } catch (error) {
      this.baseConfig.onError(error, this.uiConfig);
    } finally {
      if (this.uiConfig.loading) {
        LoadingPortal.hide();
      }
    }
  }
}
/**
 * Functional API generator
 * @params @see BaseConfig
 * @returns Object includes GET, POST, PUT, DELETE function accept ApiConfig param, @see ApiConfig
 */
function generateApiService(baseConfig: BaseConfig) {
  const FETCH = <I, O>(
    method: RequestMethod,
    apiConfig: ApiConfig<I>,
  ): ApiRunner<I, O> => {
    return new ApiRunner(method, baseConfig, {
      route: apiConfig.route,
      data: apiConfig.data,
      headers: apiConfig.headers,
      uiConfig: Object.assign(apiConfig.uiConfig, defaultUIConfig),
    });
  };
  const ApiService = {
    GET<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>('GET', {route, data, headers, uiConfig: {}});
    },

    POST<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>('POST', {route, data, headers, uiConfig: {}});
    },

    PUT<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>('PUT', {route, data, headers, uiConfig: {}});
    },

    DELETE<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>('DELETE', {route, data, headers, uiConfig: {}});
    },
  };

  return ApiService;
}

export {generateApiService};
