import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";

import { toast } from "react-toastify";

//components
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

//css
import styles from "../styles/home.module.scss";

//images
import logo from "../../public/logo.png";

import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSigUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.warning("Preencha todos os campos!");

      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title> Bullseye - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo Bullseye Steakhouse" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleSigUp}>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>

            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button text="Cadastrar" type="submit" loading={loading}></Button>
          </form>
          <NextLink href="/" className={styles.link}>
            Já possui uma conta?{" "}
            <b>
              <u>Entre</u>
            </b>
          </NextLink>
        </div>
      </div>
    </>
  );
}
