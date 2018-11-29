@extends('front.layouts.app')
@section('title', '- support')
@section('content')
    <section class="header header-small">
        <div class="header-menu">
            <ul class="header-menu-left">
                <li><a class="header-name" href="{{route('front_home')}}">{{ config('app.name') }}</a></li>
                <li><a href="{{route('front_about')}}">About us</a></li>
                <li><a href="">Products</a></li>
                <li><a href="">Our Options</a></li>
                <li><a href="{{route('front_blog')}}">Blog</a></li>
                <li><a href="{{route('front_support')}}">Support</a></li>
            </ul>
            <ul class="header-menu-right hidden-mobile">
                <li class="button button-small button-second"><a href="">Log in</a></li>
                <li class="button button-small button-primary"><a href="">Sign Up</a></li>
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
                    <h6><a href="">support@worktogether.com</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-question-circle"></i>
                    <h6><a href="">See our Q&A section</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-phone-square"></i>
                    <h6><a href="">04/474.45.51.82</a></h6>
                </div>
            </div>
            <div class="three columns">
                <div class="support-item">
                    <i class="fas fa-th-large"></i>
                    <h6><a href="blog.html">Check our blog</a></h6>
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
                    <form>
                        <div class="row">
                            <div class="six columns">
                                <label for="email">Your email</label>
                                <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="email">
                            </div>
                            <div class="six columns">
                                <label for="reason">Reason for contacting</label>
                                <select class="u-full-width" id="reason">
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
                                <input class="u-full-width" type="email" placeholder="04/74.45.51.52" id="phone">
                            </div>
                            <div class="six columns">
                                <label for="company">Your company</label>
                                <input class="u-full-width" type="email" placeholder="WorkTogether" id="company">
                            </div>
                        </div>
                        <label for="message">Your message</label>
                        <textarea class="u-full-width" placeholder="Hello, I have a question about ..." id="message"></textarea>
                        <a href="" class="button button-primary button-medium">
                            Send it
                        </a>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection