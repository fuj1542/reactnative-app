import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem'
import Constants from 'expo-constants'
import axios from 'axios';


const URL=`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Constants.manifest.extra.newsApiKey}`

export default HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
    }, 
    [])

  const fetchArticles = async () => {
    try {
      const respons = await axios.get(URL);
      setArticles(respons.data.articles)
    }catch(error){
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <ListItem 
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        )}
        keyExtractor={(item, index) => index.toString() }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  NewsImg: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer:{
    height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth : 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  Text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  }
});
