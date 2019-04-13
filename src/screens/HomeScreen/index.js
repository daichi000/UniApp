import React, {Component} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Share,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { WebBrowser } from 'expo';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

/* from app */
import FlatList from 'app/src/components/FlatList';
import Item from 'app/src/components/Item';
import Text from 'app/src/components/Text';
import firebase from 'app/src/firebase';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';

@withNavigationFocus
@connect(state => ({
  currentScreen: state.screen,
}))

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: I18n.t('TimeTable.title'),
  })

  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }
 
  _showData = (data,row, index) => {
    console.log(data, row, index);
  }

  onLayout = (e) => {
    this.setState({
      height: e.nativeEvent.layout.height
    });
  }

  render() {
    // const state = this.state;
    const tableHead = ['','月', '火', '水', '木', '金'];
    const tableTitle = ['1','2','3','4','5'];
    const tableData = [
      ['1', '2', '3', '4', '5'],
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
    ];
    return (
        <View style={styles.container} onLayout={this.onLayout}>
        <Table>
        <TableWrapper>
          {/* テーブルヘッダー */}
          <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[1,2,2,2,2,2]}/>
            {
            tableData.map((data, i) => (
              <TableWrapper key={i} style={styles.row}>
              {/* テーブル左タイトル */}
              <Col data={[tableTitle[i]]} style={styles.title} heightArr={[(this.state.height-40)/5]} textStyle={styles.titleText}/>
                {
                  data.map((cell, j) => (
                    <TouchableOpacity key={j} style={j == 0 ? styles.cell: styles.cellFirst} onPress={() => this._showData(cell, i, j)}>
                      <Cell data={cell} textStyle={styles.text}/>
                    </TouchableOpacity>
                  ))
                }
              </TableWrapper>
            ))                     
          }
        </TableWrapper>
      </Table>
      </View>
    );
  }
}
