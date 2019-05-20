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
                        <img src="images/flag-en.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
                    </a>
                @else
                    <a  href="{{route('lang_set', "nl")}}">
                        <img src="images/flag-nl.png" width="35px" class="float-right" style="margin-top: 5px; margin-right: 8px"/>
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
        <h1 class="header-basic--title">@lang("Our options")</h1>
    </div>
    <div class="options">
        <section class="dark about">
            <div class="row">
                <div class="four columns  center-text icon-box">
                    <i class="fas fa-calendar icon"></i>
                </div>
                <div class="eight columns">
                    <div class="about-text">
                        <h3>@lang("Calendar")</h3>
                        <p>
                          @lang("Project-Together has a simple calendar that's only for your company. You and your colleagues or employees can view or add events. An event can be labeled public or as private. If it's private, only you can see the event. With this calendar you can share all events with everyone in an organized way.")
                        </p>
                        <p>If you want to know more about the functionalities of the calendar, you can vistit our <a>documentation page</a>.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white about">
            <div class="row">
                <div class="eight columns">
                    <div class="about-text">
                        <h3>@lang("Company Organization")</h3>
                        <p>
    @lang("With Project-Together you can get a clear overview of all your colleagues or employees. You can add all their information for example: their address or phone number. You can assign them a specific role and permissions in your company. Finally, you can also create groups to easily organize your colleagues or employees.")
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
<h3>@lang("Tasks")</h3>
<p>
    @lang("This add-on allows you to create tasks in a project. You can assign a task to an employee or colleague. Tasks can also have an end date when the task must be completed. Finally, you can also set a task on active which means a timer starts to run. With tasks you can divide the work among your employees or colleagues.")
</p>
<p>If you want to know more about the functionalities of tasks, you can visit our <a href="/docs#tasks">documentation page</a>.</p>
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
    @lang("When you create a project you can choose forum as add-on. A forum is a public medium or place used for debates in which anyone can participate. When you want to start a debate or discussion you can easily make a thread where all of your project members can reply and say theire opinion. You also have the option to select tags to sort on.")

</p>
<p>If you want to know more about the functionalities of the forum, you can visit our <a href="/docs#forum">documentation page</a>.</p>

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
    @lang("You have the option to have notes in your project. This add-on is an online notice-board so that you don't have to use your fridge. You can make a note for everyone in the project or just for yourself.")
</p>
<p>If you want to know everything about notes, you can visit our <a href="/docs#notes">documentation page</a>.</p>

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
    @lang("Are you struggling with a choice to make? No problem! You can make a poll in your project to ask an opinion. You can let members vote multiple times or just once.")
</p>
<p>If you want to know everything about notes, you can visit our <a href="/docs#polls">documentation page</a>.</p>
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
    @lang("On the board you can place items in columns. You have three standard columns: to do, in progress and done. You can assign an item to a specific member or to everyone working on the project. Pro members can modify these columns and can create an extra column.")
 </p>
 <p>If you want to know everything about the board, you can visit our <a href="/docs#board">documentation page</a>.</p>
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
    @lang("When you add the add-on Crisis Center to your project, you have a place where you can collect all important errors or bugs that have to be solved immediately. When creating a new item you have to choose a priority. There are three types of priorities: low, medium and high.")
</p>
<p>If you want to know everything about the Crisis Center, you can visit our <a href="/docs#crisisCenter">documentation page</a>.</p>
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
    @lang("The Add-on Logs ensures that project users can keep a log of the things they have done. When enabling this add-on, all project partners will have a personal page where you can find their logs.")
</p>
<p>If you want to know everything about logs, you can visit our <a href="/docs#logs">documentation page</a>.</p>
</div>
</div>
</div>
</section>
</div>
@endsection