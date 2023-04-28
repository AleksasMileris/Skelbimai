<?php

namespace App\Http\Controllers;

use App\Models\CommentLike;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $old=CommentLike::all()->where('user_id','like',$request->user_id)->where('post_id','like',$request->post_id)->first();
        $old->delete();
        $comment=new CommentLike();
        $comment->user_id=$request->user_id;
        $comment->post_id=$request->post_id;
        $comment->comment=$request->comment;
        $comment->save();

        return to_route('posts.show',$request->post_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(commentLike $commentLike)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(commentLike $commentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, commentLike $commentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(commentLike $commentLike)
    {
        //
    }
    public function comment($id){

        return Inertia::render('Comments/Index',[
            'id'=>$id,
        ]);
    }
    public function like(Request $request){
        $liked=CommentLike::all()->where('user_id','like',$request->user_id)->where('post_id','like',$request->post_id)->first();
        if ($liked->liked == 0){
            $liked->liked=1;
            $liked->save();
            return to_route('posts.show',$request->post_id);
        };
        if ($liked->liked == 1){
            $liked->liked=0;
            $liked->save();
            return to_route('posts.show',$request->post_id);
        };



    }
}
