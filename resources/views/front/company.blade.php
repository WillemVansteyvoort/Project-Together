@extends('front.layouts.app')
@section('title', '- about')
@section('content')
    <section class="header header-small">
        <div class="header-menu">
            <ul class="header-menu-left">
                <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                <li><a href="{{route('front_company')}}">@lang('Your company')</a></li>
                <li><a href="{{route('front_settings')}}">@lang('Settings')</a></li>
                <li><a href="{{route('app_account', Auth::user()->company->url)}}">Account</a></li>
                <li><a href="{{route('app_logout')}}">@lang('Logout')</a></li>
            </ul>
            <ul class="header-menu-right hidden-mobile">
                <li class="button button-small button-second uppercase"><a  href=" {{{Auth::user()->company->url}}}/dashboard">@lang('Go to') {{{Auth::user()->company->name}}}</a></li>
            </ul>
        </div>
    </section>
    <section class="dark about company-layout">
        <div class="show-mobile">
            <li class="button button-small button-second uppercase"><a  href=" {{{Auth::user()->company->url}}}/dashboard">@lang('Go to') {{{Auth::user()->company->name}}}</a></li>
        </div>

        @if(session('verify_overdate'))
            <div class="alert alert-red">This verification url has been expired. <a class="float-right">Send a new verification e-mail</a></div>
        @endif

        @if(session('verify_success'))
                <div class="alert alert-green">Your account has succesfully verified.</div>
            @endif

            @if(!Auth::user()->verified && !session('verify_overdate'))
                <div class="alert alert-red">This account has not been verified. You only have 2 days access to your company. <a class="float-right"  href="{{route('app_verify')}}">Send a new verification e-mail</a>                <div class="clear"></div>
                </div>
            @endif
        <div class="row">
            <div class="five columns">
                <h1 style="margin-top: 60px">{{{Auth::user()->company->name}}}</h1>

            </div>
            <div class="seven columns">
                <table class="u-full-width">
                    <tr>
                        <th>@lang('Company plan')</th>
                        <td>{{{Auth::user()->company->plan->name}}}</td>
                    </tr>
                    <tr>
                        <th>@lang('Total users')</th>
                        <td>{{{Auth::user()->company->users->count()}}}/{{{Auth::user()->company->plan->users}}}</td>
                    </tr>
                    <tr>
                        <th>@lang('Total projects')</th>
                        <td>{{{Auth::user()->company->projects->count()}}}/{{{Auth::user()->company->plan->projects}}}</td>
                    </tr>
                    <tr>
                        <th>@lang('Created')</th>
                        <td>{{{Auth::user()->company->created_at->diffForHumans()}}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </section>

@endsection