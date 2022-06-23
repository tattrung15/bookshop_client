import { map } from "rxjs/operators";
import HttpService, {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import { FETCH_TYPE } from "@app/shared/constants/common";
import {
  Banner,
  CreateBannerDto,
  UpdateBannerDto,
} from "@app/models/banner.model";

export type BannerPaginationOption = PaginationOption & {
  fetchType?: FETCH_TYPE;
};

class _BannerService {
  public getList(options?: BannerPaginationOption) {
    return HttpService.get("/banners", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public createBanner(banner: CreateBannerDto) {
    return HttpService.post("/banners", {
      body: { ...banner },
    }).pipe(map<any, Banner>((response) => response.result.data));
  }

  public updateBanner(bannerId: number, updateBannerDto: UpdateBannerDto) {
    return HttpService.patch(`/banners/${bannerId}`, {
      body: {
        title: updateBannerDto.title,
        type: updateBannerDto.type,
      },
    }).pipe(map<any, Banner>((response) => response.result.data));
  }

  public uploadBannerImage(bannerId: number, file: File) {
    const formData = {
      file: file,
    };

    return HttpService.put(`/banners/${bannerId}/images`, {
      body: formData,
      multipart: true,
    }).pipe(map<any, Banner>((response) => response.result.data));
  }

  public changeStatus(bannerId: number, newStatus: boolean) {
    return HttpService.patch(`/banners/${bannerId}/status`, {
      body: {
        isActive: newStatus,
      },
    }).pipe(map<any, Banner>((response) => response.result.data));
  }

  public deleteBanner(bannerId: number) {
    return HttpService.delete(`/banners/${bannerId}`).pipe(
      map<any, Banner>((response) => response.result.data)
    );
  }
}

const BannerService = new _BannerService();
export default BannerService;
