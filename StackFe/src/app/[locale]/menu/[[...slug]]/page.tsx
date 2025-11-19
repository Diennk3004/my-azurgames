"use client";
import { GET_FOOD, GET_MENU_FOOD, GET_MENU_TAG } from "@/graphql-client";
import { useConfig } from "@/hooks";
import { Link } from "@/i18n/navigation";
import styles from "@/scss/menu.module.scss";
import stylesModalDialog from "@/scss/modal-dialog.module.scss";
import { Colors, formatCurrency, getUriImage } from "@/utils";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
type ICake = {
  title: string;
  img: string;
};
type ICart = {
  title: string;
  img: string;
};
type IMenu = {
  _id: string;
  category_food_name_en: string;
  category_food_name_vi: string;
  category_food_slug: string;
  category_food_image: string;
  category_food_parent_id: string;
};
type IFood = {
  _id: string;
  food_name_en: string;
  food_name_vi: string;
  featured_image: string;
  category_food_id: string;
  price: number;
  size: number;
};
type Props = {
  params: Promise<{ slug: string }>;
};
const Menu: React.FC<Props> = ({ params }) => {
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
  const t = useTranslations("page_translate");
  const addressBarRef = React.useRef<HTMLDivElement>(null);
  const menuBarRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const { locale } = useConfig();
  const [menuList, setMenuList] = React.useState<IMenu[]>([]);
  const [tagList, setTagList] = React.useState<IMenu[]>([]);
  const [menuSlug, setMenuSlug] = React.useState<string>("");
  const [tagSlug, setTagSlug] = React.useState<string>("");
  const [foodData, setFoodData] = React.useState<IFood[]>([]);
  const [isOpenModal, setOpenModal] = React.useState<boolean>(false);
  const [remainedBarHeight, setRemainedBarHeight] = React.useState<number>(0);
  const [getMenuList] = useLazyQuery(GET_MENU_FOOD, { fetchPolicy: "network-only" });
  const [getTagList] = useLazyQuery(GET_MENU_TAG, { fetchPolicy: "network-only" });
  const [getFood] = useLazyQuery(GET_FOOD, { fetchPolicy: "network-only" });
  React.useEffect(() => {
    if (addressBarRef && menuBarRef && addressBarRef.current && menuBarRef.current) {
      const addressBarHeight: number = addressBarRef.current.clientHeight;
      const menuBarHeight: number = menuBarRef.current.clientHeight;
      let headerHeight: string | null = "";
      if (localStorage.getItem("headerHeight")) {
        headerHeight = localStorage.getItem("headerHeight");
        if (headerHeight) {
          console.log("headerHeight = ", headerHeight);
          console.log("addressBarHeight = ", addressBarHeight);
          console.log("menuBarHeight = ", menuBarHeight);
          const blockHeight: number = window.innerHeight - (parseFloat(headerHeight) + addressBarHeight + menuBarHeight);
          setRemainedBarHeight(blockHeight);
        }
      }
    }
  }, [window.innerHeight]);
  React.useEffect(() => {
    const getMenu = () => {
      getMenuList()
        .then((response: any) => {
          if (response.data && response.data.menuList) {
            setMenuList(response.data.menuList);
          }
        })
        .catch(() => {});
    };
    getMenu();
    params.then((response: any) => {
      const { slug } = response;
      let lblMenuSlug: string = "";
      let lblTagSlug: string = "";
      if (slug) {
        if (slug.length === 1) {
          lblMenuSlug = slug[0];
        }
        if (slug.length === 2) {
          lblMenuSlug = slug[0];
          lblTagSlug = slug[1];
        }
      }
      setMenuSlug(lblMenuSlug);
      setTagSlug(lblTagSlug);
    });
  }, []);
  React.useEffect(() => {
    const getTag = () => {
      const menu = menuSlug;
      if (menu) {
        getTagList({ variables: { menu } })
          .then((response: any) => {
            if (response.data && response.data.tagList) {
              setTagList(response.data.tagList);
            }
          })
          .catch(() => {});
      }
    };
    getTag();
  }, [menuSlug]);
  React.useEffect(() => {
    if (menuSlug && tagSlug) {
      getFood({ variables: { menu_slug: menuSlug, tag_slug: tagSlug } })
        .then((response: any) => {
          if (response && response.data && response.data.foodList) {
            setFoodData(response.data.foodList);
          }
        })
        .catch(() => {});
    }
  }, [menuSlug, tagSlug]);
  const handleOpenModal = (val: boolean) => () => {
    setOpenModal(val);
    if (modalRef && dialogRef && modalRef.current && dialogRef.current) {
      if (isOpenModal === true) {
        modalRef.current.style.display = "hidden";
        modalRef.current.style.opacity = "0";
        modalRef.current.style.zIndex = "-1";
        dialogRef.current.style.transform = "translateY(-100%)";
        dialogRef.current.style.opacity = "0";
      } else {
        modalRef.current.style.display = "block";
        modalRef.current.style.opacity = "1";
        modalRef.current.style.zIndex = "1";
        dialogRef.current.style.transform = "translateY(0)";
        dialogRef.current.style.opacity = "1";
      }
    }
  };
  return (
    <React.Fragment>
      <div className={clsx(["lg:flex", "flex-row", "justify-between", styles.wrapper])}>
        <div className={clsx(["pb-3", "bg-gray-100", styles.colLeft])}>
          <div className={clsx([styles.addressBar, "justify-center", "pt-2", "pb-2", "flex", "pl-3", "pr-3", "bg-sky-100"])} ref={addressBarRef}>
            <div className={clsx([styles.addressContainer, "w-[80%]", "max-lg:w-full", "flex", "items-center", "pt-1", "pb-1", "font-bold", "text-gray-500"])}>Bạn Đang Chọn: Giao Hàng Tận NơiTrần Quang Diệu,phường 14,Quận 3,Hồ Chí Minh,Việt Nam</div>
          </div>
          <div className={clsx([styles.menuFoodBar, "pt-0", "pb-0", "pl-3", "pr-3", "flex", "justify-center", "bg-white", "shadow-b"])} style={{ boxShadow: "0px 1px 0px 0px #dcdcdc" }} ref={menuBarRef}>
            {menuList.length > 0 && (
              <ul className={clsx([styles.menuContainer, "w-[73%]", "max-lg:w-full", "flex", "max-md:gap-x-4", "justify-between", "overflow-y-hidden", "overflow-x-scroll", "slider-container"])}>
                {menuList.map((item: IMenu, idx: number) => {
                  const active: boolean = false;
                  return (
                    <li key={`menu-item-${idx}`}>
                      <Link href={{ pathname: `/menu/${item.category_food_slug}` }} className={clsx([active && "border-b-2", "max-md:text-sm", active && "border-red-400", "pb-2", "pt-2", "block", "font-bold"])}>
                        {locale === "en" ? item.category_food_name_en : item.category_food_name_vi}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className={clsx(["overflow-x-hidden", "overflow-y-scroll", "pl-5", "pr-5"])} style={{ height: `${remainedBarHeight}px` }}>
            <div className={clsx([styles.foodList, "flex", "justify-center", "mt-5"])}>
              {tagList.length > 0 && (
                <ul className={clsx([styles.foodNavbar, "w-[75%]", "max-lg:w-full", "flex", "justify-start", "gap-y-3", "gap-x-3", "flex-wrap"])}>
                  {tagList.map((item: IMenu, idx: number) => {
                    return (
                      <li key={`food-item-${idx}`}>
                        <Link href={{ pathname: `/menu/${menuSlug}/${item.category_food_slug}` }} className={clsx(["flex", "bg-white", "flex-row", "justify-between", "gap-x-2", "items-center", "pl-3", "pr-3", "pt-1.75", "pb-1.75", "text-sm", "font-bold", "rounded-md", "border", "border-gray-200", "border", "border-gray-200", "hover:bg-gray-100", false && styles.active])}>
                          {item.category_food_image && <Image src={getUriImage(item.category_food_image)} alt="Dominos" width={160} height={160} className={clsx(["w-5"])} />}
                          <span>{locale === "en" ? item.category_food_name_en : item.category_food_name_vi}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className={clsx([styles.cakeBlock, "w-full", "flex", "flex-col", "items-center", "mt-10", "mx-auto"])}>
              <h3 className={clsx(["uppercase", "text-2xl", "font-bold"])}>Super Topping</h3>
              {foodData.length > 0 && (
                <div className={clsx(["grid", "grid-cols-4", "max-lg:grid-cols-2", "max-sm:grid-cols-1", "gap-x-8", "gap-y-5", "mt-8", styles.cakeList])}>
                  {foodData.map((item: IFood, idx: number) => {
                    return (
                      <div key={`cake-item-${idx}`} className={clsx(["bg-white", "rounded-md", "border", "border-gray-200", "pb-4"])}>
                        <button onClick={handleOpenModal(true)} className={clsx(["w-full"])}>
                          <Image src={getUriImage(item.featured_image)} alt="Dominos" width={2000} height={1334} className={clsx(["w-full", "h-50", "rounded-tl-md", "rounded-tr-md", "object-cover"])} />
                        </button>
                        <h3 className={clsx(["text-center", "mt-3", "pl-2", "pr-2", "font-bold"])}>
                          <button style={{ color: Colors.blue }} onClick={handleOpenModal(true)}>
                            {locale === "en" ? item.food_name_en : item.food_name_vi}
                          </button>
                        </h3>
                        <div className={clsx(["text-center", "mt-3", "font-bold"])}>
                          {item.size} inch - {formatCurrency(item.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* <div className={clsx([styles.cakeBlock, "lg:w-full", "flex", "flex-col", "items-center", "mt-10", "mx-auto"])}>
              <h3 className={clsx(["uppercase", "text-2xl", "font-bold"])}>Seafood Cravers</h3>
              {cakeList.length > 0 && (
                <div className={clsx(["grid", "lg:grid-cols-4", "sm:grid-cols-2", "gap-x-8", "gap-y-5", "mt-8", styles.cakeList])}>
                  {cakeList.map((item: ICake, idx: number) => {
                    return (
                      <div key={`cake-item-${idx}`} className={clsx(["bg-white", "rounded-md", "border", "border-gray-200", "pb-4"])}>
                        <button onClick={handleOpenModal(true)}>
                          <Image src={`/${item.img}`} alt="Dominos" width={2000} height={1334} className={clsx(["w-full", "h-50", "rounded-tl-md", "rounded-tr-md", "object-cover"])} />
                        </button>
                        <h3 className={clsx(["text-center", "mt-3", "font-bold"])}>
                          <button style={{ color: Colors.blue }} onClick={handleOpenModal(true)}>
                            Ocean Mania
                          </button>
                        </h3>
                        <div className={clsx(["text-center", "mt-3", "font-bold"])}>9 inch - 205,000 đ</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className={clsx(["pl-4", "pr-4", "pt-4", "pb-4", "relative", "border-l", "border-gray-200", styles.colRight])}>
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
      <div className={clsx(["fixed", "top-0", "left-0", "w-screen", "h-screen", stylesModalDialog.modal])} ref={modalRef}>
        <div className={clsx(["absolute", "top-0", "left-0", "w-screen", "h-screen", "bg-gray-950", "opacity-50"])} onClick={handleOpenModal(false)}></div>
        <div className={clsx(["relative", "bg-white", "rounded-lg", "flex", "max-lg:flex-col", "justify-between", "max-w-200", "max-lg:justify-start", "ml-auto", "mr-auto", "max-md:ml-5", "max-md:mr-5", "top-[50%]", stylesModalDialog.dialog, styles.menuDialog])} ref={dialogRef}>
          <div className={clsx(["grow", "max-lg:w-full", "max-lg:h-50", "relative"])}>
            <Image src="/Pizzaminsea.jpg" alt="Dominos" width={832} height={1440} className={clsx(["object-cover", "rounded-tl-lg", "lg:rounded-bl-lg", "max-lg:rounded-tr-lg", "w-full", "h-full"])} />
            <div className={clsx(["absolute", "lg:hidden", "top-0", "right-0", "bg-orange-700", "text-white", "rounded-tr-lg", "flex", "justify-center", "items-center", "w-10", "h-10"])}>
              <CloseOutlined onClick={handleOpenModal(false)} />
            </div>
          </div>
          <div className={clsx(["w-116", "max-lg:w-full", "relative"])}>
            <div className={clsx(["absolute", "max-lg:hidden", "top-0", "right-0", "bg-orange-700", "text-white", "rounded-tr-lg", "flex", "justify-center", "items-center", "w-10", "h-10"])}>
              <CloseOutlined onClick={handleOpenModal(false)} />
            </div>
            <div className={clsx(["pt-2", "pl-8", "pr-10"])}>
              <div className={clsx("overflow-x-hidden", "overflow-y-scroll", "h-150", "max-lg:h-105")}>
                <h3 className={clsx(["font-bold", "text-2xl", "text-cyan-700"], "w-100")}>Pizza Siêu Topping Hải Sản Nhiệt Đới Xốt Tiêu - Super Topping Pizzamin Sea</h3>
                <div className={clsx(["mt-6", "text-gray-500", "font-bold", "text-sm"])}>Extra protein toppings by 50%: Shrimp, Squid; Extra Mozzarella Cheese, Cheddar Cheese, Pineapple, Onion, Mayonnaise, Black Pepper Sauce</div>
                <div className={clsx(["mt-10", "mb-10", "border-t-2", "border-gray-400", "w-17.5"])}></div>
                <div>
                  <div className={clsx(["pl-3", "font-bold"])}>Crust</div>
                  <div className={clsx(["pl-6", "mt-3"])}>
                    {Array.from({ length: 3 }).map((val, idx: number) => {
                      return (
                        <div key={`item-${idx}`} className={clsx(["flex", "justify-between", "items-center", "gap-x-3", "border-b", "border-gray-200", "pt-3", "pb-3"])}>
                          <div className={clsx(["relative", styles.blockRadio])}>
                            <input type="radio" name="topping" value={`Fresh-${idx}`} className={clsx(["absolute", "z-2", "opacity-0"])} />
                            <div className={clsx(["font-bold", "ml-10", "mr-10", "max-sm:text-xs", styles.mask])}>Fresh Hand-tossed Crust</div>
                          </div>
                          <Image src="/pizza-base.png" width={40} height={40} className={clsx(["w-6", "h-6"])} alt="Dominos" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={clsx(["mt-6"])}>
                  <div className={clsx(["pl-3", "font-bold"])}>Size</div>
                  <div className={clsx(["pl-6", "mt-3"])}>
                    {Array.from({ length: 3 }).map((val, idx: number) => {
                      return (
                        <div key={`item-${idx}`} className={clsx(["flex", "justify-between", "items-center", "gap-x-3", "border-b", "border-gray-200", "pt-3", "pb-3"])}>
                          <div className={clsx(["relative", styles.blockRadio])}>
                            <input type="radio" name="size" value={`Fresh-${idx}`} className={clsx(["absolute", "z-2", "opacity-0"])} />
                            <div className={clsx(["font-bold", "ml-10", "mr-10", "max-sm:text-xs", styles.mask])}>Size 9 inch = 235,000₫</div>
                          </div>
                          <Image src="/pizza-size.png" width={40} height={40} alt="Dominos" className={clsx(["w-6", "h-6"])} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderTopWidth: 1, borderTopColor: "var(--color-gray-200)", boxShadow: "rgb(196 196 196 / 53%) 0px 0px 10px 0px" }} className={clsx(["p-3", "gap-x-1", "absolute", "w-full", "bottom-0", "flex", "justify-between", "items-center"])}>
              <div className={clsx(["flex"])}>
                <button className={clsx(["bg-gray-200", "rounded-tl-sm", "rounded-bl-sm", "outline-0", "border-0", "pl-4", "pr-4", "w-12.5", "h-12.5"])}>
                  <MinusOutlined />
                </button>
                <input type="text" value={1} className={clsx(["w-12.5", "text-center", "bg-gray-200", "outline-0", "border-l-gray-300", "border-r-gray-300", "border-l", "border-r"])} readOnly={true} />
                <button className={clsx(["bg-gray-200", "rounded-tr-sm", "rounded-br-sm", "outline-0", "border-0", "pl-4", "pr-4"])}>
                  <PlusOutlined />
                </button>
              </div>
              <button className={clsx(["bg-red-600", "flex", "justify-center", "items-center", "text-white", "font-bold", "gap-x-2", "max-sm:gap-x-1", "pt-3", "pb-3", "pl-10", "pr-10", "max-sm:pl-3", "max-sm:pr-3", "rounded-sm"])}>
                <span className={clsx(["uppercase", "max-sm:text-sm"])}>Add to cart</span>
                <span className={clsx(["max-sm:text-sm"])}>245,000đ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu;
