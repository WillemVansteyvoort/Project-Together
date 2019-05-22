<?php

namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Tlist;
use App\Task;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\List_;
use Carbon\Carbon;
use App\Activity;
class TaskController extends Controller
{
    public function getLists(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $tasks = Task::where([['project_id', $project->id], ['end_date', '>', Carbon::today()]])->get();
        return response()->json([
            'lists' => $project->taskLists,
            'tasks' => $tasks
        ]);
    }

    public function asDone(Request $request) {
        $task = Task::findOrFail($request->task_id);
        $task->user_id = Auth::user()->id;
        $task->status = !$task->status;

        if($task->status) {
            Activity::create([
                'project_id' => $task->project_id,
                'company_id' => Auth::user()->company_id,
                'user_id' => Auth::user()->id,
                'type' => 7,
                'content' => 0,
            ]);
        }
         else {
             Activity::create([
                 'project_id' => $task->project_id,
                 'company_id' => Auth::user()->company_id,
                 'user_id' => Auth::user()->id,
                 'type' => 8,
                 'content' => 0,
             ]);
         }

        $task->save();
    }

    public function addTimer(Request $request) {
        $task = Task::findOrFail($request->task_id);
        $task->timer = $request->timer;
        $task->save();
    }

    public function getProjectUsers(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        return $project->users;
    }

    public function createTask(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();

        Task::create([
            'title' => $request->task_title,
            'description' => $request->task_desc,
            'end_date' => $request->task_end,
            'tlist_id' => $request->task_list,
            'user_id' => $request->task_user,
            'company_id' => $project->company_id,
            'project_id' => $project->id,
        ]);

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 6,
            'content' => 0,
        ]);

         return $project->taskLists;
    }

    public function createList(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
       $list = Tlist::create([
           'name' => $request->list_name,
            'project_id' => $project->id,
        ]);

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 5,
            'content' => 0,
        ]);

       return $project->taskLists;
    }

    public function editList(Request $request) {
        $list = Tlist::findOrFail($request->list_id);
        $list->name = $request->list_name;
        $list->save();
    }

    public function deleteList(Request $request) {
        $list = Tlist::findOrFail($request->list_id);
        $list->tasks()->delete();
        $list->delete();
    }

    public function getModule(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $tasks = Task::where([['project_id', $project->id], ['user_id', 0], ['status', 0]])->orWhere([['project_id', $project->id], ['user_id', Auth::user()->id], ['status', 0]])->limit(2)->get();
        return $tasks;
    }

    public function deleteTask(Request $request) {
        $task = Task::findOrFail($request->taskId);
        Task::destroy($request->taskId);

        Activity::create([
            'project_id' => $task->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 10,
            'content' => 0,
        ]);

    }

    public function editTask(Request $request) {
        $task = Task::findOrFail($request->edit_id);
        $task->title = $request->edit_title;
        $task->description = $request->edit_desc;
        $task->end_date = $request->edit_end;
        $task->user_id = $request->edit_user;
        $task->save();

        Activity::create([
            'project_id' => $task->project_id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 9,
            'content' => 0,
        ]);

        $project = Project::where('id', '=', $task->project_id)->first();
        $tasks = Task::where([['project_id', $project->id], ['end_date', '>', Carbon::today()]])->get();
        return response()->json([
            'lists' => $project->taskLists,
            'tasks' => $tasks
        ]);
    }

    public function widget() {
        $tasks = Task::where([['user_id', Auth::user()->id], ['status', false]])->orWhere([['user_id', 0], ['status', false]])->with('project')->get();
        return $tasks;
    }
}
