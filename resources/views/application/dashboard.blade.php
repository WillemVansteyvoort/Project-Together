@extends('application.layouts.app')
@section('title', '- blog')
@section('content')
    <section class="header-primary">
        <div class="navigation-mobile">
            <label for="show-menu" class="show-menu center"><i class="fas fa-bars"></i></label>
            <input type="checkbox" id="show-menu" role="button">
            <div id="nav-mobile--menu">
                <label for="show-menu" class="show-menu left"><i class="fas fa-times"></i></label>
                <ul>
                    <h5>{{{ Auth::user()->company->name }}}</h5>
                    <li><a class="" href="">Dashboard</a></li>
                    <li><a href="about.html">Projects</a></li>
                    <li><a href="">Calender</a></li>
                    <li><a href="">Company</a></li>
                    <li ><a  href="" class="button button-second"><i class="fas fa-plus"> </i> New project</a></li>
                </ul>
            </div>
        </div>
        <div class="header-primary-menuLeft">
            <div class="mode">
                <div id="mode" class="mode-content tab-content">
                    <a href=""><i class="fas fa-comments"> </i></a>
                </div>
            </div>
            <ul>
                <li><a class="header-name"  onclick="showNotifications('mode')"><i class="fas fa-home dropbtn icon"> </i> <i class="fas fa-sort-down down"></i></a></li>
                <li><a class="" href="/dashboard">Dashboard</a></li>
                <li><a href="about.html">Projects</a></li>
                <li><a href="">Calender</a></li>
                <li><a href="company">Company</a></li>
                <li ><a  href="" class="button button-second"><i class="fas fa-plus"> </i> New project</a></li>
            </ul>

        </div>
        <div class="header-primary-menuRight">
            <div class="people">
                <ul>
                    <li><i onclick="showNotifications('people')" class="fas fa-bars dropbtn"> </i>
                </ul>
                <div id="people" class="people-content tab-content">
                    <h6 class="people-title">Online collegues</h6>
                    <div id="menu-online"></div>
                </div>
            </div>
            <div class="notifications">
                <ul>
                    <li><i onclick="showNotifications('notifications')" class="fas fa-bell dropbtn"> </i>
                </ul>
                <span class="notifications-active"> </span>
                <div id="notifications" class="notifications-content tab-content">
                    <div id="menu-notifications"></div>
                </div>
            </div>
            <div class="help">
                <ul>
                    <li><i onclick="showNotifications('help')" class="fas fa-question dropbtn"> </i>
                </ul>
                <div id="help" class="help-content tab-content" >
                    <h6 class="help-title">Get Help</h6>
                    <article class="help-alert">
                        <div class="help-alert--text">
                            <b><a href="" class="help-alert--title float-left">See our documentation<a></b>
                            <p>Someone has login to your account from <i>Safari webbrowser.</i></p>
                        </div>
                    </article>
                    <div class="clear"></div>
                    <article class="help-alert">
                        <div class="help-alert--text">
                            <b><a href="" class="help-alert--title">Check the FAQ</a></b>
                            <p>Thanks for joining us! If you have questions about the working, read our  <span class="notifications-alert--see" ><a href="">documentation.</a></span></p>
                        </div>
                    </article>
                    <article class="help-alert">
                        <div class="help-alert--text">
                            <b><a href="" class="help-alert--title">Ask a question</a></b>
                            <p>Thanks for joining us! If you have questions about the working, read our  <span class="notifications-alert--see" ><a href="">documentation.</a></span></p>
                        </div>
                    </article>
                </div>
            </div>
            <div class="profile">
                <ul>
                    <li><a class="dropbtn" onclick="showNotifications('profile')">@php echo substr(Auth::user()->name, 0, strpos(Auth::user()->name, ' ')) @endphp <img src="{{ asset('images/')}}/{{{ Auth::user()->avatar  }}}" /></a></li>
                </ul>
                <div id="profile" class="profile-content tab-content" >
                    <div class="profile-user">
                        <img class="profile-user--avatar" src="{{ asset('images/')}}/{{{ Auth::user()->avatar  }}}" />
                        <h4 class="profile-user--name">{{{ Auth::user()->name  }}}</h4>
                    </div>
                    <div class="clear line-small"></div>
                    <div class="profile-links">
                        <ul>
                            <li><a href="about.html"> Change my acccount</a></li>
                            <li><a href=""> Settings</a></li>
                            <li><a href=""> View sessions</a></li>
                            <li><a href=""> Two Step Authentication</a></li>
                            <li><a href=""> Statistics</a></li>
                        </ul>
                        <ul>
                            <div class="clear line-small"> </div>
                            <li> <i class="float-left fas fa-sign-out-alt"> </i> <a href="{{route('app_logout')}}">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="header-banner">
        <div class="header-banner--text">
            <h2 class="float-left"> {{{ Auth::user()->company->name }}}</h2>
            <form class="float-right">
                <a class="button button-primary float-right"><i class="fas fa-search"></i> </a>
                <input class="float-right" type="text" placeholder="Search for everything ...">
            </form>
        </div>
    </section>
    <main>
        {{--@php--}}
             {{--echo gethostname();--}}
        {{--@endphp--}}
        <div class="row">
            <div class="no-margin three columns">
                <section class="sidebar">
                    <div class="clear line-small"></div>
                    <div class="sidebar-projects">
                        <h5>Recent Projects</h5>
                        <div id="update-activity"></div>
                        @if(Auth::user()->projects->count() > 0)
                        @foreach(Auth::user()->projects  as $project)
                            <div class="sidebar-project">
                                <span class="sidebar-project--title">{{$project->name}}</span>
                                <a href=""><i class="fas fa-arrow-right"> </i></a>
                                <div class="clear"></div>
                            </div>
                        @endforeach
                        @else
                            <div class="sidebar-project">
                            <span class="sidebar-project--title">There are no projects in the moment</span>
                            <div class="clear"></div>
                    </div>
                        @endif
                    </div>
                    <div class="sidebar-events">
                        <h5>Upcoming events</h5>
                        <article class="sidebar-event">
                            <div class="sidebar-event--date sidebar-event-black">
                                <span class="sidebar-event--date-day">24</span>
                                <span class="sidebar-event--date-month">FEB</span>
                            </div>
                            <div class="sidebar-event--content">
                                <h6 class="sidebar-event--content-title">Afspraak met Jan De Boer </h6>
                                <span class="sidebar-event--content-hours">12u00 - 14u00</span>
                            </div>
                        </article>
                        <article class="sidebar-event">
                            <div class="sidebar-event--date sidebar-event-red">
                                <span class="sidebar-event--date-day">24</span>
                                <span class="sidebar-event--date-month">FEB</span>
                            </div>
                            <div class="sidebar-event--content">
                                <h6 class="sidebar-event--content-title">Afspraak met Jan De Boer </h6>
                                <span class="sidebar-event--content-hours">12u00 - 14u00</span>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
            <div class="nine columns">
                <div class="dashboard">
                    <h4>Dashboard</h4>
                    <div id="tabs-dashboard">df</div>
                </div>
            </div>
        </div>
    </main>
@endsection