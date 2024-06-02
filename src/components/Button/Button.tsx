import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  text: ReactNode;
}

const Button = ({ loading, text, ...rest }: ButtonProps) => {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <a className={styles.buttontext}>{text}</a>
      )}
    </button>
  );
};

export default Button;
