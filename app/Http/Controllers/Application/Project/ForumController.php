<?php

namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Reply;
use App\Tag;
use App\Activity;
use App\Project;
use Illuminate\Support\Facades\DB;
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
        $tags = Tag::select('name')->where([['project_id', '=', $project->id], ['taggable_type', '=', 'App\Post']])->groupBy('name')->get();
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

        //activity
        Activity::create([
            'project_id' => $project->id,
            'company_id' => $project->company_id,
            'user_id' => Auth::user()->id,
            'type' => 3,
            'content' => 0,
        ]);

        return Reply::with('post', 'user')->find($reply->id);


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
            'project_id' => $post->project_id,
            'content' => $request->reply_message,
        ]);

        Activity::create([
            'project_id' => $post->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 4,
            'content' => 0,
        ]);
    }

    public function getPostwithTags() {

    }

    public function editReply(Request $request) {
        $reply = Reply::findOrFail($request->id);
        $reply->content = $request->message;
        $reply->save();

        Activity::create([
            'project_id' => $reply->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 14,
            'content' => 0,
        ]);

    }

    public function editFirst(Request $request) {
        $post = Post::findOrfail($request->id);
        $post->content = $request->message;
        $post->title = $request->title;
        $post->save();

        Activity::create([
            'project_id' => $post->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 13,
            'content' => 0,
        ]);

    }

    public function deleteFirst(Request $request) {
        $post = Post::findOrfail($request->id);
        $post->replies()->delete();
        $post->tags()->delete();

        Activity::create([
            'project_id' => $post->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 12,
            'content' => 0,
        ]);

        Post::destroy($request->id);
    }

    public function deleteReply(Request $request) {
        $reply = Reply::findOrFail($request->id);

        Activity::create([
            'project_id' => $reply->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 15,
            'content' => 0,
        ]);

        Reply::destroy($request->id);
    }

}
