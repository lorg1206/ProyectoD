import  {Request, Response, response} from  'express'

import  {connect}  from  '../database'
import {Post} from '../interface/post'

export async function getPosts(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const posts = await conn.query('Select * FROM posts');
    return res.json(posts[0]);
};


export async function createPost(req:Request, res:Response) {
    const newPost: Post= req.body;
    const conn = await connect();
    await conn.query('INSERT INTO posts SET ?', [newPost]);
    console.log(newPost);
    return res.json({
        message: 'post Created'
    })
}

export async function getPost(req: Request, res: Response): Promise<Response>{
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
    return res.json(posts[0]);
};