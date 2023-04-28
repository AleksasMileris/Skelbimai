<?php

namespace App\Http\Controllers;

use App\Models\commentLike;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return inertia("Posts/Create",[
            'category_id'=>$id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'city'=>'required|min:3',
                'photo'=>'required'

            ]);
        $post= new Post();
        $post->name=$request->name;
        $post->category_id=$request->category_id;
        $post->price=$request->price;
        $post->city=$request->city;

        if ($request->file("photo")!=null){
            $request->file("photo")->store("/public/posts");
            $post->photo=$request->file("photo")->hashName();
        }

        $post->save();

        return to_route('categories.show',$request->category_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $comments=CommentLike::all()->where('post_id','like',$post->id)->first();

        return inertia("Posts/Show",[
                'post'=>$post,
                'liked'=>$comments->liked,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia("Posts/Edit",[
                'post'=>$post,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {


        $request->validate(
            [
                'name'=>'required|min:3',
                'city'=>'required|min:3',

            ]);

        $post->name=$request->name;
        $post->category_id=$request->category_id;
        $post->price=$request->price;
        $post->city=$request->city;
        $post->comment=$request->comment;
        if ($request->file("photo")!=null){
            if ($post->photo!=null){
                unlink(storage_path()."/app/public/posts/".$post->photo);
            }
            $request->file("photo")->store("/public/posts");
            $post->photo=$request->file("photo")->hashName();
        }
        $post->save();

        return to_route('categories.show',$request->category_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return to_route('categories.show',$post->category_id);
    }
}
