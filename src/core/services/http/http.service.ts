import {
  catchError,
  finalize,
  map,
  Observable,
  Subject,
  throwError,
} from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import {
  isNullOrUndefined,
  isStrEmpty,
  nullSafetyJSONStringify,
} from "../../helpers/helpers";
import StorageService from "../storage";
import { HttpOptions, HttpMethod } from "./http.type";

type JsonType = string | number | boolean | object | Array<any> | null;

export interface DataSet {
  [key: string]: JsonType;
}

export interface ResponsePagination {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

export type PaginateSearchValue = string | number | boolean | any[];

export interface PaginateOption {
  page?: number;
  perPage?: number;
  total?: number;
  equal?: { [key: string]: PaginateSearchValue };
  like?: { [key: string]: PaginateSearchValue };
  sort?: string;
  in?: { [key: string]: PaginateSearchValue[] };
}

export interface ResponseResult {
  data: DataSet | DataSet[];
  pagination?: ResponsePagination;
}

export interface CoreResponse {
  status: number;
  message: string;
  result?: ResponseResult | DataSet;
}

export class _HttpService {
  public isRequesting$ = new Subject<boolean>();
  public onError$ = new Subject<any>();

  private _commonHeader = {
    "Content-Type": "application/json",
  };

  public get<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public patch<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PATCH, options);
  }

  public delete<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  private request<T>(
    uri: string,
    method: string,
    options?: HttpOptions
  ): Observable<T> {
    const token = this.getAccessToken();
    let url = this.resolveUri(uri);

    if (options?.queryParams) {
      url = url + "?" + this.generateHttpParams(options?.queryParams);
    }

    const body = options?.multipart
      ? this.buildFormData(options?.body)
      : nullSafetyJSONStringify(this.buildBodyData(options?.body));

    this.isRequesting$.next(true);
    return ajax({
      url,
      method,
      body: body,
      headers: {
        ...(options?.multipart
          ? { Accept: "application/json" }
          : this._commonHeader),
        Authorization: token ? `Bearer ${token}` : "",
        ...options?.headers,
      },
    }).pipe(
      map((ajaxResponse) => this.handleResponse<T>(ajaxResponse)),
      catchError((error) => {
        this.onError$.next(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.isRequesting$.next(false);
      })
    );
  }

  protected buildBodyData(data: any) {
    return data || Object.create(null);
  }

  protected buildFormData(data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null) {
        if (data[key] instanceof File) {
          formData.append(key, data[key], data[key].name);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    return formData;
  }

  public handleResponse<T>(ajaxResponse: AjaxResponse<any>): T {
    return ajaxResponse.response;
  }

  private resolveUri(uri: string): string {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.REACT_APP_BASE_API_URL}${uri}`;
  }

  private generateHttpParams(params: object): any {
    const httpParams: string[] = [];
    const objectToQueryString = (obj: object, prefix?: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const k = prefix ? prefix + "[" + key + "]" : key;
          const v = (obj as any)[key];
          if (v !== null && typeof v === "object") {
            objectToQueryString(v, k);
          } else {
            if (!isNullOrUndefined(v) && !isStrEmpty(v.toString())) {
              httpParams.push(k + "=" + v);
            }
          }
        }
      }
    };

    objectToQueryString(params);
    return encodeURI(httpParams.join("&"));
  }

  private getAccessToken(): string | null {
    return (
      StorageService.get("access_token") ||
      StorageService.getSession("access_token")
    );
  }
}

const HttpService = new _HttpService();
export default HttpService;
