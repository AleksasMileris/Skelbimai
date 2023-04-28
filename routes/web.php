<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentLikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return to_route('categories.index');
});

Route::get('/dashboard', function () {
    return to_route('categories.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/categories/filter',[CategoryController::class,"filter"])->name("categories.filter");

Route::post('/posts/filter',[CategoryController::class,"filterPosts"])->name("posts.filter");

Route::get('/categories/order/{field}/{dir}',[CategoryController::class,"order"])->name("categories.order");


Route::resource('categories', CategoryController::class)->only([
    'index',"show","create"
]);
Route::resource('posts', PostController::class)->only([
    "show"
]);
Route::get('comments/comment/{id}/',[CommentLikeController::class,'comment'])->name('comments.note');
Route::get('comments/like/{post_id}/{user_id}',[CommentLikeController::class,'like'])->name('comments.like');
Route::resource('comments', CommentLikeController::class);



Route::middleware("closedDoors")->group( function (){
    Route::resource('categories', CategoryController::class)->except([
        "index","show"
    ]);
    Route::resource('posts', PostController::class)->except([
        "show"
    ]);

});

Route::get('posts/create/{id}', [PostController::class,'create'])->name('posts.create');

Route::get('error/message',[CategoryController::class,'throwMessage'])->name('categories.error');


require __DIR__.'/auth.php';
