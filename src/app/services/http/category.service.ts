import { map } from "rxjs/operators";
import HttpService, {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@app/models/category.model";

export type CategoryPaginationOption = PaginationOption & {
  fetchType?: number;
};

class _CategoryService {
  public getList(options?: CategoryPaginationOption) {
    return HttpService.get("/categories", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public getDetail(categoryId: number | string) {
    return HttpService.get(`/categories/${categoryId}`).pipe(
      map<any, Category>((response) => response.result.data)
    );
  }

  public createCategory(category: CreateCategoryDto) {
    return HttpService.post("/categories", {
      body: { ...category },
    }).pipe(map<any, Category>((response) => response.result.data));
  }

  public updateCategory(
    categoryId: number,
    updateCategoryDto: Partial<UpdateCategoryDto>
  ) {
    return HttpService.patch(`/categories/${categoryId}`, {
      body: { ...updateCategoryDto },
    }).pipe(map<any, Category>((response) => response.result.data));
  }

  public deleteCategory(categoryId: number) {
    return HttpService.delete(`/categories/${categoryId}`).pipe(
      map<any, Category>((response) => response.result.data)
    );
  }
}

const CategoryService = new _CategoryService();
export default CategoryService;
