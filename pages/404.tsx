import * as React from "react";
import { Component } from "react";
import styles from "@/styles/404.module.css";
import Head from "next/head";
import { Fragment } from "react";
function NotFoundPage() {
  return (
    <Fragment>
      <Head>
        <title>404</title>
        <meta name="description" content="Nothing found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>404</h1>
        <p>Page Not Found</p>
      </main>
    </Fragment>
  );
}

export default NotFoundPage;
