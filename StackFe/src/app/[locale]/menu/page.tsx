import styles from "@/scss/menu.module.scss";
import { Colors } from "@/utils";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
type IFood = {
  title: string;
  img: string;
};
type ICake = {
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
  return (
    <div className={clsx(["flex", "flex-row", "justify-between", styles.wrapper])}>
      <div className={clsx([styles.colLeft, "pb-3", "bg-gray-100"])}>
        <div className={clsx([styles.addressBar, "pt-2", "pb-2", "flex", "justify-center"])}>
          <div className={clsx([styles.addressContainer, "flex", "items-center", "pt-1", "pb-1", "font-bold"])}>Bạn Đang Chọn: Giao Hàng Tận NơiTrần Quang Diệu,phường 14,Quận 3,Hồ Chí Minh,Việt Nam</div>
        </div>
        <div className={clsx([styles.menuFoodBar, "pt-2", "pb-2", "flex", "justify-center", "bg-white"])}>
          {menuList.length > 0 && (
            <ul className={clsx([styles.menuContainer, "flex", "justify-between", "font-bold"])}>
              {menuList.map((item: string, idx: number) => {
                return (
                  <li key={`menu-item-${idx}`}>
                    <Link href="/">{item}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className={clsx([styles.foodList, "flex", "justify-center", "mt-5"])}>
          {foodList.length > 0 && (
            <ul className={clsx([styles.foodNavbar, "flex", "justify-start", "gap-x-3"])}>
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
      <div className={clsx([styles.colRight])}>
        <Image src="/empty-cart.svg" width={300} height={200} alt="Dominos" className={clsx(["ml-auto", "mr-auto"])} />
        <div className={clsx(["text-center", "font-bold"])}>{t("empty_cart_place_order")}.</div>
      </div>
    </div>
  );
};

export default Menu;
