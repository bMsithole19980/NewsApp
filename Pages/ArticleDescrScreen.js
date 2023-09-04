import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Linking } from 'react-native';

export default function ArticleDescrScreen() {
  const route = useRoute();
  const { article } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <Text>{article.title}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: article.urlToImage }} />
      </View>
      <View style={styles.AuthorContainer}>
        <Text>{article.author}</Text>
        <Text>{article.publishedAt}</Text>
        <Text>{article.country}</Text>
       
          <Text onPress={()=> Linking.openURL(article.url)}
          style={styles.link}>Visit {article.url} </Text>
        


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderWidth: 3,
    borderColor: '#000',
    borderStyle: 'solid',
    backgroundColor: 'rgba(19, 198, 237, 0.13)',
    backdropFilter: 'blur(2.5px)',
    paddingHorizontal: 10,
  },
  titleHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgContainer: {
    width: 50,
    height: 50,
    marginRight: 10,

  },
  link:{
    color: 'blue'
  }
})