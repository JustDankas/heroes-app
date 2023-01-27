import * as React from "react";
import { Component, Fragment } from "react";
import styles from "./styles/Navbar.module.css";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/router";
import ErrorMessage from "./ErrorMessage";

enum Character {
  hero,
  villain,
  null,
}
function Navbar() {
  const [searching, setSearching] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const [type, setType] = React.useState(Character.null);
  const [error, setError] = React.useState("");
  function handleSearch() {
    if (type === Character.null) {
      setError("Please specify keywords 'Hero' or 'Villain'");
      return;
    }
    setSearching(false);
    router.push(
      `/search?${type === Character.hero ? "hero" : "villain"}=${search}`
    );
  }

  function handleEnter(key: string) {
    if (key === "Enter") handleSearch();
  }

  function handleSearchChange(str: string) {
    if (type === Character.null) {
      const heroRegex = new RegExp(/hero/, "i");
      const villainRegex = new RegExp(/villain/, "i");
      if (heroRegex.test(str)) {
        setType(Character.hero);
        setSearch("");
        return;
      }
      if (villainRegex.test(str)) {
        setType(Character.villain);
        setSearch("");
        return;
      }
      setSearch(str);
    }
    setSearch(str);
  }
  return (
    <Fragment>
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link href={"/"}>
            <Image src={logo} alt="logo" className={styles.logo} />
          </Link>
        </div>
        <Link href={"/heroes"} className={styles.hero}>
          Heroes Quest
        </Link>

        <Link href={"/villains"} className={styles.villain}>
          Villain Attack
        </Link>
        <div className={styles.searchBtnContainer}>
          <button className={styles.row} onClick={() => setSearching(true)}>
            SEARCH{" "}
            <BsSearch
              style={{
                marginLeft: "10px",
              }}
            />
          </button>
        </div>
        <div
          className={styles.searchInputContainer}
          style={{
            transform: `${searching ? "translateX(0)" : "translateX(100%)"}`,
          }}
        >
          <input
            className={styles.searchInput}
            type="text"
            // placeholder=""
            onKeyDown={(e) => handleEnter(e.key)}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div className={styles.spansContainer}>
            {type === Character.null && (
              <button
                className={styles.btnUnchecked}
                onClick={() => setType(Character.hero)}
              >
                Hero
              </button>
            )}
            {type === Character.null && "/"}
            {type === Character.null && (
              <button
                className={styles.btnUnchecked}
                onClick={() => setType(Character.villain)}
              >
                Villain
              </button>
            )}
            {type === Character.hero && (
              <button
                className={styles.btnChecked}
                onClick={() => setType(Character.null)}
              >
                Hero <RxCross1 className={styles.icon} />
              </button>
            )}
            {type === Character.villain && (
              <button
                className={styles.btnChecked}
                onClick={() => setType(Character.null)}
              >
                Villain <RxCross1 className={styles.icon} />
              </button>
            )}
          </div>
          <button className={styles.cross} onClick={() => setSearching(false)}>
            <RxCross1 />
          </button>
        </div>
      </div>
      {error && <ErrorMessage error={error} destroy={() => setError("")} />}
    </Fragment>
  );
}

export default Navbar;
