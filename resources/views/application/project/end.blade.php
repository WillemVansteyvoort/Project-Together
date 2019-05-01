@extends('application.project.layouts.app', [['company' => $company], ['project' => $project]])

@section('title', '')
@section('content')

    <div class="project-header">
        <div class="project-header-title">
            <h2>Finished</h2>
            <h5>{{$project}}</h5>
        </div>
        <div class="project-header-nav">
        </div>
    </div>

        <div class="project-end">
            <h5>Project is finished</h5>
            <div class="row">
                <div class="twelve columns">
                    <div class="project-end-box">
                        <h6>Description</h6>
                        <p>{{$desc}}</p>
                        <h6>Members</h6>
                        @foreach($members as $user)
                            <img src={{$user->avatar}}>
                        @endforeach
                        <h6>Actions</h6>
                        {!! Form::open(['action' => ['Application\ProjectController@reopen', $company, $project], 'class' => 'login-right--formlogin']) !!}
                        {{ Form::hidden('project', $project) }}
                        {{ Form::hidden('company', $company) }}
                        {!!  Form::submit('Reopen project', ['class' => 'button button-primary no-button']); !!}
                        <a class="no-button button button-second" href={{route('app_project', [$company, $project])}}>View as guest</a>
                        {!! Form::close() !!}


                    </div>
                </div>
            </div>
        </div>

@endsection