import { useContext } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";

import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

//images
import logo from "../../../public/logo.png";
import bull from "../../../public/bull.png";

export function Header() {

  const {signOut} = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src={bull} width={80} height={48} alt="bull" />
          <Image
            src={logo}
            width={120}
            height={30}
            alt="Logo Bullseye Steakhouse"
          />
        </Link>

        <nav className={styles.menuNav}>
          <Link className={styles.link} href="/category">
            Categoria
          </Link>

          <Link className={styles.link} href="//product">
            Cardapio
          </Link>
          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={25} />
          </button>
        </nav>
      </div>
    </header>
  );
}
