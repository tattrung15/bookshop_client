import { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { buildImageSrc } from "@app/shared/helpers/helpers";
import "./main-slider.style.scss";
import useObservable from "@core/hooks/use-observable.hook";
import BannerService, {
  BannerPaginationOption,
} from "@app/services/http/banner.service";
import {
  DEFAULT_PAGINATION_OPTION,
  FETCH_TYPE,
} from "@app/shared/constants/common";
import { ResponseResult } from "@core/services/http/http.service";
import { Banner } from "@app/models/banner.model";
import { Category } from "@app/models/category.model";
import CategoryService, {
  CategoryPaginationOption,
} from "@app/services/http/category.service";

type PropTypes = {
  shouldShowBanner?: boolean;
};

function MainSlider(props: PropTypes) {
  const { shouldShowBanner = true } = props;

  const { subscribeUntilDestroy } = useObservable();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const bannerOptions: BannerPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.USER,
    };

    subscribeUntilDestroy(
      BannerService.getList(bannerOptions),
      (response: ResponseResult) => {
        const data: Banner[] = response.data.map(
          (item: any) => new Banner(item)
        );
        setBanners(data);
      }
    );

    const categoryOptions: CategoryPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.USER,
    };

    subscribeUntilDestroy(
      CategoryService.getList(categoryOptions),
      (response: ResponseResult) => {
        const data: Category[] = response.data.map(
          (item: any) => new Category(item)
        );
        setCategories(data);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box paddingTop={5} paddingX={5.5} marginBottom={2.5}>
      {!!banners.length && (
        <Box style={{ position: "relative", borderTop: "1px solid black" }}>
          {shouldShowBanner && (
            <Carousel
              dynamicHeight={false}
              showStatus={false}
              showThumbs={false}
              interval={4000}
              transitionTime={1000}
              swipeScrollTolerance={50}
              infiniteLoop
              autoPlay
              emulateTouch
            >
              {banners.map((item, index) => (
                <div key={index}>
                  <img src={buildImageSrc(item.imageUrl ?? "")} alt="" />
                </div>
              ))}
            </Carousel>
          )}
          <div className="menu-wrapper">
            <ul>
              <li>
                <Link to="">
                  <i className="fa fa-bars"></i> Danh mục sản phẩm
                </Link>
                <ul className="menu">
                  {!!categories.length &&
                    categories.map((item, index) => (
                      <li
                        key={index}
                        className={clsx({
                          "has-child": !!item.linkedCategories?.length ?? false,
                        })}
                      >
                        <Link to={`/categories/${item.slug}`}>{item.name}</Link>
                        {!!item.linkedCategories?.length && (
                          <ul className="sub-menu">
                            {item.linkedCategories.map((item, index) => (
                              <li key={index}>
                                <Link to={`/categories/${item.slug}`}>
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default MainSlider;
