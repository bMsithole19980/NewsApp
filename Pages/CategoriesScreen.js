import { Pressable, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import newLogoImage from '../Image/news.jpg';
import newsLogo from '../Image/news1.jpg';
import { API_KEY } from './Config';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal'

export default function CategoriesScreen({ navigation }) {
    const Categories = ['Technology', 'Business', 'Sports', 'Science', 'Entertainment', 'General', 'Health'];
    const [selectedCatergory, setSelectedCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [showSideBar, setShowSideBar] = useState(false);
    const [showSearchInput, setShowSearchInput]= useState(false);
    const [searchText, setSearchText]= useState('');
    const country = 'us';

    const navigateToArticle = (category) => {
        navigation.navigate('ArticleList', { category });
    };

    useEffect(() => {
        try {
            const fetchAllNews = async () => {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`);
                const data = await response.json();
                setArticles(data.articles);
            };
            fetchAllNews();
        } catch (error) {
            console.error('Error fetching articles: ', error);
        }

    }, []);
    const handleSearch=()=>{
        const filteredArticles = articles.filter((article)=>
          article.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setArticles(filteredArticles);

    }


    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <Pressable
                    onPress={() => setShowSideBar(true)}>
                    <FontAwesome name="bars" size={24} color="black" style={styles.menuIcon} />
                </Pressable>
                <Pressable
                onPress={()=> setShowSearchInput(true)}>
                    <FontAwesome name="search" size={24} color="black" />
                </Pressable>

            </View>
            {showSearchInput && (
                <TextInput
                style={styles.searchInput}
                placeholder='Search for articles'
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}/>
            )}
            <Modal
                isVisible={showSideBar}
                animationIn="slideInLeft"
                animationOut='slideOutRight'
                swipeDirection="left"
                onSwipeComplete={() => setShowSideBar(false)}
                obBackdropPress={() => setShowSideBar(false)}>
                <View style={styles.slideBarContainer}>
                    <Pressable
                        onPress={() => setShowSideBar(false)}>
                        <FontAwesome name="times" size={24} color="black" style={styles.closeIcon} />
                    </Pressable>

                    <FlatList
                        data={Categories}
                        renderItem={({ item }) => {
                            return (

                                <Pressable
                                    style={styles.sidebarItem}
                                    onPress={() => {
                                        navigateToArticle(item);
                                        setShowSideBar(false);
                                    }}

                                >
                                    <Text style={styles.sideBarText}>{item}</Text>
                                </Pressable>

                            )
                        }}
                        keyExtractor={(item) => item} />
                </View>
            </Modal>

            <View style={styles.newsBox}>
                <FlatList
                    data={articles}
                    renderItem={({ item }) => {
                        return (
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

                        );
                    }} />

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
    navBar:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menuIcon: {
        fontSize: 24,
        marginLeft: 10,
        marginTop: 10,
    },
    searchInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 8,
        margin: 10,
    },
    slideBarContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    closeIcon: {
        fontSize: 24,
        alignSelf: 'flex-end',
    },
    sidebarItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    sideBarText: {
        fontSize: 18,
    },
    category: {
        padding: 2,
        flexDirection: 'row',
        marginRight: 10,


    },
    cat: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 44
    },
    imag: {
        width: "100%",
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain'



    },
    articleWrap: {
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

    }
    , articleWrap: {
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

    }
    ,
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