import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/product.module.scss";
import { Header } from "../components/Header/Header";
import Image from "next/image";

import { canSSRGuest } from "@/utils/canSSRGuest";
import { FiUpload } from "react-icons/fi";

import { setupAPIClient } from "../services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChangeCategory(event) {
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }
      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("file", imageAvatar);
      data.append("category_id", categories[categorySelected].id);

      const apiClient = setupAPIClient();

      await apiClient.post("/product", data);

      toast.success("Cadastrado com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar produto!");
    }
    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
  }

  return (
    <>
      <Head>
        <title>Novo produto</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option value={index} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              className={styles.input}
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx);

//   const response = await apiClient.get("/category");

//   //console.log(response.data);

//   return {
//     props: { categoryList: response.data },
//   };
// });

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
