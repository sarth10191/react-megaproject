import React, {useEffect, useState} from "react";
import service from "../../appwrite/config";
import Container from "../Container/Container";
import {PostCard} from "../index.js"

export default function AllPosts(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{}, [])
    service.getPosts([])
    .then((posts)=>{if(posts) setPosts(posts.documents)})
    .catch()
    return <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
            {posts.map((post)=>(
                <div key={post.$id} className="p2-2 w-1/4">
                    <PostCard
                        post = {post}
                    ></PostCard>
                </div>
            ))}
            </div>
        </Container>
    </div>
}