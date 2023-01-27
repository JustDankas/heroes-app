import Head from "next/head";
import * as React from "react";
import { Component, useState, useEffect } from "react";
import styles from "@/styles/heroes.module.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";
import { StringCutter } from "@/utilities/stringCutter";
interface IImageSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

interface IHero {
  id: number;
  name: string;
  images: IImageSize;
  biography: {
    publisher: string;
  };
  work: {
    occupation: string;
  };
}

interface IHeroPage {
  data: IHero[];
}
function HeroesPage({ data }: IHeroPage) {
  const [round, setRound] = useState(0);
  const [heroes, setHeroes] = useState(data);
  const [answear, setAnswear] = useState("");
  const [hero, setHero] = useState(heroes[round]);
  const [wins, setWins] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [heroName, setHeroName] = useState("?");
  const [canClick, setCanClick] = useState(true);

  function submitAnswear() {
    if (!canClick) return;
    const testRegexp = new RegExp(hero.name, "gi");
    if (testRegexp.test(answear)) setWins((prev) => prev + 1);
    else setMisses((prev) => prev + 1);
    if (round == 19) {
      setGameOver(true);
      return;
    }
    setHeroName(hero.name);
    setCanClick(false);
  }

  function resetGame() {
    axios
      .get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/heroes`)
      .then((res) => {
        setHeroes(res.data);
        setRound(0);
        setWins(0);
        setMisses(0);
        setAnswear("");
        setShowHint(false);
        setHeroName("?");
        setGameOver(false);
        setCanClick(true);
      })
      .catch((e) => router.push(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/`));
  }

  useEffect(() => {
    if (heroName === "?") return;
    setTimeout(() => {
      setShowHint(false);
      setRound((prev) => prev + 1);
      setHeroName("?");
      setCanClick(true);
    }, 3000);
  }, [heroName]);

  React.useEffect(() => {
    setHero(heroes[round]);
  }, [round, heroes]);

  function handleKeyDown(key: String) {
    if (key === "Enter") submitAnswear();
  }

  return (
    <Fragment>
      <Head>
        <title>Heroes Quest</title>
        <meta name="description" content="Find all heroes by their name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={styles.main}
        // style={{
        //   backgroundImage: `url(${heroesImage.src})`,
        //   // backgroundRepeat: "repeat",
        // }}
      >
        <div className={styles.imageContainer}>
          <h1>{heroName}</h1>
          <Image
            src={hero.images.lg}
            alt="superhero"
            width={360}
            height={480}
          />
        </div>
        <div className={styles.flexRow}>
          <input
            type="text"
            value={answear}
            onChange={(e) => setAnswear(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            placeholder="e.g. Batman"
          />
          <button
            className={styles.submitButton}
            onClick={() => submitAnswear()}
          >
            Submit
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.hint}>
            <div className={styles.flex}>
              <p className={!showHint ? styles.blurry : ""}>Work: </p>{" "}
              <p className={!showHint ? styles.blurry : ""}>
                {hero.work.occupation === "-"
                  ? "Not Known"
                  : StringCutter(hero.work.occupation)}
              </p>
            </div>
            <div className={styles.flex}>
              <p className={!showHint ? styles.blurry : ""}>Publisher: </p>{" "}
              <p className={!showHint ? styles.blurry : ""}>
                {hero.biography.publisher}
              </p>
            </div>
            {!showHint && <div className={styles.blur}></div>}
            {!showHint && (
              <button
                className={styles.hintButton}
                onClick={() => setShowHint(true)}
              >
                Hint
              </button>
            )}
          </div>
          <div className={styles.scoreboard}>
            <div className={styles.scores}>
              <h3>Hits: {wins}</h3>
            </div>
            <div className={styles.scores}>
              <h3>Misses: {misses}</h3>
            </div>
          </div>
        </div>
        {gameOver && <div className={styles.blackscreen}></div>}
        {gameOver && (
          <div className={styles.gameover}>
            <button onClick={() => resetGame()}>PLAY AGAIN</button>
            <Link href={"/"}>BACK</Link>
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default HeroesPage;

export async function getServerSideProps() {
  // const response = await axios.get("http://localhost:3000/api/dev");
  // const data = await response.data[0];
  const response = await fetch(
    "https://superhero-search.p.rapidapi.com/api/heroes",
    {
      headers: {
        "X-RapidAPI-Key": "ba006d25d3mshb73a35184cd604fp10709ejsn19ad616aa591",
        "X-RapidAPI-Host": "superhero-search.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  return {
    props: { data },
  };
}
