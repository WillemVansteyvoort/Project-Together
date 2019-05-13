@extends('front.layouts.app')
@section('title', '- Documentation')
@section('content')
    <section class="header header-small">
        <div class="header-menu">
            <ul class="header-menu-left">
                <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                <li><a href="{{route('front_about')}}">@lang('About us')</a></li>
                {{--<li><a href="">@lang('Products')</a></li>--}}
                <li><a href="{{route('front_options')}}">@lang('Our options')</a></li>
                <li><a href="{{route('front_blog')}}">Blog</a></li>
                <li><a href="{{route('front_support')}}">Support</a></li>
                @if( App::getLocale() == "nl")
                    <a  href="{{route('lang_set', "en")}}">
                        <img src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-waving-250.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                    </a>
                @else
                    <a  href="{{route('lang_set', "nl")}}">
                        <img src="https://cdn.countryflags.com/thumbs/netherlands/flag-waving-250.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                    </a>
                @endif
            </ul>
            <ul class="header-menu-right hidden-mobile">
                @if(Auth::check() && Auth::user()->owner)
                    <li class="button button-small button-second uppercase"><a href="{{route('front_company')}}">@lang('Manage', ["company" => Auth::user()->company->name]) </a></li>
                    <li class="button button-small button-primary"><a href="{{route('app_logout')}}">@lang('Logout')</a></li>
                @elseif(Auth::check())
                    <li class="button button-small button-second uppercase"><a href="{{route('app_dashboard', Auth::user()->company->url)}}">GO TO {{{Auth::user()->company->name}}}</a></li>
                    <li class="button button-small button-primary"><a href="{{route('app_logout')}}">Logout</a></li>
                @else
                    <li class="button button-small button-second"><a href="{{route('front_login')}}">Log in</a></li>
                    <li class="button button-small button-primary"><a href="{{route('front_signup')}}">Sign Up</a></li>
                @endif
            </ul>
        </div>
    </section>
    <div class="header-basic">
        <h1 class="header-basic--title">Documentation</h1>
    </div>
    <div class="doc dark">
        <div class="row">
            <div class="three columns">
                <div class="doc-sidebar">
                    <ul>
                        <li><a href="#getStarted">Get started</a></li>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#calendar">Calendar</a></li>
                        <li><a href="#project">Projects</a></li>
                        <li><a href="#company">Company</a></li>
                        <li><a href="#account">Account</a></li>
                        <li><a href="#project2">Project</a></li>
                        <li><a href="#add-ons">Add-ons</a></li>
                    </ul>
                </div>
            </div>
            <div class="nine columns">
                <div class="doc-content">
                    <h3 id="getStarted">Get started</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam nulla a feugiat. Proin malesuada gravida nulla, ut aliquet erat luctus et. Ut nec arcu eu leo sagittis sagittis eu a ipsum. Aliquam rutrum libero blandit, blandit leo et, tempus enim. Cras vehicula interdum elit vitae sagittis. Vestibulum quam ligula, pharetra at ipsum in, pretium tincidunt tellus. Aenean nec efficitur diam, ac scelerisque nulla. Suspendisse potenti. Donec commodo pretium risus non sollicitudin. Maecenas vulputate lorem tortor, et convallis justo posuere in. Aliquam erat volutpat. Duis tempus ex non porta ultrices. Fusce nec mattis eros.

                    </p>
                    <h3 id="dashboard">Dashboard</h3>
                    <h3 id="calendar">Calendar</h3>
                    <h3 id="project">Projects</h3>
                    <h3 id="company">Company</h3>
                    <h3 id="account">Account</h3>
                    <h3 id="project2">Project</h3>
                    <h3 id="add-ons">Add-ons</h3>
                    <ul>
                        <li><a>Tasks</a></li>
                        <li><a>Notes</a></li>
                        <li><a>Forum</a></li>
                        <li><a>Board</a></li>
                        <li><a>Polls</a></li>
                        <li><a>Activities</a></li>
                        <li><a>Crisis Center</a></li>
                        <li><a>Logs</a></li>
                    </ul>
                    <h5>Tasks</h5>
                    <h5>Notes</h5>
                    <h5>Forum</h5>
                    <h5>Board</h5>
                    <h5>Polls</h5>
                    <h5>Activities</h5>
                    <h5>Crisis Center</h5>
                    <h5>Logs</h5>


                </div>
            </div>
        </div>
    </div>

@endsection