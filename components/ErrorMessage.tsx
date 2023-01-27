import * as React from "react";
import { Component } from "react";
import styles from "./styles/Error.module.css";
interface IErrorMessage {
  error: string;
  destroy: () => void;
}
function ErrorMessage({ error, destroy }: IErrorMessage) {
  return (
    <div className={styles.centerDiv}>
      <button className={styles.error} onClick={() => destroy()}>
        {error}
      </button>
    </div>
  );
}

export default ErrorMessage;
