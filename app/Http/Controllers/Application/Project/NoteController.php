<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\Application\Project;

use Illuminate\Foundation\Console\PolicyMakeCommand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Activity;
use App\Note;
use Illuminate\Support\Facades\Auth;
class NoteController extends Controller
{
    public function getNotes(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        return Note::where([['project_id', '=', $project->id], ['private', '=', false]])->orWhere([['project_id', '=', $project->id], ['user_id', '=', Auth::user()->id], ['private', '=', true]])->with('user')->orderBy('id', 'desc')->get();
    }

    public function create(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $note = Note::create([
            'name' =>  $request->title,
            'project_id' => $project->id,
            'user_id' => Auth::user()->id,
            'text' => $request->text,
            'private' => $request->private,
        ]);

        if(!$request->private) {
            Activity::create([
                'project_id' => $project->id,
                'company_id' => $project->company_id,
                'user_id' => Auth::user()->id,
                'type' => 2,
                'content' => 0,
            ]);
        }

    }

    public function delete(Request $request) {
        $note = Note::findOrFail($request->id);
        if(!$note->private) {
            Activity::create([
                'project_id' => $note->project_id,
                'company_id' => Auth::user()->company_id,
                'user_id' => Auth::user()->id,
                'type' => 11,
                'content' => 0,
            ]);
        }
        Note::destroy($request->id);
    }
}
