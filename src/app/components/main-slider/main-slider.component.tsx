import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Banner } from "@app/models/banner.model";
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

function MainSlider() {
  const { subscribeUntilDestroy } = useObservable();

  const [banners, setBanners] = useState<Banner[]>([]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box paddingTop={5} paddingX={5.5}>
      {!!banners.length && (
        <Box style={{ position: "relative" }}>
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
            {banners.map((item: Banner) => (
              <div key={item.id}>
                <img src={buildImageSrc(item.imageUrl ?? "")} alt="" />
              </div>
            ))}
          </Carousel>
          <div className="menu">
            <ul>
              <li>
                <Link to="">
                  <i className="fa fa-bars"></i> Danh mục sản phẩm
                </Link>
                <ul className="sub-menu">
                  <li className="has-child">
                    <Link to="">Web</Link>
                    <ul className="sub-menu1">
                      <li>
                        <Link to="">HTML</Link>
                      </li>
                      <li>
                        <Link to="">CSS</Link>
                      </li>
                      <li>
                        <Link to="">Javascript</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="">Java</Link>
                  </li>
                  <li>
                    <Link to="">Python</Link>
                  </li>
                  <li>
                    <Link to="">C++</Link>
                  </li>
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
