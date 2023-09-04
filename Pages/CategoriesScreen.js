import { Pressable, StyleSheet, Text, View , Image } from 'react-native';
import React  from 'react';
import { FlatList } from 'react-native';
import newLogoImage from '../Image/news.jpg'

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
            <View>
                <Pressable
                    style={styles.category}
                    onPress={() => navigateToArticle(item)}
                >
                    <Text style={styles.cat}>{item}</Text>
                </Pressable>
                <View style={styles.newsLogo}>
                    <Image source={newLogoImage} style={styles.img} resizeMode='cover' />
                </View>
            </View>

       )
       }}
       keyExtractor={(item)=> item}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        borderWidth: 3,
        borderColor: '#000',
        borderStyle: 'solid',
        backgroundColor: 'rgba(19, 198, 237, 0.13)',
        backdropFilter: 'blur(2.5px)',
        paddingHorizontal: 10,
    },
    newsLogo:{
        width: "100%",
        height: 90,
        marginTop: 100,    
    },
    category:{
        padding: 2,
       flexDirection: 'row',
       marginRight: 20,
       
    
    },
    cat:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 44
    },
    img:{
        width: "100%",
        height: 100,
        
   
    },
})