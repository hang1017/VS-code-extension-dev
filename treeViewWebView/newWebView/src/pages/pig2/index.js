import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import styles from './index.less';

@connect(({ pig2 }) => ({ pig2 }))
class Page extends Component{
  state = {};

  btnClick = () => {
    window.parent.postMessage({ifarmeLabel: 'pig2'},'*');
  }

  render() {
    const {
      pig2: { name },
    } = this.props;
    return (
      <div>
        <h2>this is pig2</h2>
        <Button onClick={this.btnClick}>showMessage:pig2</Button>
      </div>
    );
  }
}

export default Page;
