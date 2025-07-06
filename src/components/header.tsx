import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <Image
            src="/observr-logo.png"
            alt="Observr Logo"
            width={120}
            height={32}
            className={styles.headerLogoImage}
          />
        </div>
        <nav className={styles.headerNav}>
          <a href="/" className={styles.headerNavLink}>
            Home
          </a>
          <a href="/saved" className={styles.headerNavLink}>
            Saved
          </a>
          <a href="/pricing" className={styles.headerNavLink}>
            Pricing
          </a>
        </nav>
        <div className={styles.headerProfileAvatar}>
          <Image
            src="/placeholder.svg?height=40&width=40"
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
