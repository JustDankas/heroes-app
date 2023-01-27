import * as React from "react";
import { Component, Fragment } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import styles from "@/styles/Search.module.css";
import Image from "next/image";
import Statsboard from "@/components/Statsboard";
import { StringCutter } from "@/utilities/stringCutter";

interface IPowerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}
interface IAppearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}
interface IBiography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  publisher: string;
}

interface ICharacter {
  id: string;
  name: string;
  powerstats: IPowerstats;
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  appearance: IAppearance;
  biography: IBiography;
  work: {
    occupation: string;
  };
  connections: {
    groupAffiliation: string;
  };
}

interface ICharacterDetailsPage {
  data: ICharacter;
  role: string;
}
const test = 90;

function CharacterDetailsPage({ data, role }: ICharacterDetailsPage) {
  function formatUndefinedData(str: string) {
    if (str) return str;
    return "Not known";
  }
  return (
    <Fragment>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={`Details about ${data.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.heroCard}>
          <div className={styles.flexCol}>
            <div className={styles.imageContainer}>
              <Image
                src={data.images.md}
                alt={data.name}
                width={320}
                height={480}
              />
            </div>
            <div className={styles.personalInfo}>
              <h2>Personal Info:</h2>
              {/* <p>{`${role} name: ${data.name}`}</p> */}
              <div className={styles.row}>
                <h3>Fullname</h3>
                <p>{formatUndefinedData(data.biography.fullName)}</p>
              </div>
              <div className={styles.row}>
                <h3>Gender</h3>
                <p>{formatUndefinedData(data.appearance.gender)}</p>
              </div>
              <div className={styles.row}>
                <h3>Race</h3>
                <p>{formatUndefinedData(data.appearance.race)}</p>
              </div>
              <div className={styles.row}>
                <h3>Height</h3>
                <p>{formatUndefinedData(data.appearance.height[1])}</p>
              </div>
              <div className={styles.row}>
                <h3>Weight</h3>
                <p>{formatUndefinedData(data.appearance.weight[1])}</p>
              </div>
            </div>
          </div>
          <div className={styles.flexCol}>
            <h1>{data.name}</h1>
            <Statsboard data={data.powerstats} role={role} />
            <div className={styles.metadata}>
              <h2>Meta Data</h2>
              <div className={styles.row}>
                <h3>Aliases</h3>
                <p>
                  {StringCutter(
                    formatUndefinedData(
                      data.biography.aliases
                        .reduce((str, alias) => str + alias + ", ", "")
                        .slice(0, -2)
                    )
                  )}
                </p>
              </div>
              <div className={styles.row}>
                <h3>Publisher</h3>
                <p>{formatUndefinedData(data.biography.publisher)}</p>
              </div>
              <div className={styles.row}>
                <h3>Work</h3>
                <p>{formatUndefinedData(data.work.occupation)}</p>
              </div>
              <div className={styles.row}>
                <h3>Connetions</h3>
                <p>
                  {StringCutter(
                    formatUndefinedData(data.connections.groupAffiliation)
                  )}
                </p>
              </div>
              <div className={styles.row}>
                <h3>Eyes</h3>
                <p>{formatUndefinedData(data.appearance.eyeColor)}</p>
              </div>
              <div className={styles.row}>
                <h3>Hair</h3>
                <p>{formatUndefinedData(data.appearance.hairColor)}</p>
              </div>
              <div className={styles.flexCol}>
                <div className={styles.row}>
                  <h3>XS</h3>
                  {data.images.xs && (
                    <a href={data.images.xs} rel="noreferrer" target="_blank">
                      {data.images.xs}
                    </a>
                  )}
                </div>
                <div className={styles.row}>
                  <h3>Small</h3>
                  {data.images.sm && (
                    <a href={data.images.sm} rel="noreferrer" target="_blank">
                      {data.images.sm}
                    </a>
                  )}
                </div>
                <div className={styles.row}>
                  <h3>Medium</h3>
                  {data.images.md && (
                    <a href={data.images.md} rel="noreferrer" target="_blank">
                      {data.images.md}
                    </a>
                  )}
                </div>
                <div className={styles.row}>
                  <h3>Large</h3>
                  {data.images.lg && (
                    <a href={data.images.lg} rel="noreferrer" target="_blank">
                      {data.images.lg}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default CharacterDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { hero, villain } = query;
  if (!hero && !villain)
    return {
      notFound: true,
    };
  const response = await fetch(
    `https://superhero-search.p.rapidapi.com/api/?${
      hero ? "hero=" + hero : "villain=" + villain
    }`,
    {
      headers: {
        "X-RapidAPI-Key": "ba006d25d3mshb73a35184cd604fp10709ejsn19ad616aa591",
        "X-RapidAPI-Host": "superhero-search.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    }
  );
  const text = await response.text();
  if (text === "Hero Not Found")
    return {
      notFound: true,
    };
  else {
    const data = JSON.parse(text);
    return {
      props: { data, role: hero ? "Hero" : "Villain" },
    };
  }
};
