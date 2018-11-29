<html>
<head>
    <title>dfdf</title>
    <style>
        .mail {
            background-color: #F2F2F2;
            color: black;
        }
        .mail-content {
            background-color: white;
            padding: 40px 60px;
            font-family: "Open Sans", sans-serif;
            margin: 10% 120px;
        }

        .mail-title {
            font-size: 30px;
            text-align: center;
        }
        .button {
            text-decoration: none;
            display: inline-block;
            text-align: center;
            padding: 9px;
        }
        .button-primary {
            background-color: #5680e9 ;
        }
        .button-primary:hover {
            opacity: 0.8;
        }

        h1 {
            color: black;
        }
        b {
            color: black;
        }
        p {
            color: black;
        }
        a {
            color: white;
        }
    </style>
</head>
<body class="mail">
<div class="mail-content">
    <h1 class="mail-title">Invitation to join {{$company}}</h1>
    <p> Hi <b>{{$name}}</b></p>
    <p>
        You have just been invited by {{$maker}} to join {{$company}} at Project-Together.com. You can accept this invitation by clicking on the button below. If this invitation was not meant for you, please ignore this email.
    </p>
    @if(!empty($mess))
        <h3>Message from {{$maker}}</h3>
    <p>
        {{$mess}}
    </p>
    @endif
        <a class="button button-primary" href="{{$url}}">Join {{$company}}</a>
    <p>
        Kind regards
    </p>
    <p>
        The Project-Together team
    </p>
</div>
</body>
</html>