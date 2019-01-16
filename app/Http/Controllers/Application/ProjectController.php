<?php

namespace App\Http\Controllers\Application;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Project;
use App\User;
use App\Group;
use App\Company;
use Illuminate\Support\Facades\Auth;
class ProjectController extends Controller
{
    public function index() {

        return view('application.projects');

    }

    public function create(Request $request) {

        //create project
        $project =Project::create([
            'company_id' => Auth::user()->company_id,
            'name' => $request->title,
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

        //connect other member to project
            foreach ($request->selectedMembers as $item) {
                $roll = 0;
                //see what the role is
                switch ($item['roll']) {
                    case "Member":
                        $roll = 0;
                        break;
                    case "Watcher":
                        $roll = 1;
                        break;
                    case "Responsable" :
                        $roll = 2;
                        break;
                    case "Leader":
                        $roll = 3;
                        break;

                }

                if($item['type'] === "user") {
                    $user = User::findOrFail($item['unique']);
                    if(!$user->projects->contains($project->id)) {
                        $user->projects()->attach($project, ['role' => $roll]);
                    }
                } else {
                    $group = Group::findOrFail($item['unique']);
                    foreach ($group->users as $item2) {
                        if(!$item2->projects->contains($project->id)) {
                            $item2->projects()->attach($project, ['role' => $roll]);
                        }
                    }
                }
        }


    }

    public function getProjects() {
        $company = Company::findOrFail(Auth::user()->company_id);
        return $company->projects;
    }

    public function allUsers() {

    }
}
