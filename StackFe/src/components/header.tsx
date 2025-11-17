"use client";
import { useConfig } from "@/hooks";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "@/scss/header.module.scss";
import { CarOutlined, CloseOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenMenu, setOpenMenu] = React.useState(false);
  const menuMobileRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const t = useTranslations("page_translate");
  const { onChangeLocale } = useConfig();
  const handleOpenMenu = () => {
    setOpenMenu(!isOpenMenu);
    if (menuMobileRef && headerRef && menuMobileRef.current && headerRef.current) {
      if (!isOpenMenu) {
        menuMobileRef.current.style.transform = "translateX(0)";
        menuMobileRef.current.style.opacity = "1";
      } else {
        menuMobileRef.current.style.transform = "translate(-100%)";
        menuMobileRef.current.style.opacity = "0";
      }
    }
  };
  React.useEffect(() => {
    let headerHeight: number = 0;
    if (menuMobileRef && headerRef && menuMobileRef.current && headerRef.current) {
      headerHeight = headerRef.current.clientHeight;
      const windowHeight: number = window.innerHeight;
      const menuMobileHeight: number = windowHeight - headerHeight;
      menuMobileRef.current.style.top = `${headerHeight}px`;
      menuMobileRef.current.style.height = `${menuMobileHeight}px`;
      localStorage.setItem("heightWithoutHeader", menuMobileHeight.toString());
    }
    window.onscroll = function () {
      if (headerRef && headerRef.current) {
        const scrollTop: number = window.scrollY;
        const headerWidth: number = headerRef.current.clientWidth;
        if (scrollTop > headerHeight) {
          headerRef.current.style.position = "fixed";
          headerRef.current.style.top = "0px";
          headerRef.current.style.width = `${headerWidth}px`;
          headerRef.current.style.margin = "0 auto";
          headerRef.current.style.zIndex = "9000";
        } else {
          if (scrollTop === 0) {
            headerRef.current.style.position = "static";
          }
        }
      }
    };
  }, []);
  const handleLanguageChange = (locale: string) => () => {
    onChangeLocale(locale);
    router.push({ pathname });
    router.replace(pathname, { locale });
    console.log("pathname = ", pathname);
  };
  return (
    <React.Fragment>
      <header className={clsx(["flex", "items-center", "justify-between", "pl-4", "pr-4", "pt-4", "pb-4", styles.nav_header])} ref={headerRef}>
        <Link href="/">
          <Image src="/domino-horizontal-dark.svg" width={300} height={300} alt="Dominos" className={styles.logo} />
          <Image src="/domino.svg" alt="Dominos" width={300} height={300} className={clsx(["hidden", styles.logoMobile])} />
        </Link>
        <ul className={clsx(["list-none", "flex", "row", "gap-x-10", styles.menu])}>
          <li className={styles.li}>
            <Link href="/" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              {t("e_voucher_code")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              {t("promotions")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link href={{ pathname: "/menu" }} className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              {t("menu")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              {t("Order tracking")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              {t("Our locations")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
              Blog
            </Link>
          </li>
        </ul>
        <div className={clsx(["flex", "items-center", "gap-x-10", "pl-4", "pr-4", styles.block_icons])}>
          <div className={styles.block_icons2}>
            <div className={styles.block_flag}>
              <button className={clsx(["flex", "row", "justify-center", "items-center", "cursor-pointer"])} onClick={handleLanguageChange("vi")}>
                <Image src="/flag-vn.png" width={30} height={16} alt="Flag vn" />
              </button>
              <button className={clsx(["flex", "row", "justify-center", "items-center", "cursor-pointer"])} onClick={handleLanguageChange("en")}>
                <Image src="/flag-en.png" width={30} height={16} alt="Flag en" />
              </button>
            </div>
            <Link href="/" className={styles.ship}>
              <CarOutlined />
            </Link>
            <Link href="/" className={styles.promotion}>
              <Image src="/promotion.svg" width={30} height={30} alt="Dominos" />
            </Link>
            <Link href="/" className={styles.promotion}>
              <Image src="/menu.svg" width={30} height={30} alt="Dominos" />
            </Link>
            <div className={styles.user}>
              <Link href="/">
                <UserOutlined />
              </Link>
            </div>
          </div>
          <Link href="/" className={clsx(["relative", "text-white", styles.cartShopping])}>
            <ShoppingCartOutlined />
            <div className={clsx(["text-white", "absolute", "top-0", "flex", "justify-center", "items-center", styles.quantity])}>10</div>
          </Link>
          {isOpenMenu === false && (
            <button role="button" className={clsx(["hidden", "text-white", styles.menuOutlined])} onClick={handleOpenMenu}>
              <MenuOutlined />
            </button>
          )}
          {isOpenMenu === true && (
            <button role="button" className={clsx(["hidden", "text-white", styles.closedMenu])} onClick={handleOpenMenu}>
              <CloseOutlined />
            </button>
          )}
        </div>
      </header>
      <div ref={menuMobileRef} className={clsx(["hidden", "fixed", "w-full", "left-0", "opacity-0", styles.menuMobile])}>
        <ul>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              LOGIN / CREATE ACCOUNT
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              E-VOUCHER CODE
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              PROMOTIONS
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              MENU
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              ORDER TRACKING
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              NEWS
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              CAREER
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              POLICY
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              OUR LOCATIONS
            </Link>
          </li>
          <li>
            <Link href="/" className={clsx(["text-white", "no-underline", "uppercase", "font-bold"])}>
              REWARDS
            </Link>
          </li>
          <li>
            <div className={clsx(["flex", "flex-row", "gap-x-2"])}>
              <button onClick={handleLanguageChange("en")}>
                <Image src="/flag-en.png" width={30} height={30} alt="Dominos" />
              </button>
              <button onClick={handleLanguageChange("vi")}>
                <Image src="/flag-vn.png" width={30} height={30} alt="Dominos" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export { Header };
