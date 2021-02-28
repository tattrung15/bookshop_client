import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";

const URL = "https://girl.trungbt.xyz/api?page=1";

const createChildren = (n) =>
  range(n).map((i) => (
    <div key={i} style={{ height: 300, background: "#333" }}></div>
  ));

export default function Carousel() {
  const [carousel, setCarousel] = useState({
    children: createChildren(10),
    activeItemIndex: 2,
  });

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setCarousel({ ...carousel, children: data.data });
      });
  }, []);

  const changeActiveItem = (activeItemIndex) => {
    setCarousel({ ...carousel, activeItemIndex: activeItemIndex });
  };

  const { activeItemIndex, children } = carousel;

  return (
    <ItemsCarousel
      // Carousel configurations
      numberOfCards={5}
      gutter={12}
      showSlither={true}
      firstAndLastGutter={true}
      freeScrolling={false}
      // Active item configurations
      requestToChangeActive={changeActiveItem}
      activeItemIndex={activeItemIndex}
      activePosition={"center"}
      chevronWidth={24}
      rightChevron={">"}
      leftChevron={"<"}
      outsideChevron={true}
    >
      {children &&
        children.map((item, index) => (
          <div key={index} style={{ background: "#333", width: "200px" }}>
            <img style={{ width: "100%" }} src={item.image_url} alt="" />
          </div>
        ))}
    </ItemsCarousel>
  );
}
