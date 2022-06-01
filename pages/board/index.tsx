import AddPost from "@/components/board/AddPost";
import Article from "@/components/board/Article";
import { IArticle } from "@/types";
import { values } from "lodash";
import { InferGetStaticPropsType } from "next";
import { number } from "prop-types";
import React, { useState } from "react";

export default function BoardPage({articles}: InferGetStaticPropsType<typeof getStaticProps>){
    const [articleList, setArticleList] = useState(articles)

    const addPost = async (e:React.FormEvent, formData: IArticle) => {
        e.preventDefault()
        const article: IArticle = {
            artId: Math.random(),
            title: formData.title,
            content: formData.content
        }
        setArticleList([article, ...articleList])
    }

    const deletePost = async (artId:number) => {
        const arr: IArticle[] = articleList.filter((article:IArticle) => (article.artId !== artId))
        setArticleList(arr)
    }

    if(!articleList) return <h1>Loading...</h1>

    return <>
    <AddPost write={addPost}/>
    {articleList.map((article: IArticle)=>(
        <Article key={article.artId} deletePost={deletePost} article={article}/>
    ))}
    </>
}

export async function getStaticProps() {
    const res = await fetch(BASE_URL)
    const articles: IArticle[] = await res.json()

    return { props: {articles}}
}

const BASE_URL: string = "http://localhost:8080/articles"