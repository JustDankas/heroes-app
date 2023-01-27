import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeSection from "@/components/HomeSection";
import Link from "next/link";
import { Fragment } from "react";
import heroesData from "@/heroes2.json";
import villainsData from "@/villains.json";
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
}

interface IHome {
  heroes: IHero[];
  villains: IHero[];
}

export default function Home({ heroes, villains }: IHome) {
  return (
    <Fragment>
      <Head>
        <title>HeroFind</title>
        <meta
          name="description"
          content="A game about finding heroes and villains"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        className={styles.main}
        // style={{
        //   backgroundImage: `url(${heroesImage.src})`,
        //   // backgroundRepeat: "repeat",
        // }}
      >
        <section className={styles.section}>
          <div className={styles.flexCol}>
            <h2>Heroes</h2>
            <p>Superheroes are more than just comic book characters</p>
            <p>
              {" "}
              They represent the best of humanity, fighting for justice and
              protecting the innocent from evil
            </p>
            <p>
              Click below to play: <span>Heroes Quest</span>
            </p>
          </div>
          <div className={styles.heroes}>
            <div className={styles.blackscreen}></div>
            <HomeSection data={heroes.slice(0, 10)} />
            <HomeSection data={heroes.slice(10, -1)} />

            <div className={styles.dummyButton}>
              <Link href={"/heroes"} className={styles.playButton}>
                PLAY
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.flexCol}>
            <h2>Villains</h2>
            <p>Supervillains are the dark side of the superhero world</p>
            <p>
              They represent the evil, bad and injustice that is prevalent in
              our society committing crimes to gain power, money and control.
            </p>
            <p>
              Click below to play: <span>Villain Attack</span>
            </p>
          </div>
          <div className={styles.heroes}>
            <div className={styles.villainscreen}></div>
            <HomeSection data={villains.slice(0, 10)} />
            <HomeSection data={villains.slice(10, -1)} />
            <div className={styles.dummyButton}>
              <Link href={"/villains"} className={styles.playButton}>
                PLAY
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  // const response = await fetch("http://localhost:3000//api/dev");
  // const responseVillains = await axios("http://localhost:3000//api/dev");
  // const heroes = data[0];
  // const villains = data[1];
  // console.log(data);
  return {
    props: { heroes: heroesData, villains: villainsData },
  };
}
