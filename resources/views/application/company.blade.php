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
        <div class="row">
            <div class="eight columns">
                <div class="company">
                    <h4>{{{ Auth::user()->company->name }}}</h4>
                    <div id="company-users"></div>
                </div>
            </div>
            <div class="four columns">
                <div class="company-sidebar">
                    <div id="company-stats"></div>
                </div>
            </div>
        </div>
    </main>
@endsection