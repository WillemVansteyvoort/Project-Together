@extends('front.layouts.app')
@section('title', '- about')
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
        <h1 class="header-basic--title">About {{config('app.name')}}</h1>
    </div>

    <section class="dark about">
        <h3>About us</h3>
        <div class="about-text">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper. Donec vel enim dolor. Nullam quis gravida orci. Ut fringilla varius erat non scelerisque. Ut sollicitudin nulla quis auctor accumsan. Morbi sagittis ligula erat, id vehicula magna pharetra eu. Donec finibus volutpat dolor. Donec eget enim finibus, aliquam urna eu, tempor justo. Nam quis pulvinar massa.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper
            </p>
        </div>
    </section>
    <section class="values">
        <h3>Our values</h3>
        <div class="row">
            <div class="three columns">
                <div class="value">
                    <i class="far fa-smile-beam"></i>
                    <p>We want to make you happy with our products</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-hands-helping"></i>
                    <p>We want our products easy to use so that we can be friends</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-clock"></i>
                    <p>We want to be buzzy and bring new features to our costumers</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-lock"></i>
                    <p>We want our products so safe as possible so that you don't have to worry</p>
                </div>
            </div>
        </div>
    </section>
    <section class="founder dark">
        <h3>The founder who made it happen</h3>
        <div class="row">
            <div class="four columns">
                <img src="images/founder.jpg" class="founder-image" />
            </div>
            <div class="eight columns">
                <div class="founder-body">
                    <h5>Willem Vansteyvoort</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu porta velit. Maecenas consequat auctor nunc, eu iaculis odio posuere in. Nullam non neque eget neque euismod molestie. Integer gravida dui eu arcu ullamcorper, eu maximus enim dapibus. Nulla molestie pharetra euismod. Donec finibus pellentesque urna quis viverra. Morbi ultricies cursus lectus ac volutpat. Praesent fermentum dapibus semper. Donec vel enim dolor. Nullam quis gravida orci. Ut fringilla varius erat non scelerisque. Ut sollicitudin nulla quis auctor accumsan. Morbi sagittis ligula erat, id vehicula magna pharetra eu.
                    </p>
                    <i class="fas fa-link"></i> <a href="http://www.willemcreations.be">ikbeneenwebsite.be</a>
                </div>
            </div>
        </div>
    </section>
@endsection