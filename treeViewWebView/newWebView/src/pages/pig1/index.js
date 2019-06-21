import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import styles from './index.less';

@connect(({ pig1 }) => ({ pig1 }))
class Page extends Component{
  state = {};

  btnClick = () => {
    window.parent.postMessage({ifarmeLabel: 'pig1'},'*');
  }

  render() {
    return (
      <div>
        <h2>this is pig1</h2>
        <Button onClick={this.btnClick}>showMessage:pig1</Button>
      </div>
    );
  }
}

export default Page;
