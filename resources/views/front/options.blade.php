@extends('front.layouts.app')
@section('title', '- Options')
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
        <h1 class="header-basic--title">Our Options</h1>
    </div>
    <div class="options">
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-calendar icon"></i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Calendar</h3>
                        <p>
                           Project-Together has a simple calendar that's only for your company. You and you're colleagues or employees can view events or add new events. An event can be labeled as public or as private. If it's private, you can only see the event.
                            With this calendar you can share all events with everyone in an organized way.
                        </p>
                        <p>If you want to know more about all functionalities of the calendar, you can vistit our <a>documentation page</a>.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white about">
            <div class="row">
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Company Organisation</h3>
                        <p>
                            With Project-Together you can get a clear overview of all your colleagues or employees. You can add all their information like address, phone number and so on. You can even give them a specific role and persmissions in your company. Finally, you can also create groups so that you can easily organize your colleagues or employees.
                        </p>
                    </div>
                </div>
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-building icon"></i>
                </div>
            </div>
        </section>
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-tasks icon"> </i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Tasks</h3>
                        <p>
                            When creating a project you can choose tasks. This add-on allows you to create tasks. You can assign a task to an employee or colleague. Tasks can also have an end date when the task must be completed. Finally, you can also set a task as active in which a timer starts to run. With tasks you can divide the work among your employees or colleagues.
                        </p>
                        <p>If you want to know more about all functionalities of the tasks, you can visit our <a href="/docs">documentation page</a>.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white about">
            <div class="row">
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Forum</h3>
                        <p>
                            When you create a project you can choose forum as add-on. A forum is a public medium or place used for debates in which anyone can participate. When you want to start a debate or discussion you can easily can make a thread were all of your project members can reply on and say there opinion. You have also the option to select tasks so that you can sort on them.
                        </p>
                        <p>If you want to know more about all functionalities of the forum, you can visit our <a href="/docs">documentation page</a>.</p>

                    </div>
                </div>
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-comments icon"> </i>
                </div>
            </div>
        </section>
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-sticky-note icon-big icon"></i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Notes</h3>
                        <p>
                            You have the option to have notes in your project. This add-on is the online notice-board so that you don't have to use your fridge. You can make a note for everyone in the project or just for yourself.
                        </p>
                        <p>If you want to know everything about notes, you can visit our <a href="/docs">documentation page</a>.</p>

                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white about">
            <div class="row">
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Polls</h3>
                        <p>
                            Your struggling with a chose to make? No problem! You can make a poll in your project so that you can ask them there opinion about your chose. You can set multiple voting or just one time.
                        </p>
                        <p>If you want to know everything about notes, you can visit our <a href="/docs">documentation page</a>.</p>
                    </div>
                </div>
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-poll icon"> </i>
                </div>
            </div>
        </section>
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-calendar-check icon"></i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Board</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper. Donec vel enim dolor. Nullam quis gravida orci. Ut fringilla varius erat non scelerisque. Ut sollicitudin nulla quis auctor accumsan. Morbi sagittis ligula erat, id vehicula magna pharetra eu. Donec finibus volutpat dolor. Donec eget enim finibus, aliquam urna eu, tempor justo. Nam quis pulvinar massa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white about">
            <div class="row">
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Crisis Center</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper. Donec vel enim dolor. Nullam quis gravida orci. Ut fringilla varius erat non scelerisque. Ut sollicitudin nulla quis auctor accumsan. Morbi sagittis ligula erat, id vehicula magna pharetra eu. Donec finibus volutpat dolor. Donec eget enim finibus, aliquam urna eu, tempor justo. Nam quis pulvinar massa.
                        </p>
                    </div>
                </div>
                <div class="four columns  center-text icon-box">
                    <i class="fab fa-centercode icon"> </i>
                </div>
            </div>
        </section>
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-sign-in-alt icon"> </i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>Logs</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper. Donec vel enim dolor. Nullam quis gravida orci. Ut fringilla varius erat non scelerisque. Ut sollicitudin nulla quis auctor accumsan. Morbi sagittis ligula erat, id vehicula magna pharetra eu. Donec finibus volutpat dolor. Donec eget enim finibus, aliquam urna eu, tempor justo. Nam quis pulvinar massa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection