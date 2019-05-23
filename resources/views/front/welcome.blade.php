
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
        @if(!Auth::user()->verified && !session('verify_overdate'))
            <div class="alert alert-red">This account has not been verified. You only have 2 days access to your company. <a class="float-right">Send a new verification e-mail</a></div>
        @endif
        <div class="welcome">
            <div class="row">
                <div class="twelve columns">
                    <h2>Welcome to Project-Together</h2>
                    <p>
                        Hi, <b>{{{ Auth::user()->name  }}} {{Auth::user()->lastname}}</b> <br />We are very happen that your company   has chosen for us. Because you are the owner of <b>{{{ Auth::user()->company->name  }}}</b>, you have to know some things so that you can help your members and yourself.
                    </p>
                    <h4>Your company link</h4>
                    <p>You and your members can access the company by the follow url:</p>
                    <span class="tag tag-primary">https://</span>
                    <input type="text" value="project-together.com/{{{ Auth::user()->company->url  }}}/login">
                    <h4>Invite others</h4>
                    <p>
                        You can easily invite your colleagues to the company by sending them an email. You can do that <a href="{{route('app_company', Auth::user()->company->url)}}">here</a>.
                    </p>
                    <h4>Change company settings</h4>
                    <p>
                       If you want to change the company plan, name industry or even the company url, ou can go to <a href="{{route('front_settings')}}">this page</a>.
                    </p>
                    <button class="button button-small button-second uppercase no-button"><a href="/{{{Auth::user()->company->url}}}/dashboard">Go to {{{Auth::user()->company->name}}}</a></button>
                </div>
            </div>
        </div>
        <div class="welcome-support">
            <div class="row">
                <div class="three columns">
                    <div class="support-item">
                        <h6>
                            <i class="fas fa-envelope"></i>
                        </h6>
                        <h6><a href="">support@project-together.com</a></h6>
                    </div>
                </div>
                <div class="three columns">
                    <div class="support-item">
                        <h6>
                            <i class="fas fa-question-circle"></i>
                        </h6>
                        <h6><a href="">See our FAQ section</a></h6>
                    </div>
                </div>
                <div class="three columns">
                    <div class="support-item">
                        <h6>
                            <i class="fas fa-book"></i>
                        </h6>
                        <h6><a href="">See our documentation</a></h6>
                    </div>
                </div>
                <div class="three columns">
                    <div class="support-item">
                        <h6>
                            <i class="fas fa-th-large"></i>

                        </h6>
                        <h6><a href="blog.html">Check our blog</a></h6>
                    </div>
                </div>
            </div>
        </div>

    </section>

@endsection
