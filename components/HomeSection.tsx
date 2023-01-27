import Image from "next/image";
import * as React from "react";
import { Component } from "react";
import styles from "@/styles/HomeSection.module.css";
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
  data: IHero[];
}
function HomeSection({ data }: IHome) {
  return (
    <ul className={styles.list}>
      {data.map((hero, index) => (
        <li key={hero.id}>
          <Image
            src={hero.images.md}
            width="160"
            height={240}
            alt={hero.name}
          />
        </li>
      ))}
    </ul>
  );
}

export default HomeSection;
