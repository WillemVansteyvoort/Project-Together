<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}  @yield('title', '')</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/v4-shims.css">
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/skeleton.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/queries.css') }}">
</head>
<body>
<div class="container">
    <div class="register-left">
        <div class="register-socialmedia">
            <button class="register-socialmedia--facebook"> <i class="fa fa-facebook"></i>Sign Up with Facebook</button>
            <button class="register-socialmedia--twitter"> <i class="fa fa-twitter"></i>Sign Up with Twitter</button>
            <button class="register-socialmedia--google"> <i class="fa fa-google"></i>Sign Up with Google</button>
        </div>
    </div>
    <div class="login-right">
        <div class="register-right--alreadyAccount">
            <p>Already have an account? <a class="button button-primary" href="{{route('front_login')}}">Log In</a></p>
        </div>
        <form id="regForm" action="">
            <div class="tab">
                <h4 class="register-right--title">Sign Up to Work-Together</h4>
                <p>Get now all your projects organized with Work-Together. Sign Up now with Social Media or make a manual acount. We will see you inside!</p>
                <label>Full name</label>
                <input class="u-full-width" type="text" placeholder="Jan De Bakker">
                <label>Nickname</label>
                <input class="u-full-width" type="text" placeholder="JanDB">
                <label>E-mail</label>
                <input class="u-full-width" type="email" placeholder="jan.debakker@gmail.com">
                <label>Password</label>
                <input class="u-full-width" type="password" placeholder="********">
            </div>

            <div class="tab">
                <h4 class="register-right--title"><span class="register-step">Step 2/5</span>Time for the next one ...</h4>
                <p>Now we have all we need for your personal account, we want to now if you're a company or another group. Select also your plan for your account, you can change it later if you want.</p>
                <label>Company or group</label>
                <select>
                    <option id="customx" value="company">Company</option>
                    <option  value="group">Group</option>
                </select>
                <label>Your account type</label>
                <select>
                    <option value="">Standard (Free)</option>
                    <option value="">Pro (4€ / Mo)</option>
                </select>
            </div>

            <div class="tab">
                <h4 class="register-right--title"><div class="register-step">Step 3/4</div>You're doing well!</h4>
                <p>We see that you're a <b>company.</b> Before we can finish the setup of you're account, we have to know the name of the company and his industry.<p>
                    <label>Your company name</label>
                    <input class="u-full-width" type="text" placeholder="Work-Together">
                    <label>Industry</label>
                    <select>
                        <option value="">IT</option>
                        <option value="">Economics</option>
                        <option value="">IT</option>
                        <option value="">Economics</option>
                        <option value="">IT</option>
                        <option value="">Economics</option>
                    </select>
                    <label>Describe your function</label>
                    <input class="u-full-width" type="text" placeholder="Work-Together">
            </div>

            <div class="tab">
                <h4 class="register-right--title"><div class="register-step">Step 4/4</div>Choose your settings</h4>
                <h5>Personal</h5>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  />I want to receive a newsletter about new functions and news
                </div>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  checked/> I want to hidden my personal data (e-mail, phone) from my personal profile
                </div>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  checked/> I want to get an email when someone login on my account
                </div>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  /> I want to receive the documentation PDF by e-mail
                </div>
                <h5>Terms of Services</h5>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  /> I have read and I accept the <a href="">Terms Of Service.</a>
                </div>
                <h5>Privacy Policy</h5>
                <div>
                    <input type="checkbox" id="scales" name="feature"
                           value="scales"  /> I have read and I accept the <a>Privacy Policy.</a>
                </div>
            </div>

            <div>
                <div class="register-right--buttons">
                    <a class="button button-primary"  id="prevBtn" onclick="nextPrev(-1)">
                        Previous
                    </a>
                    <a class="button button-primary" id="nextBtn" onclick="nextPrev(1)">
                        Next
                    </a>
                </div>
            </div>
        </form>
        <div class="show-mobile">
            <div class="register-socialmedia">
                <button class="register-socialmedia--facebook"> <i class="fa fa-facebook"></i>Sign Up with Facebook</button>
                <button class="register-socialmedia--twitter"> <i class="fa fa-twitter"></i>Sign Up with Twitter</button>
                <button class="register-socialmedia--google"> <i class="fa fa-google"></i>Sign Up with Google</button>
            </div>
        </div>
    </div>
</div>
<script async="async" type="text/javascript" src="{{ asset('js/toggles.js') }}"></script>

</body>
</html>