/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, TouchableHighlight, FlatList, Modal,Image} from 'react-native';
import {connect} from 'react-redux';
import CardView from '../../components/CardView/CardView';
import Camera from '../../../assets/icons/Camera.png';
import Close from '../../../assets/icons/closeGrey.png';

import styles from './styles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,

      list: [
        {id: 0, text: 'octobre le 10/12/2021', isTitle: true},

        {
          id: 1,
          icon: Camera,
          date: 'mm/mm/mm',
          title: 'recu le',
          procent: 10,
          isTitle: false,
        },
        {
          id: 2,
          icon: Camera,
          date: 'mm/mm/mm',
          title: 'recu le',
          procent: 30.22,
          isTitle: false,
        },
        {id: 0, text: 'octobre le 10/12/2021', isTitle: true},

        {
          id: 1,
          icon: Camera,
          date: 'mm/mm/mm',
          title: 'recu le',
          procent: 10,
          isTitle: false,
        },
        {
          id: 2,
          icon: Camera,
          date: 'mm/mm/mm',
          title: 'recu le',
          procent: 30.22,
          isTitle: false,
        },
      ],
      seed: 1,
      page: 1,
      isLoading: false,
      isRefreshing: false,
    };
  }

  loadData = () => {
    const {users, seed, page} = this.state;
    this.setState({isLoading: true});

    /**   fetch(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          users: page === 1 ? res.results : [...list, ...res.results],
          isRefreshing: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });*/
  };

  handleRefresh = () => {
    this.setState(
      {
        seed: this.state.seed + 1,
        isRefreshing: true,
      },
      () => {
        this.loadData();
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.loadData();
      },
    );
  };

  componentDidMount() {
    this.loadData();
  }

  initData = async () => {};

  renderItem = ({item}) => <CardView item={item} />;

  render() {
    const {list, isRefreshing} = this.state;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.setState({showModal: !this.state.showModal})}
          underlayColor="rgba(73,182,77,1,0.9)">
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.itemTitle}>Filter</Text>
            </View>
          </View>
        </TouchableHighlight>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={5}
          refreshing={isRefreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() =>
                  this.setState({showModal: !this.state.showModal})
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.buttomIcon}>
               
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(HomeScreen);
