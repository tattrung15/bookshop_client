import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService, {
  PaginationOption,
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
  public getList(options?: CategoryPaginationOption): Observable<any> {
    return HttpService.get("/categories", {
      queryParams: { ...options },
    }).pipe(pluck("result"));
  }

  public createCategory(category: CreateCategoryDto): Observable<Category> {
    return HttpService.post("/categories", {
      body: { ...category },
    }).pipe(map((response: any) => new Category(response.result.data)));
  }

  public updateCategory(
    categoryId: number,
    updateCategoryDto: Partial<UpdateCategoryDto>
  ): Observable<Category> {
    return HttpService.patch(`/categories/${categoryId}`, {
      body: { ...updateCategoryDto },
    }).pipe(map((response: any) => new Category(response.result.data)));
  }

  public deleteCategory(categoryId: number): Observable<Category> {
    return HttpService.delete(`/categories/${categoryId}`).pipe(
      map((response: any) => new Category(response.result.data))
    );
  }
}

const CategoryService = new _CategoryService();
export default CategoryService;
