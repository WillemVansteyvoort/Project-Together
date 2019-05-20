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
        <h1 class="header-basic--title">@lang("About") {{config('app.name')}}</h1>
    </div>

    <section class="dark about">
        <h3>@lang("About us")</h3>
        <div class="about-text">
            <p>
                {!! __("The development of Project-Together was started in 2018. The first version was published in the summer of 2019. Originally, Project-Together was a final task for an IT course in the secondary school called Busleyden Atheneum Campus Zandpoort that's located in Malines, Belgium.") !!}

            </p>
            <p>
                @lang("Project-Together is designed to help companies and groups organize their projects. We offer various options to easily collaborate in a well-organized manner. Our most important asset is to provide small companies with a free version with the same functionalities as the pro version. Project-Together is the first free project management tool.")
            </p>
        </div>
    </section>
    <section class="values">
        <h3>@lang("Our values")</h3>
        <div class="row">
            <div class="three columns">
                <div class="value">
                    <i class="far fa-smile-beam"></i>
                    <p>@lang("We want to make you happy with our products")</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-hands-helping"></i>
                    <p>@lang("We want our products to stay easy to use")</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-clock"></i>
                    <p>@lang("We want to stay busy and bring new features to our costumers")</p>
                </div>
            </div>
            <div class="three columns">
                <div class="value">
                    <i class="fas fa-lock"></i>
                    <p>@lang("We want our products te as safe as possible")</p>
                </div>
            </div>
        </div>
    </section>
    <section class="founder dark">
        <h3>@lang("Meet our team")</h3>
        <div class="row">
            <div class="four columns">
                <img src="images/DSCN3583.JPG" class="founder-image" />
            </div>
            <div class="eight columns">
                <div class="founder-body">
                    <h5>Willem Vansteyvoort</h5>
                    <p>Hello, my name is Willem Vansteyvoort.</p>
                    <p>
                        @lang("I was born on January 1 in 2001 so I'm 18 years old.  I live in the province of Antwerp in Belgium. In September I will study Applied Informatics at Howest in Bruges. I'm the Project-Together developer, which was my final task in secondary school. If you want to contact me, you can e-mail me.")
                    </p>
                    <i class="fas fa-envelope"></i> <a href="mailto:willem@project-together.com">willem@project-together.com</a>
                </div>
            </div>
        </div>
    </section>
@endsection