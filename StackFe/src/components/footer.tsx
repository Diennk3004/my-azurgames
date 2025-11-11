import styles from "@/scss/footer.module.scss";
import { FacebookFilled, InstagramFilled, PhoneFilled } from "@ant-design/icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <React.Fragment>
      <footer className={clsx(["flex", "justify-center", styles.footer])}>
        <div className={clsx([styles.middleFooter])}>
          <div className={clsx(["flex", "flex-row", "justify-end", "gap-x-6", "text-white", "text-base", "font-bold", "pt-6", "pb-3", "items-center", "border-b", "border-black", styles.contactFooter])}>
            <div>Contact Domino's Pizza Viet Nam:</div>
            <div className={clsx(["flex", "flex-row", "items-center", "gap-x-10", "text-2xl"])}>
              <FacebookFilled />
              <InstagramFilled />
            </div>
          </div>
          <div className={clsx(["flex", "flex-row", "mt-4"])}>
            <div className={clsx(["flex", "justify-center", "items-center", "pt-7", "pb-7", "pr-6", "border-r", styles.footerLogo])}>
              <Image src="/domino.svg" width={100} height={100} alt="Dominos" className={clsx(["w-20"])} />
            </div>
            <div className={clsx(["flex", "pl-8", "pr-8", "flex-col", "gap-y-1", "justify-center", styles.hotLine])}>
              <div className={clsx(["text-white", "font-bold", "italic", "text-center", "flex", "flex-row", "justify-center", "gap-x-1"])}>
                <PhoneFilled />
                <div>Hotline</div>
              </div>
              <div className={clsx(["font-bold", "text-center", "text-4xl", "gap-x-2", "flex", "justify-center"])} style={{ color: "#ffc107" }}>
                <div>1900</div>
                <div>6069</div>
              </div>
            </div>
            <ul className={clsx(["grid", "grid-cols-3", "gap-x-7", "ml-30", "items-center", styles.menuFooter])}>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  News
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Career
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  E-voucher Code
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Our Locations
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Policy
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/" className={clsx(["text-white", "text-sm", "font-bold"])}>
                  Rewards
                </Link>
              </li>
            </ul>
            <div className={clsx(["flex", "justify-end", "items-center", styles.footerCredential])}>
              <Link href="/">
                <Image src="/credentials.png" alt="Dominos" width={300} height={300} className={clsx([styles.credentialImg])} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export { Footer };
