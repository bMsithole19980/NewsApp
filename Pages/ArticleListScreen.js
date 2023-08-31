import { Pressable, StyleSheet, Text, Image,View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ArticleListScreen() {
    const [articles, setArticles]= useState([]);
    const route= useRoute();
    const apiKey ='c7f53a4794ed45378d40382bd6090e76';
    const category =route.params.category;

    const navigation= useNavigation();
    useEffect(()=>{
        const fetchArticles= async()=>{
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
                )
                setArticles(response.data.articles);
                console.log('Fetched articles:', response.data.articles);
                
                
            } catch (error) {
                console.error('Werror fetching articles');
            }
        }
        fetchArticles();
    },[category])
  return (
    <View style={styles.container}>
      <Text>Article in {category}</Text>
      <FlatList
      data={articles}
      keyExtractor={(item)=> item.title}
      renderItem={({item})=>(
          <Pressable
          style={styles.articleContainer}
          onPress={() => navigation.navigate('ArticleDescr', {article: item})}>
              <View style={styles.articleWrap}>
                  <Image source={{ uri: item.urlToImage }} style={styles.articleImg} />
                  <Text>{item.title}</Text>
           

              </View>
              
          </Pressable>

      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    articleContainer:{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    articleWrap:{
    flexDirection: 'row'
    },
    articleImg:{
        width: 50,
        height: 50,
        marginRight: 10,

    }
})