@extends('application.project.layouts.app', [['company' => $company], ['project' => $project],['ended' => $ended], ['name' => $name], ['role' => $role]])

@section('title', '')
@section('content')

    <div id="project-index"></div>

@endsection