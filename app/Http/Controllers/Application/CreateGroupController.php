<?php


namespace App\Http\Controllers\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Group;
use App\User;
class CreateGroupController extends Controller
{
    public function create(Request $request) {
        $group = Group::create([
            'name' => $request->name,
            'company_id' => Auth::user()->company_id,
            'description' => $request->description,
            'user_id' => $request->leader,
        ]);
        $user = User::where([
            ['id', '=',$request->leader],
        ])->first();
        $user->groups()->attach($group->id);
    }
}
