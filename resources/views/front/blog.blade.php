@extends('front.layouts.app')
@section('title', '- blog')
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
    <div class="blog-header">
        <h1 class="blog-header--title">WorkTogether blog</h1>
    </div>
    <section class="blog">
        <div class="blog-highlight">
            <div class="row">
                <div class="six columns">
                    <div class="blog-highlight--image">
                        <a href=""><img class="u-max-full-width" src="images/work.jpg"></a>
                    </div>
                </div>
                <div class="six columns">
                    <div class="blog-highlight--body">
                        <a href=""><h3>New feature: calender reminder</h3></a>
                        <p>
                            Etiam fringilla, mauris ac tincidunt condimentum, ante erat vestibulum massa, sed condimentum augue sem vel leo. Pellentesque ornare in enim condimentum congue. Nullam imperdiet et lectus id placerat. Nulla facilisi. Quisque sed nunc non est maximus dictum ac eu nulla.
                        </p>

                        <div class="blog-highlight--author">
                            <img class="u-max-full-width" src="images/founder.jpg">
                            <h6>Willem Vansteyvoort</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="four columns">
                <div class="blog-item">
                    <a href=""><img class="u-max-full-width" src="images/calender.png"></a>
                    <a href=""><h3>Upcomming: calender reminder</h3></a>
                    <p>Etiam fringilla, mauris ac tincidunt condimentum, ante erat vestibulum massa, sed condimentum augue sem vel leo ...</p>
                    <div class="blog-item--author">
                        <img class="u-max-full-width" src="images/men.jpg">
                        <h6>Tibo Werner</h6>
                    </div>
                </div>
            </div>
            <div class="four columns">
                <div class="blog-item">
                    <a href=""><img class="u-max-full-width" src="images/connect.jpg"></a>
                    <a href=""><h3>Stay connected with channels</h3></a>
                    <p>Etiam fringilla, mauris ac tincidunt condimentum, ante erat vestibulum massa ... </p>
                    <div class="blog-item--author">
                        <img class="u-max-full-width" src="images/founder.jpg">
                        <h6>Willem Vansteyvoort</h6>
                    </div>
                </div>
            </div>
            <div class="four columns">
                <div class="blog-item">
                    <a href=""><img class="u-max-full-width" src="images/note.jpg"></a>
                    <a href=""><h3>Don't forget things with notes</h3></a>
                    <p>Etiam fringilla, mauris ac tincidunt condimentum, ante erat vestibulum massa, sed condimentum augue sem vel leo ...</p>
                    <div class="blog-item--author">
                        <img class="u-max-full-width" src="images/men.jpg">
                        <h6>Tibo Werner</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="newsletter">
        <h3 id="white">Stay informed with our Newsletter</h3>
        <input class="hidden-mobile" type="text" placeholder="Give your email to start ...">
        <a href="" class="button button-primary button-medium hidden-mobile animation-up">
            Subscribe
        </a>
    </section>
@endsection