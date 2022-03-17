import bannerDangKy from "@app/assets/images/banner_dangky_mail.jpg";
import bannerDoremon from "@app/assets/images/doremon.png";
import bannerWingsbooks from "@app/assets/images/banner_wingsbooks.jpg";
import { PaginationOption } from "@core/services/http/http.service";

export { bannerDangKy, bannerDoremon, bannerWingsbooks };

export const PAGING_DEFAULT_LIMIT = 10;
export const STRING_LENGTH_LIMIT = 255;
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

enum FETCH_TYPE {
  ADMIN = 1,
  USER = 2,
}

enum BANNER_TYPE {
  CATEGORY = 1,
  PRODUCT = 2,
}

enum PRODUCT_TYPE {
  HAVE_IMAGE = "have-image",
  NO_IMAGE = "no-image",
}

enum TYPE_ALERT {
  SUCCESS = "success",
  ERROR = "error",
}

const DEFAULT_PAGINATION_OPTION: PaginationOption = {
  page: 1,
  perPage: PAGING_DEFAULT_LIMIT,
};

export {
  FETCH_TYPE,
  BANNER_TYPE,
  PRODUCT_TYPE,
  TYPE_ALERT,
  DEFAULT_PAGINATION_OPTION,
};
