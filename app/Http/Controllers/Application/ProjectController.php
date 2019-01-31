<?php

namespace App\Http\Controllers\Application;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Project;
use App\User;
use App\Tag;
use App\Group;
use App\Events\Notifications;
use App\Notification;
use App\Company;
use Illuminate\Support\Facades\Auth;
class ProjectController extends Controller
{
    public function index() {

        return view('application.projects');

    }

    public function create(Request $request) {
        $url = strtolower(str_replace(' ', '', $request->title));
        //create project
        $project =Project::create([
            'company_id' => Auth::user()->company_id,
            'name' => $request->title,
            'url' => $url,
            'description' => $request->description,
            'end_date' => $request->end_date,
            'user_id' => Auth::user()->id,
            'public' => $request->private,
            'tasks' => $request->tasks,
            'notes' => $request->notes,
            'forum' => $request->forum,
            'presences' => $request->presences,
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
            } else {
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
    }

    public function getProjects() {
        $company = Company::findOrFail(Auth::user()->company_id);
        return $company->projects;
    }

    public function data($company, $project) {
        $project_all = Project::where('url', '=', $project)->first();
        $name = $project_all->name;
        return view('application.project.index', compact('company', 'project', 'name'));
    }
}
