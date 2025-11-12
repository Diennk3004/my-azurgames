import styles from "@/scss/home.module.scss";
import { Colors } from "@/utils";
import { SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Footer } from "@/components";
const Home = () => {
  console.log("process.env.NEXT_PUBLIC_APP_ENV = ", process.env.NEXT_PUBLIC_APP_ENV);
  return (
    <React.Fragment>
      <div className={clsx(["mt-4", "flex", "justify-center"])}>
        <Image src="/banner-1.jpg" alt="Dominos" width={4000} height={1688} quality={100} className={clsx(["h-200", "object-cover"])} />
      </div>
      <div className={clsx([styles.backgroundBlue, "pt-7", "pb-7", "pl-4", "pr-4", "mt-4", "flex", "justify-center", "items-center", "bg-repeat", "bg-cover"])}>
        <div className={styles.selectionGroup}>
          <div className={clsx(["flex", "justify-center", "gap-x-6"])}>
            <div className={clsx(["flex", "justify-center", "items-center", "text-white", "font-bold", "pl-4", "pr-4", "pt-2", "pb-2", styles.tabBox, styles.tabBoxActive])}>
              <button>Delivery</button>
            </div>
            <div className={clsx(["flex", "justify-center", "items-center", "text-white", "font-bold", "pl-4", "pr-4", "pt-2", "pb-2", styles.tabBox])}>
              <button>Carry Out</button>
            </div>
          </div>
          <div className={clsx(["p-2", styles.k2Box])}>
            <div className={clsx(["flex", "justify-center", "items-center", styles.drawBox])}>
              <input type="text" placeholder="Delivery address" className={clsx(["border-0", "outline-0", "bg-white", "pl-3", "pr-3", "pt-4", "pb-4", styles.textAddress])} />
              <button type="button" className={clsx(["text-white", "flex", "justify-center", "items-center", "p-4", "outline-0", styles.btnSearch])}>
                <SearchOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(["flex", "flex-col", "items-center", "justify-center", "pr-4", "pl-4", "pt-5", "pb-15", styles.contentBottom])}>
        <div className={styles.favouriteDate}>
          <div className={clsx(["flex", "items-center", "justify-start", "gap-x-23", styles.lameStack])}>
            <h3 className={styles.title}>Recommendation</h3>
            <button className={clsx(["font-bold", styles.omega])}>Daily Promotions</button>
            <button className={clsx("font-bold", styles.omega, styles.active)}>Best Sellers</button>
          </div>
          <div className={clsx([styles.productList])}>
            {Array.from({ length: 4 }).map((val, idx: number) => (
              <div key={`product-item-${idx}`} className={clsx([styles.productItem, "bg-white", "pb-4"])}>
                <Link href="/">
                  <Image src="/musttry.jpg" alt="Dominos" width={2000} height={1334} className={clsx(["rounded-tl-md", "rounded-tr-md"])} />
                </Link>
                <h3 className={clsx(["text-center", "mt-3", "font-bold"])}>
                  <Link href="/" style={{ color: Colors.blue }}>
                    Ocean Mania
                  </Link>
                </h3>
                <div className={clsx(["text-center", "mt-3", "font-bold"])}>9 inch - 205,000 đ</div>
              </div>
            ))}
          </div>
        </div>
        <div className={clsx(["flex", "justify-center", "mt-8"])}>
          <Link href="/" style={{ backgroundColor: Colors.blue }} className={clsx(["pt-3", "pb-3", "pl-5", "pr-5", "text-white", "rounded-md", "font-bold"])}>
            See More
          </Link>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Home;
