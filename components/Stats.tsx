import * as React from "react";
import { Component } from "react";
import styles from "@/styles/statsboard.module.css";
import { BellCurve } from "@/utilities/bell_curve_function";
interface IStat {
  label: string;
  stat: number;
}
function Stats({ label, stat }: IStat) {
  return (
    // <div className={styles.row}>
    <>
      <h3>{label}</h3>
      <div
        className={styles.bar}
        style={{
          width: `${stat}%`,
          backgroundColor: `rgb(${Math.floor(
            BellCurve(stat / 50) * 130 + (255 * (100 - stat)) / 100
          )},${Math.floor(BellCurve(stat / 50) * 130 + (255 * stat) / 100)},0)`,
        }}
      ></div>
      <p>{stat}</p>
    </>
  );
}

export default Stats;
