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
use App\Activity;
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
            'end_date' => $request->end_date,
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

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 19,
            'content' => 0,
        ]);
    }

    public function vote(Request $request) {
        $created = true;
        $duplicated = false;
        $poll = Poll::findOrFail($request->poll_id);

        if(PollVote::where([['poll_id', $request->poll_id], ['poll_option_id', $request->vote_id], ['user_id', Auth::user()->id]])->count() > 0) {
           $created = false;
           $duplicated = true;
        } else {
            PollVote::create([
                'poll_id' => $request->poll_id,
                'poll_option_id' => $request->vote_id,
                'user_id' => Auth()->user()->id
            ]);
        }

        Activity::create([
            'project_id' => $poll->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 20,
            'content' => 0,
        ]);

        return response()->json([
            'created' => $created,
            'duplicate' => $duplicated,
        ]);
    }

    public function editPoll(Request $request) {
       $poll = Poll::where('id', $request->edit_id)->with('options', 'votes')->first();

       $options = $request->edit_options;
       if(sizeof($options) > 0) {
           $poll->options()->delete();
           $poll->votes()->delete();

           foreach ($options as $option) {
               PollOption::create([
                   'content' => $option,
                   'user_id' => Auth::user()->id,
                   'poll_id' => $poll->id,
               ]);
           }
       }

        $poll->title = $request->edit_title;
        $poll->content = $request->edit_content;
        $poll->multiple = $request->edit_multiple;
        $poll->change = $request->edit_change;
        $poll->end_date = $request->edit_end_date;
        $poll->save();

        Activity::create([
            'project_id' => $poll->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 23,
            'content' => 0,
        ]);

    }

    public function deletePoll(Request $request) {
        Poll::destroy($request->edit_id);
        Activity::create([
            'project_id' => $poll->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 22,
            'content' => 0,
        ]);
    }

    public function delete(Request $request) {
        $poll = Poll::findOrFail($request->poll_id);

        Activity::create([
            'project_id' => $poll->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 21,
            'content' => 0,
        ]);


        PollVote::where([['poll_id', $request->poll_id], ['user_id', Auth::user()->id]])->delete();
    }
}
