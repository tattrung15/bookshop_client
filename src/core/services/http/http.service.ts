import { Subject } from "rxjs";

export class HttpService {
  public isRequesting$ = new Subject<boolean>();
  public onError$ = new Subject<any>();

  private _commonHeader = {
    "Content-Type": "application/json",
  };
}
