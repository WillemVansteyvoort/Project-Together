@extends('application.layouts.app')
@section('title', '- Account')
@section('content')
    <section class="header-banner">
        <div class="header-banner--text">
            <h2 class="float-left"> {{Auth::user()->company->name}}</h2>
            <form class="float-right">
                <a class="button button-primary float-right"><i class="fas fa-search"></i> </a>
                <input class="float-right" type="text" placeholder="Search for everything ...">
            </form>
        </div>
    </section>
    <main>
        <div class="account">
            <div id="tabs2-account"></div>
        </div>
    </main>
@endsection