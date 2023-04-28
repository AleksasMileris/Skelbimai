<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commentLike extends Model
{
    use HasFactory;
    public function user(){
        return $this->belongsTo(Post::class);
    }
    public function post(){
        return $this->belongsTo(User::class);
    }
}
