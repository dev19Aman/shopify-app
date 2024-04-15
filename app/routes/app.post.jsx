import React from 'react'
import { createPost, getPosts } from '../services/post.server';
import { Form, redirect } from '@remix-run/react';
import dbconnection from '../services/db';
import { useLoaderData } from "@remix-run/react";


// dbconnection()

export const  loader = async () => {
  // await dbconnection(); 
  return await getPosts();
};


export const action = async ({ request }) => {  
  const formData = await request.formData();
  const title = formData.get("title");
  await createPost({ title });
return redirect("/app")
};

const Post = () => {
  const getData = useLoaderData()
  console.log(getData);
  return (
    <div>
          <Form
        method="post"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label>
            Post Title:
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </Form>


      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
     {getData?.map(i=>(
      <li>{i?.title}</li>
     ))}
    </div>
    </div>
  )
}

export default Post
