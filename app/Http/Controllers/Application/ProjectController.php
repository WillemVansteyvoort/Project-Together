<?php

namespace App\Http\Controllers\Application;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Others\SlugifyController;
use Illuminate\Http\Request;
use App\Project;
use App\User;
use App\Tag;
use App\Group;
use App\Events\Notifications;
use App\Notification;
use App\Company;
use Carbon\Carbon;
use App\Activity;
use App\Column;
use App\BoardItem;
use Illuminate\Support\Facades\Auth;
class ProjectController extends SlugifyController
{
    public function index() {

        return view('application.projects');

    }

    public function create(Request $request) {
        $url = strtolower(str_replace(' ', '', $request->title));
        $slugify = $this->slugify($url, true);
        //create project
        $project =Project::create([
            'company_id' => Auth::user()->company_id,
            'name' => $request->title,
            'url' => $slugify,
            'description' => $request->description,
            'end_date' => $request->end_date,
            'user_id' => Auth::user()->id,
            'public' => $request->private,
            'tasks' => $request->tasks,
            'notes' => $request->notes,
            'forum' => $request->forum,
            'presences' => $request->presences,
            'board' => $request->board,
            'polls' => $request->polls,
            'activities' => $request->activities,
            'crisiscenter' => $request->crisisCenter,
            'logs' => $request->logs,
        ]);

        //connect project to creator
//        Auth::user()->projects()->attach($project, ['role' => 1]);

        //tags to project
        $tags = $request->tags;
        foreach ($tags as $tag) {

            Tag::create([
               'name' => $tag,
               'taggable_id' => $project->id,
                'taggable_type' => 'App\Project',
                'project_id' => $project->id,

            ]);
        }

        //connect other member to project
        $userIds = array(1);
        foreach ($request->selectedMembers as $item) {
            $roll = 0;
            //see what the role is
            switch ($item['roll']) {
                case "member":
                    $roll = 0;
                    break;
                case "watcher":
                    $roll = 1;
                    break;
                case "responsable" :
                    $roll = 2;
                    break;
                case "leader":
                    $roll = 3;
                    break;

            }
            // broadcast
            if($item['type'] === "user") {
                $user = User::findOrFail($item['unique']);

                if (!in_array($user->id, $userIds)) {
                    $userIds[(count($userIds)+1)] = $user->id;
                }

                if(!$user->projects->contains($project->id)) {
                    $user->projects()->attach($project, ['role' => $roll]);

                }
            } else {
                $group = Group::findOrFail($item['unique']);
                foreach ($group->users as $item2) {
                    if (!in_array($item2->id, $userIds)) {
                        $userIds[(count($userIds)+1)] = $item2->id;
                    }
                    if(!$item2->projects->contains($project->id)) {
                        $item2->projects()->attach($project, ['role' => $roll]);
                    }
                }
            }
        }

        //make rows if board is selected
        if($project->board) {
            $firstColumn = Column::create([
               'name' => 'Todo',
                'project_id' => $project->id,
                'position' => 0,
            ]);
            Column::create([
                'name' => 'In Progress',
                'project_id' => $project->id,
                'position' => 1,
            ]);
            Column::create([
                'name' => 'Done',
                'project_id' => $project->id,
                'position' => 2,
            ]);
            BoardItem::create([
               'name' => "I'm a card",
               'description' => "Hello, i'm an example card for testing :)",
                'user_id' => 0,
                'column_id' => $firstColumn->id,
                'project_id' => $project->id,
                'color' => 'red',
            ]);
        }

        //make activity
        Activity::create([
           'project_id' => $project->id,
           'company_id' => $project->company_id,
           'user_id' => Auth::user()->id,
            'type' => 0,
            'content' => 0,
            ]);

        //broadcast a notification
        foreach ($userIds as $user) {
            if(Auth::user()->id == $user) {
                $user = User::findOrFail($user);
                $noti =  Notification::create([
                    'user_id' => $user->id,
                    'title' => 'Project created',
                    'type' => 'fas fa-project-diagram',
                    'content' => 'You have just created the project ' . $project->name . ' very successful.',
                ]);
                broadcast(new Notifications($noti,$user))->toOthers();
            } else if($user->company_id == Auth::user()->id) {
                $user = User::findOrFail($user);
                $noti =  Notification::create([
                    'user_id' => $user->id,
                    'title' => 'Added to new project',
                    'type' => 'fas fa-project-diagram',
                    'content' => 'You are just added to a new project called ' . $project->name . ' by ' . Auth::user()->name . '. Go now to your projects to check it out.',
                ]);
                broadcast(new Notifications($noti,$user))->toOthers();
            }
        }

        return $project->url;
    }

    public function addUser(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        $user = User::findorFail($request->user_id);
        $user->projects()->attach($project, ['role' => $request->role_id]);

        $noti =  Notification::create([
            'user_id' => $user->id,
            'title' => 'Added to new project',
            'type' => 'fas fa-project-diagram',
            'content' => 'You are just added to a new project called ' . $project->name . ' by ' . Auth::user()->name . '. Go now to your projects to check it out.',
        ]);
        broadcast(new Notifications($noti,$user))->toOthers();

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 31,
            'content' => $user->name . " " . $user->lastname,
        ]);

    }

    public function checkName(Request $request) {
        if($request->project) {
            $project = Project::where('url', '=', $request->project)->first();
            if($request->name !== $project->name) {
                if(Project::where([['name', $request->name], ['company_id', Auth::user()->company_id]])->count() > 0) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        } else {
            if(Project::where([['name', $request->name], ['company_id', Auth::user()->company_id]])->count() > 0) {
                return 1;
            } else {
                return 0;
            }
        }

    }

    public function checkNameNew(Request $request) {

    }

    public function edit(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();

        $oldUrl = $project->url;
        //general info
        $project->name = $request->project_title;
        $project->url = $this->slugify($request->project_title, true);
        $project->description = $request->project_description;
        $project->end_date = $request->project_end_date;
        $project->public = $request->project_private;
        $project->tasks = $request->project_tasks;
        $project->notes = $request->project_notes;
        $project->forum = $request->project_forum;
        $project->presences = $request->project_presences;
        $project->board = $request->project_board;
        $project->polls = $request->project_polls;
        $project->activities = $request->project_activities;
        $project->crisiscenter = $request->project_crisisCenter;
        $project->logs = $request->project_logs;
        $project->save();

        //tags
        $tags = $project->tags;
        Tag::where('project_id', $project->id)->delete();
        foreach ($request->project_tags as $tag) {
                Tag::create([
                    'name' => $tag,
                    'taggable_id' => $project->id,
                    'taggable_type' => 'App\Project',
                    'project_id' => $project->id,
                ]);
            }

        //add-ons
        if($request->project_board && Column::where([["project_id", '=', $project->id]])->count() == 0) {
            $firstColumn = Column::create([
                'name' => 'Todo',
                'project_id' => $project->id,
                'position' => 0,
            ]);
            Column::create([
                'name' => 'In Progress',
                'project_id' => $project->id,
                'position' => 1,
            ]);
            Column::create([
                'name' => 'Done',
                'project_id' => $project->id,
                'position' => 2,
            ]);
            BoardItem::create([
                'name' => "I'm a card",
                'description' => "Hello, i'm an example card for testing :)",
                'user_id' => 0,
                'column_id' => $firstColumn->id,
                'project_id' => $project->id,
                'color' => 'red',
            ]);
        }

        Activity::create([
            'project_id' => $project->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 34,
            'content' => '',
        ]);

        return response()->json([
            'reload' => true,
            'url' => $project->url,
        ]);
    }

    public function getProjects() {
        return Auth::user()->projects;
    }

    public function getUsers(Request $request) {
        $project = Project::where('url', '=', $request->project)->first();
        return $project->users;
    }

    public function data($company, $project) {
        $project_all = Project::where('url', '=', $project)->first();
        $name = $project_all->name;
        $end_date = $project_all->end_date;
        $members = $project_all->users;
        $desc = $project_all->description;
        $ended = 0;
        if($end_date <= Carbon::now() && $end_date != null || $project_all->status === 2) {
            $ended = true;
        }


        $users = $project_all->users;

        $role = 0;
        foreach ($users as $user) {
            if($user->id == Auth::user()->id) {
                $role = $user->pivot->role;
            }
        }

        return view('application.project.index', compact('company', 'project', 'name', 'ended', 'role'));

    }

    public function ended($company, $project) {
        $project_all = Project::where('url', '=', $project)->first();
        $name = $project_all->name;
        $end_date = $project_all->end_date;
        $members = $project_all->users;
        $desc = $project_all->description;
        $ended = 1;
        $role = 1;
        return view('application.project.end', compact('company', 'project', 'name', 'members', 'desc', 'ended', 'role'));
    }

    public function close(Request $request) {
        $project_all = Project::where('url', '=', $request->project)->first();
        $project_all->status = 2;
        $project_all->save();

        Activity::create([
            'project_id' => $project_all->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 35,
            'content' => '',
        ]);

    }

    public function reopen(Request $request) {
        $project_all = Project::where('url', '=', $request->project)->first();
        $project_all->end_date = null;
        $project_all->status = 0;
        $project_all->save();
        $name = $project_all->name;
        $company = $request->company;
        $project = $request->project;
        $ended = 0;
        $role = 0;

        Activity::create([
            'project_id' => $project_all->id,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id,
            'type' => 36,
            'content' => '',
        ]);

        return view('application.project.index', compact('company', 'project', 'name', 'ended', 'role'));
    }

    public function guest($company, $project) {
        $project_all = Project::where('url', '=', $project)->first();
        $name = $project_all->name;
        return view('application.project.index', compact('company', 'project', 'name'));
    }

    public function DoneFirstProject()  {
        $user = Auth::user();
        $user->firstProject = true;
        $user->save();
    }
}
