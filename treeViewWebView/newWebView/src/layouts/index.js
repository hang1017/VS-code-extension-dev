import React, { Component } from 'react';
import styles from './index.less';

const BasicLayout= ({ children }) => {
  return (
    <div className={styles.normal}>
      {children}
    </div>
  );
};

export default BasicLayout;
