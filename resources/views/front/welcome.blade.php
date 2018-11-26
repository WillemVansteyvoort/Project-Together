
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
                <li class="button button-small button-second uppercase"><a  href=" {{{Auth::user()->company->url}}}/dashboard">Go to {{{Auth::user()->company->name}}}</a></li>
            </ul>
        </div>
    </section>
    <section class="dark about">
        @if(!Auth::user()->verified && !session('verify_overdate'))
            <div class="alert alert-red">This account has not been verified. You only have 24 hours access to your company. <a class="float-right">Send a new verification e-mail</a></div>
        @endif
        <div class="welcome">
            <div class="row">
                <div class="seven columns">
                    <h2>Welcome to Project-Together</h2>
                    <p>
                        Hi, <b>{{{ Auth::user()->name  }}}</b>, we are very happen that your company   has chosen for us. Because you are the owner of <b>{{{ Auth::user()->company->name  }}}</b>, you have to now some things so that you can help your collegues and yourself.
                    </p>
                    <h4>Your company link</h4>
                    <p>You and your colleagues can access the company by the follow url:</p>
                    <span class="tag tag-primary">Https://</span>
                    <input type="text" value="project-together.com/{{{ Auth::user()->company->url  }}}">
                    <h4>Invite others</h4>
                    <p>
                        You can easily invite your colleagues to the company by sending them an email. You can do that <a href="">here</a>.
                    </p>
                    <h4>Change company settings</h4>
                    <p>
                       If you want to change the company plan, name or industry, you can go to <a>this page</a>.
                    </p>
                </div>
                <div class="five columns">
                    <iframe  width="90%" height="315" src="https://www.youtube.com/embed/VQ5-bcSP3Iw?autoplay=1" allow='autoplay'></iframe>
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
