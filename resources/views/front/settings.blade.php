@extends('front.layouts.app')
@section('title', '- about')
@section('content')
    <section class="header header-small">
        <div class="header-menu">
            <ul class="header-menu-left">
                <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                <li><a href="{{route('front_company')}}">Your company</a></li>
                <li><a href="{{route('front_settings')}}">Settings</a></li>
                <li><a href="{{route('app_account', Auth::user()->company->url)}}">Account</a></li>
                <li><a href="{{route('app_logout')}}">Logout</a></li>
            </ul>
            <ul class="header-menu-right hidden-mobile">
                <li class="button button-small button-second uppercase"><a  href="/{{{Auth::user()->company->url}}}/dashboard">Go to {{{Auth::user()->company->name}}}</a></li>
            </ul>
        </div>
    </section>
    <section class="dark about">
        @if(session('success'))
            <div class="alert-green alert">{{session('success')}}</div>
        @endif
        @if(!Auth::user()->verified && !session('verify_overdate'))
                <div class="alert alert-red">This account has not been verified. You only have 2 days access to your company. <a class="float-right">Send a new verification e-mail</a></div>
        @endif
        {!!Form::open(['method' => 'post', 'action' => 'CompanyController@update', 'files' => true])  !!}
        <div lang="row">
            <div class="six columns">
                {!! Form::label('name', 'Company name'); !!}
                @if ($errors->has('name'))
                    <div id="red">{{$errors->first('name')}}</div>
                @endif
                {!! Form::text('name', Auth::user()->company->name,['class' => 'u-full-width']); !!}
            </div>
            <div class="six columns">
                {!! Form::label('Industry', 'Industry'); !!}
                {!! Form::select('industry',$industries, Auth::user()->company->industry->id, ['class' => 'u-full-width']) !!}
            </div>
        </div>
        <div lang="row">
            <div class="six columns">

                {!! Form::label('desc', 'Company description'); !!}
                {!! Form::textarea('desc',Auth::user()->company->content,['class'=>'u-full-width', 'rows' => 2, 'cols' => 40]) !!}
            </div>
            <div class="six columns">
                {!! Form::label('url', 'Company url'); !!}
                {!! Form::text('url', Auth::user()->company->url,['class' => 'u-full-width', 'disabled' => true]); !!}
            </div>
        </div>
        <div class="row">
            <div class="twelve columns">
                {!! Form::label('logo', 'Company Logo'); !!}
                @if ($errors->has('logo'))
                    <div id="red">{{$errors->first('logo')}}</div>
                @endif
                <div class="float-right">
                    {!! Form::file('logo',['class' => 'u-full-width']) !!}
                    {!! Form::submit('Update company',['class' => 'float-right']) !!}
                    {!! Form::close() !!}
                </div>
                <div class="float-left">
                    @if(!empty(Auth::user()->company->logo))
                        <img src="/logos/{{{Auth::user()->company->logo}}}" width="230px" height="80px">
                        {!!Form::open(['method' => 'post', 'action' => 'companyController@deleteLogo'])  !!}
                        {!! Form::hidden('id', Auth::user()->company->id,['class' => 'u-full-width']); !!}
                        {!! Form::submit('Remove logo', ['class' => 'delete-logo']) !!}
                        {!! Form::close() !!}
                    @else
                        <p>No logo found</p>
                    @endif
                </div>
            </div>
        </div>
        <div class="row">
            <div class="twelve columns">
            </div>
        </div>
    </section>

@endsection