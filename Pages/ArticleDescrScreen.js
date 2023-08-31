import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function ArticleDescrScreen() {
    const route =useRoute();
    const {article} =route.params;
  return (
    <View style={styles.container}>
      <Text>ArticleDescrScreen</Text>
      <View style={styles.titleHeader}>
        <Text>{article.title}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: article.urlToImage }}/>
      </View>
      <View style={styles.AuthorContainer}>
        <Text>{article.author}</Text>
        <Text>{article.publishedAt}</Text>
        <Text>{article.country}</Text>
        <Text>Visiit {article.url}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    titleHeader:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer:{

    }
})