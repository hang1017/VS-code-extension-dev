import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import styles from './index.less';

@connect(({ pig3 }) => ({ pig3 }))
class Page extends Component{
  state = {};

  btnClick = () => {
    window.parent.postMessage({ifarmeLabel: 'pig3'},'*');
  }

  render() {
    const {
      pig3: { name },
    } = this.props;
    return (
      <div>
        <h2>this is pig3</h2>
        <Button onClick={this.btnClick}>showMessage:pig3</Button>
      </div>
    );
  }
}

export default Page;
