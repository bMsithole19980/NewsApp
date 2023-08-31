import { Pressable, StyleSheet, Text, View , } from 'react-native';
import React  from 'react';
import { FlatList } from 'react-native';


export default function CategoriesScreen({navigation}) {
    const Categories= ['Technology', 'Business', 'Sports', 'Science', 'Entertainment', 'General', 'Health'];

    
   const navigateToArticle=(category)=>{
    navigation.navigate('ArticleList', {category});
   };

    

  return (
    <View style={styles.container}>
     
       <FlatList
       data={Categories}
       horizontal
       renderItem={({item}) =>{
        return (
        <Pressable
        style={styles.category}
        onPress={()=> navigateToArticle(item)}
        >
            <Text style={styles.cat}>{item}</Text>

        </Pressable>)
       }}
       keyExtractor={(item)=> item}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    heading:{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    category:{
        padding: 2,
       flexDirection: 'row',
       marginRight: 20,
       marginTop: 20
    
    },
    cat:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    img:{
        width: 100,
        height: 100
    },
})