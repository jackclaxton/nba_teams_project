import React from 'react';
import styles from './ActivityIndicator.module.css';

function ActivityIndicator() {
  return (
    <div className={styles.ldsRing}>
      <div></div><div></div><div></div><div></div>
    </div>
  )
}

export default ActivityIndicator