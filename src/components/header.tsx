import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Observr Logo"
              width={120}
              height={32}
              className={styles.headerLogoImage}
            />
          </Link>
        </div>
        <nav className={styles.headerNav}>
          <a href="/" className={styles.headerNavLink}>
            Home
          </a>
          <a href="/b2c/saved" className={styles.headerNavLink}>
            Saved
          </a>
          <a href="/b2c/pricing" className={styles.headerNavLink}>
            Pricing
          </a>
        </nav>
        <div className={styles.headerProfileAvatar}>
          <Image
            src="/profile.svg"
            alt="Profile"
            width={40}
            height={40}
            className={styles.headerAvatarImage}
          />
        </div>
      </div>
    </header>
  );
}
