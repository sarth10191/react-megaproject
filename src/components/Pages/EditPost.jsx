import React, { useEffect, useState } from "react";
import {Container , PostForm} from "../index.js"
import service from "../../appwrite/config.js";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

export default function AddPost(){
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){const post  = service.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        })}
        
        else{
            navigate("/")
        }
    }, [slug, navigate])
    return ( post ? (<>
        <div className="py-8">
            <Container>
                <PostForm>
                </PostForm>
            </Container>
        </div>
    </>): null
    )
}