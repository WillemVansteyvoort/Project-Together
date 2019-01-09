@extends('application.project.layouts.app')
@section('title', '')
@section('content')

        <div class="project">
            <div class="project-header">
                <div class="project-header-title">
                    <h2>Overview</h2>
                    <h5>Pekesweekend 2018 - Chiro Jongens Kalfort</h5>
                </div>
                <div class="project-header-nav">
                    <div class="project-header-nav--item active">
                        <button class="no-button">Overview</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Tasks</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Activities</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Notes</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Forum</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Presences</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Polls</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Logs</button>
                    </div>
                    <div class="project-header-nav--item">
                        <button class="no-button">Crisis center</button>
                    </div>
                </div>
                <button class="project-header-plus no-button">
                    <i class="fas fa-plus"> </i>
                </button>
            </div>
            <main class="project-main">
                <div class="dashboard-project">
                    <div class="row">
                        <div class="four columns">
                            <h5>Current tasks</h5>
                            <div class="dashboard-project-tasks">
                                <h6 class="float-left">Task List  </h6>
                                <button class="button button-primary no-button float-right">New task</button>
                                <div class="clear"> </div>
                                <div class="dashboard-project-tasks-item">
                                    <div class="dashboard-project-tasks-title float-left">
                                        Rondgaan voor sponsering
                                    </div>
                                    <div class="float-right">
                                        <i class="fas fa-pen"> </i>
                                        <i class="fas fa-check"> </i>
                                    </div>
                                    <div class="clear"> </div>
                                    <span class="dashboard-project-tasks-priority">High priority</span>
                                    <div class="clear"> </div>
                                    <div class="dashboard-project-tasks-user float-left">
                                        <img src="http://127.0.0.1:8000/images/founder.jpg" />
                                    </div>
                                    <div class="dashboard-project-tasks-date float-right">
                                        <span class="float-right">2 days to go</span><i class="fas fa-clock float-right"> </i>
                                    </div>
                                </div>
                                <div class="dashboard-project-tasks-item">
                                    <div class="dashboard-project-tasks-title float-left">
                                        Rondgaan voor sponsering
                                    </div>
                                    <div class="float-right">
                                        <i class="fas fa-pen"> </i>
                                        <i class="fas fa-check"> </i>
                                    </div>
                                    <div class="clear"> </div>
                                    <span class="dashboard-project-tasks-priority">Low priority</span>
                                    <div class="clear"> </div>
                                    <div class="dashboard-project-tasks-user float-left">
                                        <img src="http://127.0.0.1:8000/images/founder.jpg" />
                                    </div>
                                    <div class="dashboard-project-tasks-date float-right">
                                        <span class="float-right">2 days to go</span><i class="fas fa-clock float-right"> </i>
                                    </div>
                                </div>
                            </div>
                            <h5>Project members</h5>
                            <div class="dashboard-project-members">
                                <div class="dashboard-project-members-item">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" class="float-left" />
                                    <h4 class="float-left">Willem Vansteyvoort  </h4>
                                    <span class="tag tag-primary float-right">Creator</span>
                                </div>
                                <div class="clear"> </div>
                                <div class="dashboard-project-members-item">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" class="float-left" />
                                    <h4 class="float-left">Willem Vansteyvoort  </h4>
                                </div>
                                <div class="clear"> </div><div class="dashboard-project-members-item">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" class="float-left" />
                                    <h4 class="float-left">Willem Vansteyvoort  </h4>
                                </div>
                                <div class="clear"> </div>
                                <div class="dashboard-project-members-item">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" class="float-left" />
                                    <h4 class="float-left">Willem Vansteyvoort  </h4>
                                </div>
                                <div class="clear"> </div>
                            </div>
                            {{--<div class="dashboard-project-calendar">--}}
                                {{--<div class="dashboard-project-calendar-head">--}}
                                    {{--<i class="fas fa-angle-left left"> </i>--}}
                                    {{--<i class="fas fa-angle-right right"> </i>--}}
                                    {{--<h4 class="dashboard-project-calendar-title"><i class="fas fa-calendar-alt"></i> January 2019</h4>--}}
                                    {{--<div class="dashboard-project-calendar-day ">MON</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">TUE</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">WED</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">THUR</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">FRI</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">SAT</div>--}}
                                    {{--<div class="dashboard-project-calendar-day">SUN</div>--}}

                                    {{--<div class="clear"> </div>--}}
                                {{--</div>--}}
                            {{--</div>--}}
                        </div>
                        <div class="eight columns">
                            <h5>Information</h5>
                            <div class="dashboard-project-info">
                                <h6>Dates</h6>
                                <div class="dashboard-project-info-date start float-left">
                                    <h6>Starts</h6>
                                    <span>7 JAN</span>
                                    <h6>2019</h6>
                                </div>
                                <div class="dashboard-project-info-date end float-right">
                                    <h6>Ends</h6>
                                    <span>24 FEB</span>
                                    <h6>2019</h6>
                                </div>
                                <div class="float-left alert alert-black">Ends in 2 days</div>
                                <div class="clear"> </div>
                                <h6>Description</h6>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra.
                                </p>
                                <h6>Responsables</h6>
                                <div class="dashboard-project-info-responsable">
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" />
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" />
                                    <img src="http://127.0.0.1:8000/images/founder.jpg" />
                                </div>
                                <h6>Tags</h6>
                                <span class="tag tag-primary">Feest</span>
                                <span class="tag tag-primary">Chiro</span>
                                <span class="tag tag-primary">Drank</span>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
@endsection