@extends('front.layouts.app')
@section('title', '- about')
@section('content')

        {!!Form::open(['method' => 'post', 'action' => 'teske@homo', 'files' => true])  !!}

                {!! Form::submit('Update company',['class' => 'float-right']) !!}

        {!! Form::close() !!}
@endsection<script async="async" type="text/javascript" src="{{ asset('js/app.js') }}"></script>
