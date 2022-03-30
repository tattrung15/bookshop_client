import bannerDangKy from "@app/assets/images/banner_dangky_mail.jpg";
import bannerDoremon from "@app/assets/images/doremon.png";
import bannerWingsbooks from "@app/assets/images/banner_wingsbooks.jpg";
import imageNotFound from "@app/assets/images/image-not-found.jpg";
import { PaginationOption } from "@core/services/http/http.service";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Category as CategoryIcon,
  Book as BookIcon,
  Image as ImageIcon,
  Home as HomeIcon,
  ViewCarousel as ViewCarouselIcon,
} from "@material-ui/icons";
import { MenuItem } from "../types/menu-item.type";

export enum FETCH_TYPE {
  ADMIN = 1,
  USER = 2,
  ALL = 3,
}

export enum BANNER_TYPE {
  CATEGORY = 1,
  PRODUCT = 2,
}

export const BANNER_TYPE_MAP = {
  [BANNER_TYPE.CATEGORY]: "Category",
  [BANNER_TYPE.PRODUCT]: "Product",
};

export enum PRODUCT_TYPE {
  HAVE_IMAGE = "have-image",
  NO_IMAGE = "no-image",
  NO_IMAGE_ALL = "no-image-all",
}

export enum TYPE_ALERT {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export { bannerDangKy, bannerDoremon, bannerWingsbooks, imageNotFound };

export const PAGING_DEFAULT_LIMIT = 10;
export const STRING_LENGTH_LIMIT = 255;
export const DEFAULT_DATE_FORMAT = "YYYY/MM/DD";
export const DEFAULT_DATETIME_FORMAT = "YYYY/MM/DD HH:mm:ss";

export const DEFAULT_PAGINATION_OPTION: PaginationOption = {
  page: 1,
  perPage: PAGING_DEFAULT_LIMIT,
};

export const mainMenuItems: MenuItem[] = [
  {
    linkTo: "/",
    tooltip: "Home",
    mainContent: "Home",
    icon: HomeIcon,
  },
  {
    linkTo: "/admin",
    tooltip: "Dashboard",
    mainContent: "Dashboard",
    icon: DashboardIcon,
  },
  {
    linkTo: "/admin/user-management",
    tooltip: "User management",
    mainContent: "Users",
    icon: PeopleIcon,
  },
  {
    linkTo: "/admin/category-management",
    tooltip: "Category management",
    mainContent: "Categories",
    icon: CategoryIcon,
  },
  {
    linkTo: "/admin/product-management",
    tooltip: "Book management",
    mainContent: "Products",
    icon: BookIcon,
  },
  {
    linkTo: "/admin/product-image-management",
    tooltip: "Product image management",
    mainContent: "Product images",
    icon: ImageIcon,
  },
  {
    linkTo: "/admin/sale-order-management",
    tooltip: "Sale order management",
    mainContent: "Sale orders",
    icon: ReceiptIcon,
  },
  {
    linkTo: "/admin/banner-management",
    tooltip: "Banner management",
    mainContent: "Banner",
    icon: ViewCarouselIcon,
  },
];
