"use client";
import styles from "@/scss/menu.module.scss";
import { Colors } from "@/utils";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
type IFood = {
  title: string;
  img: string;
};
type ICake = {
  title: string;
  img: string;
};
type ICart = {
  title: string;
  img: string;
};
const Menu = () => {
  const menuList: string[] = ["Daily Promotions", "Pizza", "Pizza Muffin", "Chicken", "Pasta", "Appetizer", "Dessert", "Drinks"];
  const foodList: IFood[] = [
    { title: "All", img: "" },
    { title: "Seafood", img: "fried-shrimp.png" },
    { title: "Beef", img: "cut-of-meat.png" },
    { title: "Chicken", img: "poultry-leg.png" },
    { title: "Pork", img: "bacon.png" },
    { title: "Vegetarian", img: "leafy-green.png" }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const cakeList: ICake[] = [
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" }
  ];
  const t = useTranslations("page_translate");
  const cart: ICart[] = [
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" },
    { title: "Super Topping Pizzamin Sea", img: "musttry.jpg" }
  ];
  const addressBarRef = React.useRef<HTMLDivElement>(null);
  const menuBarRef = React.useRef<HTMLDivElement>(null);
  const [remainedBarHeight, setRemainedBarHeight] = React.useState<number>(0);
  React.useEffect(() => {
    const getHeight = async () => {
      if (addressBarRef && menuBarRef && addressBarRef.current && menuBarRef.current) {
        if (localStorage.getItem("heightWithoutHeader")) {
          const heightWithoutHeader: string | null = localStorage.getItem("heightWithoutHeader");
          const addressBarHeight: number = addressBarRef.current.clientHeight;
          const menuBarHeight: number = menuBarRef.current.clientHeight;
          const totalBarHeight: number = addressBarHeight + menuBarHeight;
          if (heightWithoutHeader) {
            const blockHeight: number = parseFloat(heightWithoutHeader) - totalBarHeight - 10;
            setRemainedBarHeight(blockHeight);
          }
        }
      }
    };
    getHeight();
  }, []);
  return (
    <div className={clsx(["flex", "flex-row", "justify-between", styles.wrapper])}>
      <div className={clsx([styles.colLeft, "pb-3", "bg-gray-100"])}>
        <div className={clsx([styles.addressBar, "pt-2", "pb-2", "flex", "justify-center"])} ref={addressBarRef}>
          <div className={clsx([styles.addressContainer, "flex", "items-center", "pt-1", "pb-1", "font-bold"])}>Bạn Đang Chọn: Giao Hàng Tận NơiTrần Quang Diệu,phường 14,Quận 3,Hồ Chí Minh,Việt Nam</div>
        </div>
        <div className={clsx([styles.menuFoodBar, "pt-0", "pb-0", "flex", "justify-center", "bg-white"])} ref={menuBarRef}>
          {menuList.length > 0 && (
            <ul className={clsx([styles.menuContainer, "flex", "justify-between", "overflow-y-hidden", "overflow-x-scroll", "slider-container"])}>
              {menuList.map((item: string, idx: number) => {
                let active: boolean = false;
                if (item === "Pizza") {
                  active = true;
                }
                return (
                  <li key={`menu-item-${idx}`}>
                    <Link href="/" className={clsx([active === true && "border-b-2", active === true && "border-red-400", "pb-2", "pt-2", "block", "font-bold"])}>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className={clsx(["overflow-x-hidden", "overflow-y-scroll"])} style={{ height: `${remainedBarHeight}px` }}>
          <div className={clsx([styles.foodList, "flex", "justify-center", "mt-5"])}>
            {foodList.length > 0 && (
              <ul className={clsx([styles.foodNavbar, "flex", "justify-start", "gap-y-3", "gap-x-3", "flex-wrap"])}>
                {foodList.map((item: IFood, idx: number) => {
                  return (
                    <li key={`food-item-${idx}`}>
                      <Link href="/" className={clsx(["flex", "bg-white", "flex-row", "justify-between", "gap-x-2", "items-center", "pl-3", "pr-3", "pt-1.75", "pb-1.75", "text-sm", "font-bold", "rounded-md", "border", "border-gray-200", item.title === "All" && styles.active])}>
                        {item.img && <Image src={`/${item.img}`} alt="Dominos" width={160} height={160} />}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className={clsx([styles.cakeBlock, "flex", "flex-col", "items-center", "mt-10", "ml-auto", "mr-auto"])}>
            <h3 className={clsx(["uppercase", "text-2xl", "font-bold"])}>Super Topping</h3>
            {cakeList.length > 0 && (
              <div className={clsx(["grid", "grid-cols-4", "gap-x-8", "gap-y-5", "mt-8", styles.cakeList])}>
                {cakeList.map((item: ICake, idx: number) => {
                  return (
                    <div key={`cake-item-${idx}`} className={clsx(["bg-white", "rounded-md", "border", "border-gray-200", "pb-4"])}>
                      <Link href="/">
                        <Image src={`/${item.img}`} alt="Dominos" width={2000} height={1334} className={clsx(["h-50", "rounded-tl-md", "rounded-tr-md", "object-cover"])} />
                      </Link>
                      <h3 className={clsx(["text-center", "mt-3", "font-bold"])}>
                        <Link href="/" style={{ color: Colors.blue }}>
                          Ocean Mania
                        </Link>
                      </h3>
                      <div className={clsx(["text-center", "mt-3", "font-bold"])}>9 inch - 205,000 đ</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={clsx([styles.cakeBlock, "flex", "flex-col", "items-center", "mt-10", "ml-auto", "mr-auto"])}>
            <h3 className={clsx(["uppercase", "text-2xl", "font-bold"])}>Seafood Cravers</h3>
            {cakeList.length > 0 && (
              <div className={clsx(["grid", "grid-cols-4", "gap-x-8", "gap-y-5", "mt-8", styles.cakeList])}>
                {cakeList.map((item: ICake, idx: number) => {
                  return (
                    <div key={`cake-item-${idx}`} className={clsx(["bg-white", "rounded-md", "border", "border-gray-200", "pb-4"])}>
                      <Link href="/">
                        <Image src={`/${item.img}`} alt="Dominos" width={2000} height={1334} className={clsx(["h-50", "rounded-tl-md", "rounded-tr-md", "object-cover"])} />
                      </Link>
                      <h3 className={clsx(["text-center", "mt-3", "font-bold"])}>
                        <Link href="/" style={{ color: Colors.blue }}>
                          Ocean Mania
                        </Link>
                      </h3>
                      <div className={clsx(["text-center", "mt-3", "font-bold"])}>9 inch - 205,000 đ</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={clsx([styles.colRight, "pl-4", "pr-4", "pt-4", "pb-4", "relative", "border-l", "border-gray-200"])}>
        {cart.length > 0 ? (
          <React.Fragment>
            <div className={clsx(["flex", "justify-between"])}>
              <div className={clsx(["font-bold", "text-xl"])}>Your Order</div>
              <div className={clsx(["font-bold", "text-xl"])}>1 Dish</div>
            </div>
            <div className={clsx(["flex", "flex-col", "mt-10", "pb-5", "gap-y-10", "overflow-y-scroll", "overflow-x-hidden"])} style={{ height: `${remainedBarHeight}px` }}>
              {cart.map((cartItem: ICart, idx: number) => {
                return (
                  <div key={`cart-item-${idx}`} className={clsx(["grid", "gap-y-3", styles.cartGrid])}>
                    <div className={clsx(["font-bold"])}>1</div>
                    <div className={clsx(["font-bold"])}>x</div>
                    <div className={clsx(["font-bold"])}>{cartItem.title}</div>
                    <div className={clsx(["font-bold", "text-right"])}>245,000đ</div>
                    <div className={clsx(["col-span-2"])}></div>
                    <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
                      <div className={clsx(["text-xs", "font-bold", "text-gray-500"])}>Size 9 inch</div>
                      <div className={clsx(["text-xs", "font-bold", "text-gray-500"])}>Fresh Hand-tossed Crust</div>
                      <div className={clsx(["flex", "gap-x-2"])}>
                        <button className={clsx(["font-bold", "text-xs", "text-sky-700"])}>Edit</button>
                        <button className={clsx(["font-bold", "text-xs", "text-sky-700"])}>Remove</button>
                      </div>
                    </div>
                    <div className={clsx(["flex", "justify-end", "items-center"])}>
                      <Image src={`/${cartItem.img}`} alt="Dominos" width={2000} height={1334} className={clsx(["rounded-md", "w-15", "h-10"])} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={clsx(["absolute", "bottom-0", "left-0", "pb-5", "w-full", "bg-white"])}>
              <div className={clsx(["flex", "flex-col", "gap-y-1", "pl-4", "pr-4"])}>
                <div className={clsx(["flex", "justify-between", "w-full"])}>
                  <div className={clsx(["font-bold", "text-gray-500"])}>Total</div>
                  <div className={clsx(["font-bold"])}>245,000đ</div>
                </div>
                <div className={clsx(["flex", "justify-between", "w-full"])}>
                  <div className={clsx(["font-bold", "text-gray-500"])}>Promotions Discount</div>
                  <div className={clsx(["text-red-600"])}>0đ</div>
                </div>
                <div className={clsx(["flex", "justify-between", "w-full"])}>
                  <div className={clsx(["font-bold", "text-gray-500"])}>Vouchers Discount</div>
                  <div className={clsx(["text-red-600"])}>0đ</div>
                </div>
                <div className={clsx(["flex", "justify-between", "w-full"])}>
                  <div className={clsx(["font-bold", "text-gray-500"])}>Delivery Fee</div>
                  <div className={clsx(["text-red-600"])}>0đ</div>
                </div>
              </div>
              <Link href="/" className={clsx(["bg-red-600", "flex", "justify-center", "items-center", "text-white", "font-bold", "gap-x-5", "pt-3", "pb-3", "mt-3", "rounded-sm"])}>
                <span className={clsx(["uppercase"])}>Checkout</span>
                <span>245,000đ</span>
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Image src="/empty-cart.svg" width={300} height={200} alt="Dominos" className={clsx(["ml-auto", "mr-auto"])} />
            <div className={clsx(["text-center", "font-bold"])}>{t("empty_cart_place_order")}.</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Menu;
