import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { FETCH_TYPE } from "@app/shared/constants/common";
import { HttpOptions } from "@core/services/http/http.type";
import {
  Banner,
  CreateBannerDto,
  UpdateBannerDto,
} from "@app/models/banner.model";

export type BannerPaginationOption = PaginationOption & {
  fetchType?: FETCH_TYPE;
};

class _BannerService {
  public getList(options?: BannerPaginationOption): Observable<any> {
    return HttpService.get("/banners", {
      queryParams: options,
    } as HttpOptions).pipe(pluck("result"));
  }

  public createBanner(banner: CreateBannerDto): Observable<Banner> {
    return HttpService.post("/banners", {
      body: { ...banner },
    }).pipe(map((response: any) => new Banner(response.result.data)));
  }

  public updateBanner(
    bannerId: number,
    updateBannerDto: UpdateBannerDto
  ): Observable<Banner> {
    return HttpService.patch(`/banners/${bannerId}`, {
      body: {
        title: updateBannerDto.title,
        type: updateBannerDto.type,
      },
    }).pipe(map((response: any) => new Banner(response.result.data)));
  }

  public uploadBannerImage(bannerId: number, file: File): Observable<Banner> {
    const formData = {
      file: file,
    };

    return HttpService.put(`/banners/${bannerId}/images`, {
      body: formData,
      multipart: true,
    }).pipe(map((response: any) => new Banner(response.result.data)));
  }

  public changeStatus(
    bannerId: number,
    newStatus: boolean
  ): Observable<Banner> {
    return HttpService.patch(`/banners/${bannerId}/status`, {
      body: {
        isActive: newStatus,
      },
    } as HttpOptions).pipe(
      map((response: any) => new Banner(response.result.data))
    );
  }

  public deleteBanner(bannerId: number): Observable<Banner> {
    return HttpService.delete(`/banners/${bannerId}`).pipe(
      map((response: any) => new Banner(response.result.data))
    );
  }
}

const BannerService = new _BannerService();
export default BannerService;
