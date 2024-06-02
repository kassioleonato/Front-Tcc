import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { toast } from "react-toastify";

import { canSSRGuest } from "../utils/canSSRGuest";

//components
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

//css
import styles from "../styles/home.module.scss";

//context
import { AuthContext } from "../contexts/AuthContext";

//images
import logo from "../../public/logo.png";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title> Bullseye -Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo Bullseye Steakhouse" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Acessar" type="submit" loading={false} />
          </form>
          <NextLink href="/register" className={styles.link}>
            Ainda nao possui uma conta?{" "}
            <b>
              <u>Cadastre-se</u>
            </b>
          </NextLink>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
