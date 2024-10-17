"use client";

import styles from "./square.module.css";

export default function Square({
  value,
  action,
  inputKey,
}: {
  value: number;
  action: () => void;
  inputKey: number;
}) {
  return (
    <button className={styles.container} onClick={action} key={inputKey}>
      {value}
    </button>
  );
}
