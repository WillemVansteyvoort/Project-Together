@extends('application.layouts.app')
@section('title', '- blog')
@section('content')
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
                    @if(!Auth::user()->verified && Auth::user()->owner)
                        <div class="alert alert-red">This account has not been verified. You only have 2 days access to your company. <br/> <a>Send a new verification e-mail</a></div>
                    @endif
                    <div class="sidebar-projects">
                        <h5>Recent Projects</h5>
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