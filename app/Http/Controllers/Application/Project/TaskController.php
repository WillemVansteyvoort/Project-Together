<?php

namespace App\Http\Controllers\Application\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\tlist;
use App\Task;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\List_;
use Carbon\Carbon;
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
         return $project->taskLists;
    }

    public function createList(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
       $list = tlist::create([
           'name' => $request->list_name,
            'project_id' => $project->id,
        ]);

       return $project->taskLists;
    }

    public function getModule(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $tasks = Task::where([['project_id', $project->id], ['user_id', 0], ['status', 0]])->orWhere([['project_id', $project->id], ['user_id', Auth::user()->id], ['status', 0]])->limit(2)->get();
        return $tasks;
    }

    public function deleteTask(Request $request) {
        Task::destroy($request->taskId);
    }

    public function editTask(Request $request) {
        $task = Task::findOrFail($request->edit_id);
        $task->title = $request->edit_title;
        $task->description = $request->edit_desc;
        $task->end_date = $request->edit_end;
        $task->user_id = $request->edit_user;
        $task->save();

        return $task;
    }
}
