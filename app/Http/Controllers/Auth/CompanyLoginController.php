<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Company;
use Illuminate\Support\Facades\Auth;
class CompanyLoginController extends Controller
{

    public function __construct() {
        $this->middleware('guest');

    }

    public function index($company) {
        if (Company::where('url', '=', $company)->count() > 0) {
            $companyAll = Company::where('url', '=', $company)->first();
            $companyId = $companyAll->id;
            $companyName = $companyAll->name;
            $companyUrl = $company;
            return view('front.loginCompany', compact('companyName', 'companyId', 'companyUrl'));
        } else {
            return abort(404, 'Unauthorized action.');
        }
    }

    public function store(Request $request) {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
            ]);

        $credentials = $request->only('email', 'password');
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'company_id' => $request->id], $request->remember)) {
            return redirect($request->url . "/dashboard");
        } else {
            $request->session()->flash("fault", "The data doesn't match, please try again.");
            return back()->withInput();
        }
    }

}
