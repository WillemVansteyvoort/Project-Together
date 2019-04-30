<?php

namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Poll;
use App\PollOption;
use App\PollVote;
use App\User;
use Illuminate\Support\Facades\Auth;
class PollController extends Controller
{

    public function getitems(Request $request) {
        $project = Project::where('url', '=', $request->project)->with('projectPolls.options', 'projectPolls.votes',  'projectPolls.options.votes')->first();
        return $project->projectPolls;
    }

    public function create(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();

        $poll = Poll::create([
            'title' => $request->title,
            'content' => $request->desc,
            'project_id' => $project->id,
            'multiple' => $request->multiple,
            'change' => $request->change,
        ]);

        //options
        foreach ($request->options as $option) {
            PollOption::create([
                'content' => $option,
                'user_id' => Auth::user()->id,
                'poll_id' => $poll->id,
            ]);
        }
    }

    public function vote(Request $request) {
        PollVote::create([
           'poll_id' => $request->poll_id,
            'poll_option_id' => $request->vote_id,
            'user_id' => Auth()->user()->id
        ]);
    }

    public function delete(Request $request) {
        PollVote::destroy($request->vote_id);
    }
}
