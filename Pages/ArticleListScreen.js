import { Pressable, StyleSheet,TextInput, Text, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from './Config';
import {FontAwesome} from '@expo/vector-icons'


export default function ArticleListScreen() {
    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState('');
    const [searchQuery, setSearchQuery]= useState('');
    const [language, setLanguage]= useState('en')
    const route = useRoute();
    
    const category = route.params.category;

    const countryOPtions = {
        'United States': 'us',
        'United Kingdom': 'gb',
        'Australia': 'au',
        'Canada': 'ca',
        'South Africa': 'za',
        'India': 'in',

    }

    const navigation = useNavigation();
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=${language}&apiKey=${API_KEY}`
                )
                setArticles(response.data.articles);
                console.log('Fetched articles:', response.data.articles);


            } catch (error) {
                console.error('Error fetching articles');
            }
        }
        fetchArticles();
    }, [category])



    const filteredArticles= articles.filter((article)=>{
        const lowerCaseQuery = searchQuery.toLowerCase();
        const title = article.title ? article.title.toLowerCase(): '';
        const description = article.description ? article. description.toLowerCase(): '';

        return(
         title.includes(lowerCaseQuery) ||
         description.includes(lowerCaseQuery)   
        );
    });
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.header}>Today {category} News</Text>
                <TextInput
                style={styles.searchInput}
                placeholder='Search...'
                value={searchQuery}
                onChangeText={(text)=> setSearchQuery(text)}/>
                <Pressable>
                    <FontAwesome name="search" size={24} color="black" />
                </Pressable>
                
                

            </View>

            <View style={styles.newsImage}>

            </View>
            <View style={styles.newsBox}>
                <FlatList
                    data={filteredArticles}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.articleContainer}
                            onPress={() => navigation.navigate('ArticleDescr', { article: item })}>
                            <View style={styles.articleWrap}>
                                <View style={styles.articleImg}>
                                    <Image source={{ uri: item.urlToImage }} style={styles.img} />
                                </View>

                                <View style={styles.newsTextContainer}>
                                    <Text style={styles.newsText} >{item.title}</Text>
                                </View>

                            </View>

                        </Pressable>

                    )}
                />

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
        border: '1px solid #000000',
        backdropFilter: 'blur(2.5px)',
        paddingHorizontal: 10,

    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
       
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16
    },
    comboBox: {
        marginLeft: 300,
        fontWeight: 'bold',
        fontSize: 16
    },
    pickerr:{
        borderRadius: 5,
        color: 'blue',
        fontSize: 16,
        borderColor: 'blue'
    },
    newsImage: {
        width: '100%',
        height: 50

    }, articleWrap: {
        width: '98%',
        height: 150,
        marginBottom: 10,
        padding: 20,
        marginLeft: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 9.32,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: 4,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#000',

    },
    articleImg: {
        width: 102,
        height: 100,
        flexShrink: 0,
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 4,
        gap: 9.32,

    },
    img: {
        width: 100,
        height: 100
    },
    newsTextContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    newsText: {
        fontSize: 14,


    },

})