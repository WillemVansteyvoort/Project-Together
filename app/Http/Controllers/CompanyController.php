<?php

namespace App\Http\Controllers;
use App\Http\Requests\UpdateCompany;
use App\Industry;
use Illuminate\Http\Request;
use Validator;
use Auth;
use App\Company;
class CompanyController extends Controller
{
    public function index() {
        return view('front.company') ;
    }

    public function settings() {

        $industries = Industry::pluck('name','id')->toArray();

        return view('front.settings', compact('industries')) ;
    }

    public function welcome() {
        return view('front.welcome');
    }

    public function update(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'industry' => 'required',
            'logo' => 'sometimes|image|mimes:jpeg,bmp,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect('company/settings')
                ->withErrors($validator)
                ->withInput();
        }

        $company = Company::where('id', Auth::user()->company->id)->firstOrFail();;

        if(!empty($request->logo)) {
            $file = $request->file('logo');
            $name = time() . hash_file('md5', $file) ;
            $file->move('logos', $name);
            $company->logo = $name;
        }

        if(empty($request->url)) {
            $request->url = Auth::user()->company->url;
        }
        $company->name = $request->name;
        $company->industry_id = $request->industry;
        $company->content = $request->desc;
        $company->url = $request->url;
        $company->save();

        $request->session()->flash("success", "The information is succesfully changed");
        return redirect('company/settings');

    }
}
