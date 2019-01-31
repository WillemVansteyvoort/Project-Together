<?php

namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Reply;
use App\Tag;
use App\Project;
use App\Post;
use Illuminate\Support\Facades\Auth;
class ForumController extends Controller
{
    public function getReplies(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $replies = Reply::where('project_id', '=', $project->id)->with('post', 'user')->orderBy('created_at', 'desc')->get();
        return $replies;
    }

    public function getTags(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $tags = Tag::where([['project_id', '=', $project->id], ['taggable_type', '=', 'App\Post']])->get();
        return $tags;
    }

    public function createPost(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $post = Post::create([
            'user_id' => Auth::user()->id,
            'project_id'=> $project->id,
            'title' => $request->post_title,
            'content' => $request->post_message,
        ]);

        $tags = $request->post_tags;
        foreach ($tags as $tag) {
            if(Tag::where([['name', '=', $tag], ]))
            Tag::create([
                'name' => $tag,
                'taggable_id' => $post->id,
                'taggable_type' => 'App\Post',
                'project_id' => $project->id,
            ]);
        }

        //setting as a reply
        $reply = Reply::create([
            'post_id' => $post->id,
            'user_id' => Auth::user()->id,
            'project_id' =>$project->id,
            'created' => true,
        ]);
    }

    public function getPost(Request $request) {
        $post = Post::with('replies', 'user')->where([['id', '=', $request->id]])->first();
        return $post;
    }

    public function createReply(Request $request) {
        $post = Post::findOrFail($request->post_id);
        $reply = Reply::create([
           'post_id' => $request->post_id,
            'user_id' => Auth::user()->id,
            'project_id' =>$post->id,
            'content' => $request->reply_message,
        ]);
    }

    public function editReply(Request $request) {
        $reply = Reply::findOrFail($request->id);
        $reply->content = $request->message;
        $reply->save();
    }

    public function deleteReply(Request $request) {
        Reply::destroy($request->id);
    }
}
