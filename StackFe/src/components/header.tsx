"use client";
import LogoMobile from "@/images/domino.svg";
import styles from "@/scss/header.module.scss";
import { CarOutlined, CloseOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Header = () => {
  const [isOpenMenu, setOpenMenu] = React.useState(false);
  const menuMobileRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const t = useTranslations("page_translate");
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
    if (menuMobileRef && headerRef && menuMobileRef.current && headerRef.current) {
      const headerHeight: number = headerRef.current.clientHeight;
      const windowHeight: number = window.innerHeight;
      const menuMobileHeight: number = windowHeight - headerHeight;
      menuMobileRef.current.style.top = `${headerHeight}px`;
      menuMobileRef.current.style.height = `${menuMobileHeight}px`;
      localStorage.setItem("heightWithoutHeader", menuMobileHeight.toString());
    }
  }, []);
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
            <Link href="/menu" className={clsx(["no-underline", "uppercase", "font-bold", "text-white"])}>
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
              <Link className={clsx(["flex", "row", "justify-center", "items-center", "cursor-pointer"])} href="/vi">
                <Image src="/flag-vn.png" width={30} height={16} alt="Flag vn" />
              </Link>
              <Link className={clsx(["flex", "row", "justify-center", "items-center", "cursor-pointer"])} href="/en">
                <Image src="/flag-en.png" width={30} height={16} alt="Flag en" />
              </Link>
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
              <Link href="/en">
                <Image src="/flag-en.png" width={30} height={30} alt="Dominos" />
              </Link>
              <Link href="/vi">
                <Image src="/flag-vn.png" width={30} height={30} alt="Dominos" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export { Header };
