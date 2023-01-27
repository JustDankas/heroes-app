import * as React from "react";
import { Component } from "react";
import styles from "@/styles/Statsboard.module.css";
import Stats from "./Stats";

interface IPowerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}
interface IStatsboard {
  data: IPowerstats;
  role: string;
}

function Statsboard({ data, role }: IStatsboard) {
  return (
    <>
      {" "}
      <div className={styles.statsboard}>
        <h2>{`${role} Stats`}</h2>
        <div className={styles.grid}>
          <Stats label="Intelligence" stat={data.intelligence} />
          <Stats label="Strength" stat={data.strength} />
          <Stats label="Speed" stat={data.speed} />
          <Stats label="Durability" stat={data.durability} />
          <Stats label="Power" stat={data.power} />
          <Stats label="Combat" stat={data.combat} />
        </div>
      </div>
    </>
  );
}

export default Statsboard;
