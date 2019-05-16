@extends('front.layouts.app')
@section('title', '- support')
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
        <h1 class="header-basic--title">Worktogether support</h1>
    </div>

    <section class="dark support-items">
        <h3>We help you with a big smile</h3>
        <p>It's very important for us that our costumers are happy. We have a lot resources for them when they have a problem that they can ask them to us and that we can help them with a very big smile. Before you ask a question in the form, please see in our blog and Q&A if that question is already answered. Not found? Don't hezitate and contact us.</p>
        <div class="row">
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-envelope"></i>
                    <h6><a href="mailto:support@worktogether.com">support@worktogether.com</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-question-circle"></i>
                    <h6><a href="">Q&A section</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-book"></i>
                    <h6><a href="{{route('front_docs')}}">Documentation</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-th-large"></i>
                    <h6><a href="{{route('front_blog')}}">Our blog</a></h6>
                </div>
            </div>
        </div>
    </section>
    <section class="form">
        <h3 id="white">Not found your answer?</h3>
        <div class="row">
            <div class="six columns">
                <div class="form-title">
                    Ask them here!
                </div>
                <i><i class="fas fa-clock"></i>We answer in less then 2 hours</i>
            </div>
            <div class="six columns">
                <div class="form-form">
                    @if(session('success'))
                        <div class="alert alert-green center-text">Your form has been sent successfully. We will reply as soon as possible.</div>
                    @endif
                    <form method="post" action="{{route('front_sendForm')}}">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="six columns">
                                <label for="email">Your email</label>
                                <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="email" required name="email">
                            </div>
                            <div class="six columns">
                                <label for="reason">Reason for contacting</label>
                                <select class="u-full-width" id="reason" name="reason" required>
                                    <option></option>
                                    <option value="Option 1">I have question about billing </option>
                                    <option value="Option 2">I have a question about a feature</option>
                                    <option value="Option 2">I have a idea for a new feature</option>
                                    <option value="Option 2">I found a bug</option>
                                    <option value="Option 2">Other</option>


                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="six columns">
                                <label for="phone">Your phone</label>
                                <input class="u-full-width" type="tel" placeholder="04/74.45.51.52" id="phone" name="phone">
                            </div>
                            <div class="six columns">
                                <label for="company">Your company</label>
                                <input class="u-full-width" type="email" placeholder="WorkTogether" id="company" name="company">
                            </div>
                        </div>
                        <label for="message">Your message</label>
                        <textarea class="u-full-width" placeholder="Hello, I have a question about ..." id="message" name="message" required minlength="100"></textarea>
                        <input type="submit" value="Send it" href="" class="button button-primary button-medium" />
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection